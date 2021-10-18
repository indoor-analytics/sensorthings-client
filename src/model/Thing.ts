import { Entity } from './Entity';
import { BaseDao } from '../dao/BaseDao';
import { ThingDao } from '../dao/ThingDao';
import { SensorThingsService } from '../service/SensorThingsService';
import {ThingLocationsList} from "./list/ThingLocationsList";

/**
 * Representation of a Thing SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#25
 */
export class Thing extends Entity<Thing> {
    public name: string;
    public description: string;
    public locations: ThingLocationsList;

    constructor(name: string, description: string, service: SensorThingsService) {
        super(service);
        this.name = name;
        this.description = description;
        this.locations = new ThingLocationsList(this, this._service);
    }

    get dao(): BaseDao<Thing> {
        return new ThingDao(this._service);
    }
}
