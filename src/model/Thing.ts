import { Entity } from './Entity';
import { BaseDao } from '../dao/BaseDao';
import { ThingDao } from '../dao/ThingDao';
import { SensorThingsService } from '../service/SensorThingsService';

/**
 * Representation of a Thing SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#25
 */
export class Thing extends Entity<Thing> {
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    getDao(service: SensorThingsService): BaseDao<Thing> {
        return new ThingDao(service);
    }
}
