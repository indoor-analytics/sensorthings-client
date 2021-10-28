import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";

export class ObservedProperty extends Entity<ObservedProperty> {
    public name: string;
    public definition: string;
    public description: string;

    // TODO datastreams

    constructor(
        service: SensorThingsService,
        name: string, definition: string, description: string
    ) {
        super(service);
        this.name = name;
        this.definition = definition;
        this.description = description;
    }

    get dao(): BaseDao<ObservedProperty> {
        return undefined;
    }
}
