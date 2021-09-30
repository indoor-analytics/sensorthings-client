import { Entity } from '../../src/model/Entity';
import { SensorThingsService } from '../../src';
import { BaseDao } from '../../src/dao/BaseDao';
// @ts-ignore
import { MockEntityDao } from './MockEntityDao';


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
