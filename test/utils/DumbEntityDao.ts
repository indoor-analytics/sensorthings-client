import {BaseDao} from "../../src/dao/BaseDao";
// @ts-ignore
import {DumbEntity} from "./DumbEntity";

export class DumbEntityDao extends BaseDao<DumbEntity> {
    buildEntityFromSensorThingsAPI(data: any): DumbEntity {
        return new DumbEntity(data.name, data.description);
    }
    getEntityPathname(): string {
        return 'MockEntities';
    }
}
