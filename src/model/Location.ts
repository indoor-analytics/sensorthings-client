import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";
import {Point} from "@turf/helpers";
import {LocationThingsList} from "./list/LocationThingsList";

export class Location extends Entity<Location> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public location: Point;
    public properties: Record<string, unknown>;

    public things: LocationThingsList;

    constructor(service: SensorThingsService, name: string, description: string, location: Point, properties: Record<string, unknown> = {}) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.locationEncodingType;
        this.location = location;
        this.properties = properties;
        this.things = new LocationThingsList(this, this._service);
    }

    get dao(): BaseDao<Location> {
        return new LocationDao(this._service);
    }
}
