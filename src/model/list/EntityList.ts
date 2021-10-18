import {Entity} from "../Entity";
import {SensorThingsService} from "../../service/SensorThingsService";

export abstract class EntityList<P extends Entity<P>, T extends Entity<T>> {
    protected _service: SensorThingsService;
    protected _parent: P;

    public constructor(parent: P, service: SensorThingsService) {
        this._parent = parent;
        this._service = service;
    }

    public abstract list(): Promise<T[]>;

    public abstract add(entity: T): Promise<void>;
}
