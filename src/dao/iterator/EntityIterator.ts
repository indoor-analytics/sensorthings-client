import {Entity} from "../../model/Entity";
import {BaseDao} from "../BaseDao";
import {SensorThingsService} from "../../service/SensorThingsService";
import {AxiosError, AxiosResponse} from "axios";
import {InitialisationError} from "../../error/InitialisationError";

export class EntityIterator<T extends Entity<T>> {
    private readonly _dao: BaseDao<T>;
    private readonly _service: SensorThingsService;
    private readonly _entities: Array<T>;
    private _apiParsed: boolean;
    private _index: number;
    public constructor (dao: BaseDao<T>, service: SensorThingsService) {
        this._dao = dao;
        this._service = service;
        this._entities = new Array<T>();
        this._index = 0;
        this._apiParsed = false;
    }

    public async hasNext(): Promise<boolean> {
        if (this._entities.length === 0)
            await this._loadUpEntities();
        if (this._entities.length === 0)
            return false;
        return this._index < this._entities.length;
    }

    public async next(): Promise<T> {
        if (!this._apiParsed)
            throw new InitialisationError('hasNext() must be called before next() calls.');
        this._index += 1;
        return this._entities[this._index-1];
    }

    private async _loadUpEntities(): Promise<void> {
        this._entities.length = 0;
        return await this._service.httpClient
            .get(
                [
                    this._service.endpoint,
                    this._dao.entityPathname
                ].join('/'))
            .then((response: AxiosResponse<{value: Record<string, string>[]}>) => {
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
