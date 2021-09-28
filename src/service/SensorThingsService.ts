import { Entity } from '../model/Entity';
import axios from 'axios';

export class SensorThingsService {
    private readonly _endpoint: URL;
    constructor(endpoint: URL) {
        this._endpoint = endpoint;
    }
    get endpoint(): URL {
        return this._endpoint;
    }

    public create(entity: Entity): void {
        axios.post(
            [
                this._endpoint.protocol + '//' + this._endpoint.host,
                entity.getURLSuffix(),
            ].join('/'),
            entity.toString()
        );
    }

    public update(entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }

    public patch(entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }

    public delete(entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }
}
