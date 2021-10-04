import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {BaseDao} from "../dao/BaseDao";

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
    public list(): Array<T> {
        return [];
    }
}