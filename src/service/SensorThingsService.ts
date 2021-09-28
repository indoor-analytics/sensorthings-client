import { Entity } from '../model/Entity';
import axios, { AxiosResponse } from 'axios';

export class SensorThingsService {
    private readonly _endpoint: URL;
    constructor(endpoint: URL | string) {
        this._endpoint =
            typeof endpoint === 'string' ? new URL(endpoint) : endpoint;
    }
    get endpoint(): URL {
        return this._endpoint;
    }

    public async create(entity: Entity): Promise<void> {
        const response: AxiosResponse = await axios.post(
            [this._endpoint.origin, entity.getURLSuffix()].join('/'),
            entity.toNetworkObject()
        );
        entity.id = response.data['@iot.id'];
        return;
    }

    public async update(entity: Entity): Promise<void> {
        await axios.patch(
            [this._endpoint.origin, entity.entityResourcePathname].join('/'),
            entity.toNetworkObject()
        );
        return;
    }

    public async delete(entity: Entity): Promise<void> {
        await axios.delete(
            [this._endpoint.origin, entity.entityResourcePathname].join('/')
        );
    }
}
