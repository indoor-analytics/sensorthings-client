import {Entity} from "../Entity";
import {SensorThingsService} from "../../service/SensorThingsService";

/**
 * Entity independant implementation of an entity builder object.
 * It allows to create entity instances by injecting properties and associated
 * service reference.
 */
export abstract class AbstractBuilder<T extends Entity<T>> {
    protected _attributes: Record<string, unknown> = {};
    protected _service: SensorThingsService;
    protected constructor(service: SensorThingsService) {
        this._service = service;
        this._attributes = {};
    }
    /**
     * Returns an entity of type T with all specified properties.
     * Throws if a needed property has not been set on this builder.
     */
    abstract build(): T;
}
