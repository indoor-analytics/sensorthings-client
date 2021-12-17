import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {Polygon} from "@turf/helpers";
import {SensorThingsService} from "../service/SensorThingsService";
import {ObservationType} from "./utils/ObservationType";
import {UnitOfMeasurement} from "./utils/UnitOfMeasurement";
import {DatastreamDao} from "../dao/DatastreamDao";
import {DatastreamThingsList} from "./list/DatastreamThingsList";
import {DatastreamObservedPropertiesList} from "./list/DatastreamObservedPropertiesList";
import { TimeChecker } from "./utils/TimeChecker";

/**
 * A Datastream groups a collection of Observations measuring the same ObservedProperty and produced by the same Sensor.
 * 
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#28
 */
export class Datastream extends Entity<Datastream> {
    /**
     * A property provides a label for Datastream entity, commonly a descriptive name.
     */
    public name: string;

    /**
     * The description of the Datastream entity.
     */
    public description: string;

    /**
     * A JSON Object containing three key-value pairs. The name property presents the full name of the unitOfMeasurement; 
     * the symbol property shows the textual form of the unit symbol; and the definition contains the URI defining the 
     * unitOfMeasurement.
     * The values of these properties SHOULD follow the Unified Code for Unit of Measure (UCUM).
     */
    public unitOfMeasurement: UnitOfMeasurement;

    /**
     * The type of Observation (with unique result type), which is used by the service to encode observations.
     */
    public observationType: ObservationType;

    /**
     * The spatial bounding box of the spatial extent of all FeaturesOfInterest that belong to the Observations 
     * associated with this Datastream.
     */
    public observedArea: Polygon | undefined;

    /**
     * The temporal interval of the phenomenon times of all observations belonging to this Datastream.
     */
    public phenomenonTime: string | undefined;

    /**
     * The temporal interval of the result times of all observations belonging to this Datastream.
     */
    public resultTime: string | undefined;


    // TODO add all entities collections

    /**
     * A Thing has zero-to-many Datastreams. A Datastream entity SHALL only link to a Thing as a collection of Observations.
     */
    public things: DatastreamThingsList;

    /**
     * The Observations in a Datastream are performed by one-and-only-one Sensor. One Sensor MAY produce zero-to-many 
     * Observations in different Datastreams.
     */
    // public sensors;

    /**
     * The Observations of a Datastream SHALL observe the same ObservedProperty. The Observations of different Datastreams 
     * MAY observe the same ObservedProperty.
     */
    public observedProperties: DatastreamObservedPropertiesList;

    /**
     * A Datastream has zero-to-many Observations. One Observation SHALL occur in one-and-only-one Datastream.
     */
    // public observations;

    constructor(
        service: SensorThingsService, name: string, description: string,
        unitOfMeasurement: UnitOfMeasurement,
        observationType: ObservationType,
        observedArea: Polygon | undefined = undefined,
        phenomenonTime: string | undefined = undefined,
        resultTime: string | undefined = undefined
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.unitOfMeasurement = unitOfMeasurement;
        this.observationType = observationType;
        this.observedArea = observedArea;
        this.things = new DatastreamThingsList(this, this._service);
        this.observedProperties = new DatastreamObservedPropertiesList(this, this._service);

        const checker = new TimeChecker();
        if (phenomenonTime !== undefined && !checker.checkTimeRange(phenomenonTime))
            throw new RangeError(`"${phenomenonTime}" is not a valid phenomenonTime value.`);
        this.phenomenonTime = phenomenonTime;
        if (resultTime !== undefined && !checker.checkTimeRange(resultTime))
            throw new RangeError(`"${resultTime}" is not a valid resultTime value.`);
        this.resultTime = resultTime;
    }

    get dao(): BaseDao<Datastream> {
        return new DatastreamDao(this._service);
    }
}
