import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";

export abstract class BaseDao<T extends Entity> {
    private _service: SensorThingsService;

    constructor(service: SensorThingsService) {
        this._service = service;
    }


    public async create (entity: T): Promise<void> {
        return this._service.create(entity);
    }

    public async update (entity: T): Promise<void> {
        return this._service.update(entity);
    }

    public async delete (entity: T): Promise<void> {
        return this._service.delete(entity);
    }
}
