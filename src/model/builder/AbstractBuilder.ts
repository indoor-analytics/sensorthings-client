import {Entity} from "../Entity";
import {SensorThingsService} from "../../service/SensorThingsService";

export abstract class AbstractBuilder<T extends Entity<T>> {
    protected _attributes: Record<string, unknown> = {};
    protected _service: SensorThingsService;
    protected constructor(service: SensorThingsService) {
        this._service = service;
        this._attributes = {};
    }
    abstract build(): T;
}
