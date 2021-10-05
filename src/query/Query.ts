import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {BaseDao} from "../dao/BaseDao";
import {AxiosError, AxiosResponse} from "axios";

export class Query<T extends Entity<T>> {
    private _service: SensorThingsService;
    private _dao: BaseDao<T>;

    constructor (service: SensorThingsService, dao: BaseDao<T>) {
        this._service = service;
        this._dao = dao;
    }

    protected get _endpoint (): string {
        return [this._service.endpoint, this._dao.getEntityPathname()].join('/');
    }


    /**
     * Specifies the limit on the number of items returned from an entities collection.
     * @param count number of items to return
     */
    public top(count: number): this {
        console.log(count);
        return this;
    }


    /**
     * Queries current service for entities matching parameters that have been
     * invoked on this query instance.
     * @returns an array of entites matching query parameters
     */
    public async list(): Promise<T[]> {
        return this._service.httpClient.get(
            this._endpoint
        )
            .then((response: AxiosResponse<{value: Record<string, string>[]}>) => {
                return response.data.value.map((datum: Record<string, string>) => {
                    return this._dao.buildEntityFromSensorThingsAPI(datum)
                });
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}
