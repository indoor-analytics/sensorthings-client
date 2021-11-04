import { Feature, Geometry } from "@turf/helpers";
import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { FeatureOfInterestDao } from "../dao/FeatureOfInterestDao";
import { Entity } from "./Entity";

/**
 * Representation of a SensorThings FeatureOfInterest entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#32
 */
export class FeatureOfInterest extends Entity<FeatureOfInterest> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public feature: Geometry;

    constructor(
        service: SensorThingsService, 
        name: string, 
        description: string, 
        feature: Feature<Geometry>
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.locationEncodingType;
        this.feature = feature.geometry;
    }

    get dao(): BaseDao<FeatureOfInterest> {
        return new FeatureOfInterestDao(this._service);
    }
}