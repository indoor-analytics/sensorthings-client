import {BaseDao} from "../../src/dao/BaseDao";
// @ts-ignore
import {DumbEntity} from "./DumbEntity";


/**
 * This is a dumb implementation of the BaseDao abstract class,
 * only used in tests.
 */
export class DumbEntityDao extends BaseDao<DumbEntity> {
    buildEntityFromSensorThingsAPI(data: any): DumbEntity {
        return new DumbEntity(data.name, data.description);
    }
    getEntityPathname(): string {
        return 'MockEntities';
    }
}
