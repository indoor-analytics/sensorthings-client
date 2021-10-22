import {Entity} from "../Entity";
import {SensorThingsService} from "../../service/SensorThingsService";

/**
 * Entity independent implementation of an entity builder object.
 * It allows to create entity instances by injecting properties and associated
 * service reference.
 */
export abstract class AbstractBuilder<T extends Entity<T>> {
    protected _attributes: Record<string, unknown> = {};
    protected _service: SensorThingsService;
    public constructor(service: SensorThingsService) {
        this._service = service;
        this._attributes = {};
    }
    /**
     * Builds an entity from type T with all builder-specified properties.
     * This method should check if all entity properties have been specified,
     * and throw if not.
     */
    protected abstract buildEntity(): T;
    /**
     * Returns an entity of type T with all specified properties.
     * Throws if a needed property has not been set on this builder.
     */
    public build(): T {
        const entity: T = this.buildEntity();
        this._attributes = {};
        return entity;
    }
}
