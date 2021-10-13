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

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this.encodingType = 'application/geo+json';
        this.location = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [-114.06, 51.05]
            }
        };
    }

    getDao(service: SensorThingsService): BaseDao<Location> {
        return new LocationDao(service);
    }
}
