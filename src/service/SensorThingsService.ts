import {Entity} from "../model/Entity";
import axios, {AxiosInstance} from "axios";

export class SensorThingsService {
    private readonly _endpoint: URL;
    public httpClient: AxiosInstance;
    constructor (endpoint: URL) {
        this._endpoint = endpoint;
        this.httpClient = axios.create({
            baseURL: this._endpoint.toString()
        });
    }
    get endpoint (): URL {
        return this._endpoint;
    }

    public create (entity: Entity): void {
        axios.post([this._endpoint.protocol + '//' + this._endpoint.host, entity.getURLSuffix()].join('/'));
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
