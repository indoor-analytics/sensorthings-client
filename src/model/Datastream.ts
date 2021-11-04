import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {Polygon} from "@turf/helpers";
import {SensorThingsService} from "../service/SensorThingsService";
import {ObservationType} from "./utils/ObservationType";
import {UnitOfMeasurement} from "./utils/UnitOfMeasurement";
import {DatastreamDao} from "../dao/DatastreamDao";
import {DatastreamThingsList} from "./list/DatastreamThingsList";
import {DatastreamObservedPropertiesList} from "./list/DatastreamObservedPropertiesList";
import { TimeChecks } from "./utils/TimeChecks";

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

    // TODO add all entities collections
    public things: DatastreamThingsList;
    //public sensors;
    public observedProperties: DatastreamObservedPropertiesList;
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
        this.things = new DatastreamThingsList(this, this._service);
        this.observedProperties = new DatastreamObservedPropertiesList(this, this._service);

        const checker = new TimeChecks();
        checker.checkTimeRange(phenomenonTime, 'phenomenonTime');
        this.phenomenonTime = phenomenonTime;
        checker.checkTimeRange(resultTime, 'resultTime');
        this.resultTime = resultTime;
    }

    get dao(): BaseDao<Datastream> {
        return new DatastreamDao(this._service);
    }
}
