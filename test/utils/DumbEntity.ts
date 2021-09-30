import { Entity } from '../../src/model/Entity';
import { SensorThingsService } from '../../src';
import { BaseDao } from '../../src/dao/BaseDao';
// @ts-ignore
import { DumbEntityDao } from './DumbEntityDao';


export class DumbEntity extends Entity<DumbEntity> {
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    getDao(service: SensorThingsService): BaseDao<DumbEntity> {
        return new DumbEntityDao(service);
    }
}
