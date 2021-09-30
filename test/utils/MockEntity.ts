import { Entity } from '../../src/model/Entity';
import { SensorThingsService } from '../../src';
import { BaseDao } from '../../src/dao/BaseDao';

class MockEntityDao extends BaseDao<MockEntity> {
    buildEntityFromSensorThingsAPI(data: any): MockEntity {
        return new MockEntity(data.name, data.description);
    }
    getEntityPathname(): string {
        return 'MockEntities';
    }
}

export class MockEntity extends Entity<MockEntity> {
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    getDao(service: SensorThingsService): BaseDao<MockEntity> {
        return new MockEntityDao(service);
    }
}
