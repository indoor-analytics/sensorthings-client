import { BaseDao } from '../../src/dao/BaseDao';
import { DumbEntity } from './DumbEntity';
import {AxiosResponse} from "axios";

/**
 * This is a dumb implementation of the BaseDao abstract class,
 * only used in tests.
 */
export class DumbEntityDao extends BaseDao<DumbEntity> {
    buildEntityFromSensorThingsAPIRawData(data: any): DumbEntity {
        const entity = new DumbEntity(data.name, data.description, this._service);
        entity.id = data['@iot.id'];
        entity.setService(this._service);
        return entity;
    }
    buildEntityFromSensorThingsAPIResponse(response: AxiosResponse): DumbEntity {
        const data = response.data as Record<string, string>;
        const entity = new DumbEntity(data.name, data.description, this._service);
        entity.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        entity.setService(this._service);
        return entity;
    }
    get entityPathname(): string {
        return 'DumbEntities';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description'];
    }
}
