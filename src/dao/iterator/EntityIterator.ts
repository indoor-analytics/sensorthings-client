import {Entity} from "../../model/Entity";
import {BaseDao} from "../BaseDao";
import {SensorThingsService} from "../../service/SensorThingsService";
import {AxiosError, AxiosResponse} from "axios";

export class EntityIterator<T extends Entity<T>> {
    private readonly _dao: BaseDao<T>;
    private readonly _service: SensorThingsService;
    private readonly _entities: Set<T>;
    public constructor (dao: BaseDao<T>, service: SensorThingsService) {
        this._dao = dao;
        this._service = service;
        this._entities = new Set<T>();
    }

    public async hasNext(): Promise<boolean> {
        await this._loadUpEntities();
        return this._entities.size !== 0;
    }

    public next(): Promise<T> {
        console.log(this._dao);
        throw new Error('Not implemented');
    }

    private async _loadUpEntities(): Promise<void> {
        this._entities.clear();
        return await this._service.httpClient
            .get(
                [
                    this._service.endpoint,
                    this._dao.entityPathname
                ].join('/'))
            .then((response: AxiosResponse<{value: Record<string, string>[]}>) => {
                response.data.value.map((datum: Record<string, string>) => {
                    this._entities.add(
                        this._dao.buildEntityFromSensorThingsAPIRawData(datum)
                    );
                });
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}
