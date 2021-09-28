import { Entity } from '../model/Entity';
import axios, { AxiosResponse } from 'axios';

export class SensorThingsService {
    private readonly _endpoint: URL;
    constructor(endpoint: URL) {
        this._endpoint = endpoint;
    }
    get endpoint(): URL {
        return this._endpoint;
    }

    public async create(entity: Entity): Promise<void> {
        const response: AxiosResponse = await axios.post(
            [
                this._endpoint.protocol + '//' + this._endpoint.host,
                entity.getURLSuffix(),
            ].join('/'),
            entity.toString()
        );
        entity.id = response.data['@iot.id'];
        return;
    }

    public update(entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }

    public patch(entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }

    public delete(entity: Entity): void {
        axios.delete(
            [
                this._endpoint.protocol + '//' + this._endpoint.host,
                entity.getURLSuffix() + `(${entity.id})`,
            ].join('/')
        );
    }
}
