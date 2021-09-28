import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";

export abstract class BaseDao<T extends Entity> {
    private _service: SensorThingsService;

    constructor(service: SensorThingsService) {
        this._service = service;
    }


    public async create (entity: T): Promise<void> {
        const response = await this._service.httpClient.post(
            [this._service.endpoint.origin, this.getEntityPathname()].join('/'),
            entity.toNetworkObject()
        );
        entity.id = response.data['@iot.id'];
        return;
    }

    public async update (entity: T): Promise<void> {
        return this._service.httpClient.patch(
            [this._service.endpoint.origin, entity.entityResourcePathname(this._service)].join('/'),
            entity.toNetworkObject()
        );
    }

    public async delete (entity: T): Promise<void> {
        return this._service.httpClient.delete(
            [this._service.endpoint.origin, entity.entityResourcePathname(this._service)].join('/')
        );
    }


    abstract getEntityPathname (): string;
}
