import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";

export class Location extends Entity<Location> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public location: Object;
    public properties: Record<string, unknown>;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this.encodingType = 'application/geo+json';
        this.location = {};
        this.properties = {};
    }

    getDao(service: SensorThingsService): BaseDao<Location> {
        return new LocationDao(service);
    }
}
