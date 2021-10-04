import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {BaseDao} from "../dao/BaseDao";
import { AxiosError, AxiosResponse } from "axios";

export class Query<T extends Entity<T>> {
    private _service: SensorThingsService;
    private _dao: BaseDao<T>;

    constructor (service: SensorThingsService, dao: BaseDao<T>) {
        this._service = service;
        this._dao = dao;
    }

    public get endpoint (): string {
        return [this._service.endpoint, this._dao.getEntityPathname()].join('/');
    }

    /**
     * Queries current service for entities matching parameters that have been
     * invoked on this query instance.
     * @returns an array of entites matching query parameters
     */
    public async list(): Promise<T[]> {
        return this._service.httpClient.get(
            this.endpoint
        ).then((response: AxiosResponse<{value: Record<string, string>[]}>) => {
            const objects: T[] = response.data.value.map((datum: Record<string, string>) => {
                return this._dao.buildEntityFromSensorThingsAPI(datum)
            });
            return objects;
        })
        .catch((error: AxiosError) => {
            throw error;
        });
    }
}
