import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";
import {Point} from "@turf/helpers";
import {LocationThingsList} from "./list/LocationThingsList";
import {LocationHistoricalLocationsList} from "./list/LocationHistoricalLocationsList";

/**
 * Representation of a SensorThings Location entity.
 * https://docs.opengeospatial.org/is/15-078r6/15-078r6.html#26
 */
export class Location extends Entity<Location> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public location: Point;

    public things: LocationThingsList;
    public historicalLocations: LocationHistoricalLocationsList;

    constructor(service: SensorThingsService, name: string, description: string, location: Point) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.locationEncodingType;
        this.location = location;
        this.things = new LocationThingsList(this, this._service);
        this.historicalLocations = new LocationHistoricalLocationsList(this, this._service);
    }

    get dao(): BaseDao<Location> {
        return new LocationDao(this._service);
    }
}
