import { Entity } from '../model/Entity';
import { SensorThingsService } from '../service/SensorThingsService';
import { AxiosError, AxiosResponse } from 'axios';
import { NotFoundError } from '../error/NotFoundError';
import {Query} from "../query/Query";

/**
 * Entity independent implementation of a data access object.
 * It allows to create, get, update and remove entities.
 */
export abstract class BaseDao<T extends Entity<T>> {
    protected _service: SensorThingsService;

    constructor(service: SensorThingsService) {
        this._service = service;
    }

    /**
     * Creates an entity on the constructor-specified service.
     * When created on the service, local entity is assigned service-created entity id.
     * @param entity entity to create on the service
     */
    public async create(entity: T): Promise<void> {
        const response = await this._service.httpClient.post(
            [this._service.endpoint, this.entityPathname].join('/'),
            this.getEntityNetworkObject(entity)
        );
        entity.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        entity.setService(this._service);
        return;
    }

    /**
     * Submits an entity to the current service, for it to update such entities fields.
     * Throws a NotFoundError exception if entity was not found.
     * @param entity entity to update (contains updated information regarding service entity data)
     */
    public async update(entity: T): Promise<Object> {
        return this._service.httpClient
            .patch(
                [
                    this._service.endpoint,
                    entity.instancePathname,
                ].join('/'),
                this.getEntityNetworkObject(entity)
            )
            .then((response: AxiosResponse<Object>) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }
                throw error;
            });
    }

    /**
     * Removes an entity on the current service.
     * Throws a NotFoundError exception if entity was not found.
     * @param entity entity to remove
     */
    public async delete(entity: T): Promise<void> {
        return this._service.httpClient
            .delete(
                [
                    this._service.endpoint,
                    entity.instancePathname,
                ].join('/')
            )
            .then(() => {
                return;
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }
                throw error;
            });
    }

    /**
     * Returns the URL path part associated with the entity.
     * For example, ThingDao().entityPathname should return the string "Things"
     * (such as in https://example.org/Things(42)).
     */
    abstract get entityPathname(): string;

    /**
     * Return all entity public (non-navigation and not private) properties.
     */
    abstract get entityPublicAttributes(): string[];

    /**
     * Returns an instance of the type inferred in the current DAO (with service id).
     * @param data entity body from service
     */
    public buildEntityFromSensorThingsAPIRawData(data: Record<string, string>): T {
        const entity = this.buildEntity(data);
        entity.id = data['@iot.id'] as unknown as number;
        return entity;
    }

    /**
     * Returns an instance of the type inferred in the current DAO (with service id).
     * @param response HTTP response from service
     */
    public buildEntityFromSensorThingsAPIResponse(response: AxiosResponse): T {
        const data = response.data as Record<string, unknown>;
        const entity = this.buildEntity(data);
        entity.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        return entity;
    }

    /**
     * Returns an instance of the type inferred in the current DAO.
     * @param data entity body from service
     */
    abstract buildEntity(data: Record<string, unknown>): T;

    /**
     * Returns an object containing all entity public attributes.
     * This is used while updating an entity, by exposing only fields that
     * can be updated.
     * @returns an object containing all public attributes
     */
    public getEntityNetworkObject(entity: T): Object {
        const object: Record<string, string> = {};
        for (const attribute of this.entityPublicAttributes) {
            // @ts-ignore
            object[attribute] = entity[attribute];
        }
        return object;
    }

    /**
     * Returns an entity from a given identifier.
     * Throws a NotFoundError exception if such entity was not found.
     * @param id object id
     */
    async get(id: number): Promise<T> {
        return await this._service.httpClient
            .get(
                [
                    this._service.endpoint,
                    this.entityPathname + `(${id})`,
                ].join('/')
            )
            .then((response: AxiosResponse) => {
                return this.buildEntityFromSensorThingsAPIResponse(response);
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }
                throw error;
            });
    }

    /**
     * Returns a collection of entities attached to a given entity of another type.
     * For example, LocationDao().getFromEntity(Thing(42)) should return a list of Location entities (those listed on
     * https://myservice.org/Things(42)/Locations).
     * @param entity parent object of entities to retrieve
     */
    async getFromEntity<D extends Entity<D>>(entity: Entity<D>): Promise<T[]> {
        return await this._service.httpClient
            .get([
                this._service.endpoint,
                entity.instancePathname,
                this.entityPathname
            ].join('/'))
            .then((response: AxiosResponse<{value: Record<string, string>[]}>) => {
                return response.data.value.map((datum: Record<string, string>) => {
                    return this.buildEntityFromSensorThingsAPIRawData(datum)
                });
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }
                throw error;
            });
    }

    /**
     * Creates a entity attached to a given entity of another type.
     * For example, LocationDao().createFromEntity(Thing(42), Location()) should create a location for the Thing with
     * id=42 (would hit https://myservice.org/Things(42)/Locations).
     * @param entity parent object of entity to create
     * @param payload entity to create
     */
    async createFromEntity<D extends Entity<D>>(entity: Entity<D>, payload: T): Promise<void> {
        return await this._service.httpClient.post(
            [
                this._service.endpoint,
                entity.instancePathname,
                this.entityPathname
            ].join('/'),
            this.getEntityNetworkObject(payload)
        )
            .then((response: AxiosResponse<Object>) => {
                payload.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
                return ;
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }
                throw error;
            });
    }

    /**
     * Returns a query object allowing data filtering on inferred-type entities.
     */
    public query(): Query<T> {
        return new Query<T>(this._service, this);
    }

    /**
     * Returns total count of items within DAO collection.
     */
    public async count(): Promise<number> {
        return await this._service.httpClient
            .get(
                [
                    this._service.endpoint,
                    this.entityPathname + `?$count=true`,
                ].join('/')
            )
            .then((response: AxiosResponse) => {
                return response.data['@iot.count'] as number;
            });
    }
}
