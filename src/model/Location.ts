import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";
import {Point} from "@turf/helpers";

export class Location extends Entity<Location> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public location: Point;
    public properties: Record<string, unknown>;

    constructor(service: SensorThingsService, name: string, description: string, location: Point, properties: Record<string, unknown> = {}) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.locationEncodingType;
        this.location = location;
        this.properties = properties;
    }

    get dao(): BaseDao<Location> {
        return new LocationDao(this._service);
    }
}
