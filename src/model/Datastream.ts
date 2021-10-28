import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {Polygon} from "@turf/helpers";
import {SensorThingsService} from "../service/SensorThingsService";
import {ObservationType} from "./utils/ObservationType";
import {UnitOfMeasurement} from "./utils/UnitOfMeasurement";
import {DatastreamDao} from "../dao/DatastreamDao";

/**
 * Representation of a SensorThings Datastream entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#28
 */
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

        Datastream._checkTimeRange(phenomenonTime, 'phenomenonTime');
        this.phenomenonTime = phenomenonTime;
        Datastream._checkTimeRange(resultTime, 'resultTime');
        this.resultTime = resultTime;
    }

    get dao(): BaseDao<Datastream> {
        return new DatastreamDao(this._service);
    }

    private static _checkTimeRange(range: string, attributeName: string): void {
        const dates = range.split('/');
        if (dates.length !== 2)
            throw new RangeError(`"${range}" is not a valid ${attributeName} value.`);
        try {
            new Date(dates[0]).toISOString();
            new Date(dates[1]).toISOString();
        } catch (err) {
            throw new RangeError(`"${range}" is not a valid ${attributeName} value.`);
        }
    }
}
