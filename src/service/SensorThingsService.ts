import { Entity } from '../model/Entity';
import axios, { AxiosInstance } from 'axios';
import { ThingDao } from '../dao/ThingDao';
import {LocationDao} from "../dao/LocationDao";
import {CompatibilityUtils} from "./compatibility/CompatibilityUtils";
import {CompatibilityOptions} from "./compatibility/CompatibilityOptions";
import { HistoricalLocationDao } from '../dao/HistoricalLocationDao';

/**
 * A SensorThingsService represents the service endpoint of a server.
 */
export class SensorThingsService {
    private readonly _url: URL;
    public httpClient: AxiosInstance;
    public compatibility: CompatibilityUtils;

    constructor(
        endpoint: URL | string,
        options: CompatibilityOptions = { locationEncodingType: "application/geo+json" }
    ) {
        this._url =
            typeof endpoint === 'string' ? new URL(endpoint) : endpoint;
        this.httpClient = axios.create({
            url: this._url.href
        });
        this.compatibility = new CompatibilityUtils(options);
    }

    /**
     * Returns the URL where this service is accessible.
     */
    get url(): URL {
        return this._url;
    }
    /**
     * Returns this service's endpoint URL without final slash.
     * This is used to compute URLs to associated entities.
     */
    get endpoint(): string {
        const endpoint = this.url.toString();
        return endpoint.charAt(endpoint.length-1) === '/'
            ? endpoint.substring(0, endpoint.length-1)
            : endpoint;
    }


    public async create<T extends Entity<T>> (entity: T): Promise<void> {
        return entity.dao.create(entity);
    }

    public async update<T extends Entity<T>> (entity: T): Promise<Object> {
        return entity.dao.update(entity);
    }

    public async delete<T extends Entity<T>> (entity: T): Promise<void> {
        return entity.dao.delete(entity);
    }


    public get things(): ThingDao {
        return new ThingDao(this);
    }

    public get locations(): LocationDao {
        return new LocationDao(this);
    }

    public get historicalLocations(): HistoricalLocationDao {
        return new HistoricalLocationDao(this);
    }
}
