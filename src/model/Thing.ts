import { Entity } from './Entity';
import { BaseDao } from '../dao/BaseDao';
import { ThingDao } from '../dao/ThingDao';
import { SensorThingsService } from '../service/SensorThingsService';
import {ThingLocationsList} from "./list/ThingLocationsList";
import {ThingHistoricalLocationsList} from "./list/ThingHistoricalLocationsList";
import {ThingDatastreamsList} from "./list/ThingDatastreamsList";

/**
 * Representation of a Thing SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#25
 */
export class Thing extends Entity<Thing> {
    public name: string;
    public description: string;
    public properties: Record<string, unknown>;

    public locations: ThingLocationsList;
    public historicalLocations: ThingHistoricalLocationsList;
    public datastreams: ThingDatastreamsList;

    constructor(
        service: SensorThingsService, name: string, description: string,
        properties: Record<string, unknown> = {}
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.properties = properties;
        this.locations = new ThingLocationsList(this, this._service);
        this.historicalLocations = new ThingHistoricalLocationsList(this, this._service);
        this.datastreams = new ThingDatastreamsList(this, this._service);
    }

    get dao(): BaseDao<Thing> {
        return new ThingDao(this._service);
    }
}
