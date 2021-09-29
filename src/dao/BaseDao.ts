import { Entity } from '../model/Entity';
import { SensorThingsService } from '../service/SensorThingsService';

/**
 * Entity independent implementation of a data access object.
 * It allows to create, update and remove entities.
 */
export abstract class BaseDao<T extends Entity> {
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
            [this._service.endpoint.origin, this.getEntityPathname()].join('/'),
            entity.toNetworkObject()
        );
        entity.id = response.data['@iot.id'];
        return;
    }

    /**
     * Submits an entity to the current service, for it to update such entities fields.
     * Throws a NotFoundError exception if entity was not found.
     * @param entity entity to update (contains updated information regarding service entity data)
     */
    public async update(entity: T): Promise<void> {
        return this._service.httpClient.patch(
            [
                this._service.endpoint.origin,
                entity.entityResourcePathname(this._service),
            ].join('/'),
            entity.toNetworkObject()
        );
    }

    /**
     * Removes an entity on the current service.
     * Throws a NotFoundError exception if entity was not found.
     * @param entity entity to remove
     */
    public async delete(entity: T): Promise<void> {
        return this._service.httpClient.delete(
            [
                this._service.endpoint.origin,
                entity.entityResourcePathname(this._service),
            ].join('/')
        );
    }

    /**
     * Returns the URL path part associated with the entity.
     * For example, ThingDao.getEntityPathname() would return the string "Things"
     * (such as in https://example.org/Things(42)).
     */
    abstract getEntityPathname(): string;

    /**
     * Returns an entity from a given identifier.
     * Throws a NotFoundError exception if such entity was not found.
     * @param id object id
     */
    abstract get(id: number): Promise<T>;
}
