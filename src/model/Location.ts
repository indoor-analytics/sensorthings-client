import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";
import {Feature} from "@turf/helpers";

export class Location extends Entity<Location> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public location: Feature;

    // TODO add builder
    constructor(name: string, description: string, service: SensorThingsService) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = 'application/geo+json';
        this.location = { // TODO remove
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [-114.06, 51.05]
            }
        };
    }

    get dao(): BaseDao<Location> {
        return new LocationDao(this._service);
    }
}
