import { Entity } from '../../src/model/Entity';
import {SensorThingsService} from "../../src";
import {BaseDao} from "../../src/dao/BaseDao";

class MockEntityDao extends BaseDao<MockEntity> {
    getEntityPathname(): string {
        return "MockEntities";
    }
}

export class MockEntity extends Entity {
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    getDao(service: SensorThingsService): BaseDao<Entity> {
        return new MockEntityDao(service);
    }
}
