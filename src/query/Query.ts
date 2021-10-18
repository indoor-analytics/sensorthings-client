import {Entity} from "../model/Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {BaseDao} from "../dao/BaseDao";
import {AxiosError, AxiosResponse} from "axios";
import {QuerySettings} from "./QuerySettings";
import {NegativeValueError} from "../error/NegativeValueError";
import {NotIntegerError} from "../error/NotIntegerError";
import {URL} from "url";
import {QueryValidator} from "./QueryValidator";

export class Query<T extends Entity<T>> {
    private _service: SensorThingsService;
    private _dao: BaseDao<T>;
    private _settings: QuerySettings;
    private _validator: QueryValidator;

    constructor (service: SensorThingsService, dao: BaseDao<T>) {
        this._service = service;
        this._dao = dao;
        this._settings = {};
        this._validator = new QueryValidator();
    }

    protected get _endpoint (): string {
        const url = new URL(
            [this._service.endpoint, this._dao.entityPathname].join('/')
        );

        if (this._settings.select)
            url.searchParams.set('$select', this._settings.select);
        if (this._settings.skip)
            url.searchParams.set('$skip', this._settings.skip.toString());
        if (this._settings.top)
            url.searchParams.set('$top', this._settings.top.toString());
        if (this._settings.orderBy)
            url.searchParams.set('$orderby', this._settings.orderBy);

        return decodeURIComponent(url.toString());
    }


    /**
     * Specifies the limit on the number of items returned from an entities collection.
     * @param count number of items to return
     */
    public top(count: number): this {
        if (count < 0)
            throw new NegativeValueError('Top argument shall be a non-negative integer.');
        if (count !== Math.round(count))
            throw new NotIntegerError('Top argument shall be a non-negative integer.');
        this._settings.top = count;
        return this;
    }

    /**
     * Specifies a number of entities that shall be excluded from the result.
     * @param count number of items to skip
     */
    public skip(count: number): this {
        if (count < 0)
            throw new NegativeValueError('Skip argument must be a non-negative integer.');
        if (count !== Math.round(count))
            throw new NotIntegerError('Skip argument must be a non-negative integer.');
        this._settings.skip = count;
        return this;
    }

    /**
     * Specifies the order in which items are returned from the service.
     * @param expression expression used to sort entities
     */
    public orderBy(expression: string): this {
        this._validator.checkOrderBy(expression, this._dao.entityPublicAttributes);
        this._settings.orderBy = expression;
        return this;
    }

    /**
     * Specifies a set of properties to be returned from the service.
     * @param attributes selection clauses
     */
    public select(...attributes: string[]): this {
        this._validator.checkSelect(attributes, this._dao.entityPublicAttributes);
        this._settings.select = attributes.join(',');
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
                    return this._dao.buildEntityFromSensorThingsAPIRawData(datum)
                });
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}
