import {Entity} from "../Entity";
import {SensorThingsService} from "../../service/SensorThingsService";

export abstract class EntityList<P extends Entity<P>, T extends Entity<T>> {
    protected _service: SensorThingsService;
    protected _parent: P;
    protected constructor(parent: P, service: SensorThingsService) {
        this._parent = parent;
        this._service = service;
    }

    public async list(): Promise<T[]> {
        return [];
    }

    public async add(entity: T): Promise<void> {
        console.log(entity);
        return;
    }
}
