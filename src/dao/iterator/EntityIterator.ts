import {Entity} from "../../model/Entity";
import {BaseDao} from "../BaseDao";
import {SensorThingsService} from "../../service/SensorThingsService";
import {AxiosError, AxiosResponse} from "axios";
import {InitialisationError} from "../../error/InitialisationError";

/**
 * This allows to browse large collections of entities that span over several pages,
 * by following @iot.nextLink URLs.
 */
export class EntityIterator<T extends Entity<T>> {
    private readonly _dao: BaseDao<T>;
    private readonly _service: SensorThingsService;
    private readonly _entities: Array<T>;
    private _apiParsed: boolean;
    private _index: number;
    private _nextLink: string;

    public constructor (dao: BaseDao<T>, service: SensorThingsService) {
        this._dao = dao;
        this._service = service;
        this._entities = new Array<T>();
        this._index = 0;
        this._apiParsed = false;
        this._nextLink = '';
    }

    /**
     * Checks if there are entities on the current entities collections to return.
     * Must be invoked before calling next().
     */
    public async hasNext(): Promise<boolean> {
        if (this._entities.length === 0)
            await this._loadUpEntities();
        if (this._entities.length === 0)
            return false;

        if (this._index === this._entities.length)
            if (this._nextLink !== '')
                await this._loadUpEntities(true);

        return this._index < this._entities.length;
    }

    /**
     * Returns the next element of the current entities collection.
     * This will throw if hasNext() was not previously invoked.
     */
    public async next(): Promise<T> {
        if (!this._apiParsed)
            throw new InitialisationError('hasNext() must be called before next() calls.');
        this._index += 1;
        return this._entities[this._index-1];
    }

    /**
     * Loads up entities from the current SensorThings service endpoint.
     * This will use either default entity endpoint, or next link page if told to do so.
     * @param useNextLink should use stored next entities page link ?
     * @private
     */
    private async _loadUpEntities(useNextLink = false): Promise<void> {
        if (!useNextLink) this._entities.length = 0;
        const endpoint = useNextLink
            ? this._nextLink
            : [
                this._service.endpoint,
                this._dao.entityPathname
            ].join('/');

        return await this._service.httpClient
            .get( endpoint )
            .then((response: AxiosResponse<{'@iot.nextLink'?: string, value: Record<string, string>[]}>) => {
                if (response.data["@iot.nextLink"] !== undefined) {
                    this._nextLink = response.data["@iot.nextLink"];
                } else if (useNextLink) {
                    this._nextLink = '';
                }

                response.data.value.map((datum: Record<string, string>) => {
                    this._entities.push(
                        this._dao.buildEntityFromSensorThingsAPIRawData(datum)
                    );
                });
                this._apiParsed = true;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}
