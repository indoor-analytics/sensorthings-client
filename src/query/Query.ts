import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";

export class Query<T extends Entity<T>> {
    private _service: SensorThingsService;

    constructor (service: SensorThingsService) {
        this._service = service;
        console.log(this._endpoint);
    }

    private get _endpoint (): string {
        return [this._service.endpoint, '// TODO'].join('/');
    }
}
