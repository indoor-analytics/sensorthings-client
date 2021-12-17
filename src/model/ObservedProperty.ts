import {Entity} from "./Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {ObservedPropertyDao} from "../dao/ObservedPropertyDao";
import {ObservedPropertyDatastreamsLists} from "./list/ObservedPropertyDatastreamsLists";

/**
 * An ObservedProperty specifies the phenomenon of an Observation.
 * 
 * https://docs.opengeospatial.org/is/15-078r6/15-078r6.html#30
 */
export class ObservedProperty extends Entity<ObservedProperty> {
    /**
     * A property provides a label for ObservedProperty entity, commonly a descriptive name.
     */
    public name: string;

    /**
     * The URI of the ObservedProperty. Dereferencing this URI SHOULD result in a representation of the definition 
     * of the ObservedProperty.
     */
    public definition: string;

    /**
     * A description about the ObservedProperty.
     */
    public description: string;


    /**
     * The Observations of a Datastream observe the same ObservedProperty. The Observations of different Datastreams 
     * MAY observe the same ObservedProperty.
     */
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
