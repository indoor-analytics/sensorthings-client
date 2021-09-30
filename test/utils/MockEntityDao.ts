import {BaseDao} from "../../src/dao/BaseDao";
// @ts-ignore
import {MockEntity} from "./MockEntity";

export class MockEntityDao extends BaseDao<MockEntity> {
    buildEntityFromSensorThingsAPI(data: any): MockEntity {
        return new MockEntity(data.name, data.description);
    }
    getEntityPathname(): string {
        return 'MockEntities';
    }
}
