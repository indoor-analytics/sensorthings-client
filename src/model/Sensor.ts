/**
 * A Sensor is an instrument that observes a property or phenomenon with the goal of producing an estimate of the value of the property.
 *
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#29
 */
import {Entity} from "./Entity";
import {SensorThingsService} from "../service/SensorThingsService";
import {BaseDao} from "../dao/BaseDao";
import {SensorDatastreamsList} from "./list/SensorDatastreamsList";


export class Sensor extends Entity<Sensor> {
    /**
     * A property provides a label for Sensor entity, commonly a descriptive name.
     */
    public name: string;

    /**
     * The description of the Sensor entity.
     */
    public description: string;

    /**
     * The encoding type of the metadata property.
     */
    // encodingType

    /**
     * The detailed description of the Sensor or system. The metadata type is defined by encodingType.
     */
    // metadata


    /**
     * The Observations of a Datastream are measured with the same Sensor. One Sensor MAY produce zero-to-many Observations in different Datastreams.
     */
    datastreams: SensorDatastreamsList;


    constructor(
        service: SensorThingsService, name: string, description: string
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.datastreams = new SensorDatastreamsList(this, this._service);
    }

    get dao(): BaseDao<Sensor> {
        throw new Error("Method not implemented.");
    }
}
