import { Feature } from "@turf/helpers";
import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { FeatureOfInterestDao } from "../dao/FeatureOfInterestDao";
import { Entity } from "./Entity";
import { FeatureOfInterestObservationsList } from "./list/FeatureOfInterestObservationsList";

/**
 * An Observation results in a value being assigned to a phenomenon. The phenomenon is a property of a feature, 
 * the latter being the FeatureOfInterest of the Observation [OGC and ISO 19156:2011]. 
 * 
 * In the context of the Internet of Things, many Observations’ FeatureOfInterest can be the Location of the Thing. 
 * For example, the FeatureOfInterest of a wifi-connect thermostat can be the Location of the thermostat (i.e., the 
 * living room where the thermostat is located in). In the case of remote sensing, the FeatureOfInterest can be the 
 * geographical area or volume that is being sensed.
 * 
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#32
 */
export class FeatureOfInterest extends Entity<FeatureOfInterest> {
    /**
     * A property provides a label for FeatureOfInterest entity, commonly a descriptive name.
     */
    public name: string;

    /**
     * The description about the FeatureOfInterest.
     */
    public description: string;

    /**
     * The encoding type of the feature property.
     */
    public readonly encodingType: string;

    /**
     * The detailed description of the feature.
     */
    public feature: Feature;


    /**
     * An Observation observes on one-and-only-one FeatureOfInterest. One FeatureOfInterest could be observed by zero-to-many Observations.
     */
    public observations: FeatureOfInterestObservationsList;

    constructor(
        service: SensorThingsService, 
        name: string, 
        description: string, 
        feature: Feature
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.encodingType;
        this.feature = feature;
        this.observations = new FeatureOfInterestObservationsList(this, this._service);
    }

    get dao(): BaseDao<FeatureOfInterest> {
        return new FeatureOfInterestDao(this._service);
    }
}