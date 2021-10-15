import { Entity } from './Entity';
import { BaseDao } from '../dao/BaseDao';
import { ThingDao } from '../dao/ThingDao';
import { SensorThingsService } from '../service/SensorThingsService';
import {Location} from "./Location";
import {ServiceNotInitializedError} from "../error/ServiceNotInitializedError";

/**
 * Representation of a Thing SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#25
 */
export class Thing extends Entity<Thing> {
    public name: string;
    public description: string;

    constructor(name: string, description: string, service: SensorThingsService) {
        super(service);
        this.name = name;
        this.description = description;
    }

    get dao(): BaseDao<Thing> {
        return new ThingDao(this._service);
    }

    get locations(): Promise<Location[]> {
        if (!this._service) throw new ServiceNotInitializedError();
        return this._service.locations.getFromEntity(this);
    }
}
