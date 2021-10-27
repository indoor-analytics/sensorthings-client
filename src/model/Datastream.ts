import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {Polygon} from "@turf/helpers";
import {SensorThingsService} from "../service/SensorThingsService";
import {ObservationType} from "./utils/ObservationType";
import {UnitOfMeasurement} from "./utils/UnitOfMeasurement";

export class Datastream extends Entity<Datastream> {
    public name: string;
    public description: string;
    public unitOfMeasurement: UnitOfMeasurement;
    public observationType: ObservationType;
    public observedArea: Polygon;
    public phenomenonTime: string;
    public resultTime: string;

    // TODO add entities collections
    //public things;
    //public sensors;
    //public observedProperties;
    //public observations;

    constructor(
        service: SensorThingsService, name: string, description: string,
        unitOfMeasurement: UnitOfMeasurement,
        observationType: ObservationType,
        observedArea: Polygon,
        phenomenonTime: string,
        resultTime: string
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.unitOfMeasurement = unitOfMeasurement;
        this.observationType = observationType;
        this.observedArea = observedArea;
        this.phenomenonTime = phenomenonTime;
        this.resultTime = resultTime;
    }

    get dao(): BaseDao<Datastream> {
        return undefined;
    }
}