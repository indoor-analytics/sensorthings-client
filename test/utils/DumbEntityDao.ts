import { BaseDao } from '../../src/dao/BaseDao';
import { DumbEntity } from './DumbEntity';

/**
 * This is a dumb implementation of the BaseDao abstract class,
 * only used in tests.
 */
export class DumbEntityDao extends BaseDao<DumbEntity> {
    buildEntityFromSensorThingsAPI(data: any): DumbEntity {
        const entity = new DumbEntity(data.name, data.description);
        entity.id = data['@iot.id'];
        entity.setService(this._service);
        return entity;
    }
    getEntityPathname(): string {
        return 'DumbEntities';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description'];
    }
}
