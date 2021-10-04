import { Entity } from '../model/Entity';
import axios, { AxiosInstance } from 'axios';
import { ThingDao } from '../dao/ThingDao';

/**
 * A SensorThingsService represents the service endpoint of a server.
 */
export class SensorThingsService {
    private readonly _url: URL;
    public httpClient: AxiosInstance;
    constructor(endpoint: URL | string) {
        this._url =
            typeof endpoint === 'string' ? new URL(endpoint) : endpoint;
        this.httpClient = axios.create({
            url: typeof endpoint === 'string' ? endpoint : endpoint.href,
        });
    }
    get url(): URL {
        return this._url;
    }


    public async create<T extends Entity<T>> (entity: T): Promise<void> {
        return entity.getDao(this).create(entity);
    }

    public async update<T extends Entity<T>> (entity: T): Promise<Object> {
        return entity.getDao(this).update(entity);
    }

    public async delete<T extends Entity<T>> (entity: T): Promise<void> {
        return entity.getDao(this).delete(entity);
    }

    public get things(): ThingDao {
        return new ThingDao(this);
    }
}
