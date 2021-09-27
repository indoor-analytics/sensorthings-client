import {Entity} from "../model/Entity";
import axios, {AxiosInstance} from "axios";

export class SensorThingsService {
    private readonly _endpoint: URL;
    private _httpClient: AxiosInstance;
    constructor (endpoint: URL) {
        this._endpoint = endpoint;
        this._httpClient = axios.create({
            baseURL: this._endpoint.toString()
        });
    }
    get endpoint (): URL {
        return this._endpoint;
    }
    set httpClient (client: AxiosInstance) {
        this._httpClient = client;
    }

    public create (entity: Entity): void {
        this._httpClient.post("");
        throw Error(`Not implemented: ${entity}`);
    }

    public update (entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }

    public patch (entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }

    public delete (entity: Entity): void {
        throw Error(`Not implemented: ${entity}`);
    }
}
