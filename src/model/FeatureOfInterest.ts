import { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from "@turf/helpers";
import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { Entity } from "./Entity";

/**
 * Representation of a SensorThings FeatureOfInterest entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#32
 */
export class FeatureOfInterest extends Entity<FeatureOfInterest> {
    public name: string;
    public description: string;
    public readonly encodingType: string;
    public feature: Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;

    constructor(
        service: SensorThingsService, 
        name: string, 
        description: string, 
        feature: Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.locationEncodingType;
        this.feature = feature;
    }

    get dao(): BaseDao<FeatureOfInterest> {
        throw new Error("Method not implemented.");
    }
}