import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { ObservationDao } from "../dao/ObservationDao";
import { Entity } from "./Entity";
import { ObservationsDatastreamsList } from "./list/ObservationDatastreamsList";
import { ObservationFeaturesOfInterestList } from "./list/ObservationFeaturesOfInterestList";
import { TimeChecker } from "./utils/TimeChecker";

/**
 * Representation of an Observation SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#31
 */
export class Observation extends Entity<Observation> {
    /**
     * The time instant or period of when the Observation happens.
     * 
     * Note: Many resource-constrained sensing devices do not have a clock. As a result, a client may 
     * omit phenonmenonTime when POST new Observations, even though phenonmenonTime is a mandatory property. 
     * When a SensorThings service receives a POST Observations without phenonmenonTime, the service SHALL 
     * assign the current server time to the value of the phenomenonTime.
     */
    public phenomenonTime: string;

    /**
     * The estimated value of an ObservedProperty from the Observation.
     */
    public result: unknown;

    /**
     * The time of the Observation's result was generated.
     * 
     * Note: Many resource-constrained sensing devices do not have a clock. As a result, a client may omit 
     * resultTime when POST new Observations, even though resultTime is a mandatory property. When a SensorThings 
     * service receives a POST Observations without resultTime, the service SHALL assign a null value to the resultTime.
     */
    public resultTime: string;

    /**
     * Describes the quality of the result.
     */
    public resultQuality: unknown | undefined;

    /**
     * The time period during which the result may be used.
     */
    public validTime: string | undefined;

    /**
     * Key-value pairs showing the environmental conditions during measurement.
     */
    public parameters: Record<string, unknown> | undefined;


    /**
     * A Datastream can have zero-to-many Observations. One Observation SHALL occur in one-and-only-one Datastream.
     */
    public datastreams: ObservationsDatastreamsList;

    /**
     * An Observation observes on one-and-only-one FeatureOfInterest. One FeatureOfInterest could be observed by 
     * zero-to-many Observations.
     */
    public featuresOfInterest: ObservationFeaturesOfInterestList;

    public constructor(
        service: SensorThingsService,
        phenomenonTime: string,
        result: unknown,
        resultTime: string,
        resultQuality: unknown = undefined,
        validTime: string | undefined = undefined,
        parameters: Record<string, unknown> | undefined = undefined
    ) {
        super(service);

        this.parameters = parameters;
        this.resultQuality = resultQuality;
        this.result = result;
        this.datastreams = new ObservationsDatastreamsList(this, this._service);
        this.featuresOfInterest = new ObservationFeaturesOfInterestList(this, this._service);

        const checker = new TimeChecker();
        if (!checker.checkISODate(phenomenonTime) && !checker.checkTimeRange(phenomenonTime))
            throw new RangeError(`"${phenomenonTime}" is not a valid phenomenonTime value.`);
        this.phenomenonTime = phenomenonTime;

        if (resultTime !== undefined && !checker.checkISODate(resultTime))
            throw new RangeError(`"${resultTime}" is not a valid resultTime value.`);
        this.resultTime = resultTime;

        if (validTime !== undefined && !checker.checkTimeRange(validTime))
            throw new RangeError(`"${validTime}" is not a valid validTime value.`);
        this.validTime = validTime;
    }

    get dao(): BaseDao<Observation> {
        return new ObservationDao(this._service);
    }
}
