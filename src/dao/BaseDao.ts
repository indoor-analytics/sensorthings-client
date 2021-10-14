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
            [this._service.endpoint, this.getEntityPathname()].join('/'),
            this.getEntityNetworkObject(entity)
        );
        // @ts-ignore
        entity.id = response.data['@iot.id'];
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
                    entity.entityResourcePathname(this._service),
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
                    entity.entityResourcePathname(this._service),
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
     * For example, ThingDao.getEntityPathname() would return the string "Things"
     * (such as in https://example.org/Things(42)).
     */
    abstract getEntityPathname(): string;

    /**
     * Return all entity public (non-navigation and not private) properties.
     */
    abstract get entityPublicAttributes(): string[];

    /**
     * Returns an instance of the type inferred in the current DAO (with the service id).
     * @param data entity body from service
     */
    abstract buildEntityFromSensorThingsAPI(data: Record<string, string>): T;

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
                    this.getEntityPathname() + `(${id})`,
                ].join('/')
            )
            .then((response: AxiosResponse) => {
                return this.buildEntityFromSensorThingsAPI(
                    response.data
                );
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }
                throw error;
            });
    }

    async getFromEntity<D extends Entity<D>>(entity: Entity<D>): Promise<T[]> {
        return await this._service.httpClient
            .get([
                this._service.endpoint,
                entity.entityResourcePathname(this._service),    // TODO remove argument
                this.getEntityPathname()
            ].join('/'))
            .then((response: AxiosResponse<{value: Record<string, string>[]}>) => {
                return response.data.value.map((datum: Record<string, string>) => {
                    return this.buildEntityFromSensorThingsAPI(datum)
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
                    this.getEntityPathname() + `?$count=true`,
                ].join('/')
            )
            .then((response: AxiosResponse) => {
                return response.data['@iot.count'] as number;
            });
    }
}
