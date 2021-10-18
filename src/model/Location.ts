import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";
import {Feature, Geometry} from "@turf/helpers";

export class Location extends Entity<Location> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public location: Feature<Geometry>;

    constructor(name: string, description: string, location: Feature<Geometry>, service: SensorThingsService) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = 'application/geo+json';
        this.location = location;
    }

    get dao(): BaseDao<Location> {
        return new LocationDao(this._service);
    }
}
