import { Entity } from '../model/Entity';
import axios, {AxiosInstance} from 'axios';
import {ThingDao} from "../dao/ThingDao";

export class SensorThingsService {
    [x: string]: {};
    private readonly _endpoint: URL;
    public httpClient: AxiosInstance;
    constructor(endpoint: URL | string) {
        this._endpoint =
            typeof endpoint === 'string' ? new URL(endpoint) : endpoint;
        this.httpClient = axios.create({
            url: typeof endpoint === 'string' ? endpoint : endpoint.href
        });
    }
    get endpoint(): URL {
        return this._endpoint;
    }

    public async create(entity: Entity): Promise<void> {
        return entity.getDao(this).create(entity);
    }

    public async update(entity: Entity): Promise<void> {
        return entity.getDao(this).update(entity);
    }

    public async delete(entity: Entity): Promise<void> {
        return entity.getDao(this).delete(entity);
    }

    public get things(): ThingDao {
        return new ThingDao(this);
    }
}
