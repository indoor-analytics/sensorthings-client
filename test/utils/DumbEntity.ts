import { Entity } from '../../src/model/Entity';
import { SensorThingsService } from '../../src';
import { BaseDao } from '../../src/dao/BaseDao';
import { DumbEntityDao } from './DumbEntityDao';

/**
 * This is a dumb implementation of the Entity abstract class.
 * It is used only in tests, and does not exist in the SensorThings specification.
 */
export class DumbEntity extends Entity<DumbEntity> {
    public name: string;
    public description: string;

    constructor(name: string, description: string, service: SensorThingsService) {
        super(service);
        this.name = name;
        this.description = description;
    }

    get dao(): BaseDao<DumbEntity> {
        return new DumbEntityDao(this._service);
    }
}
