import {Entity} from "./Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {ObservedPropertyDao} from "../dao/ObservedPropertyDao";
import {ObservedPropertyDatastreamsLists} from "./list/ObservedPropertyDatastreamsLists";

/**
 * Representation of a SensorThings ObservedProperty entity.
 * https://docs.opengeospatial.org/is/15-078r6/15-078r6.html#30
 */
export class ObservedProperty extends Entity<ObservedProperty> {
    public name: string;
    public definition: string;
    public description: string;

    public datastreams: ObservedPropertyDatastreamsLists;

    constructor(
        service: SensorThingsService,
        name: string, definition: string, description: string
    ) {
        super(service);
        this.name = name;
        this.definition = definition;
        this.description = description;
        this.datastreams = new ObservedPropertyDatastreamsLists(this, this._service);
    }

    get dao(): ObservedPropertyDao {
        return new ObservedPropertyDao(this._service);
    }
}
