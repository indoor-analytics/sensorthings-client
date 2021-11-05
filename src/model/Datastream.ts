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
        observedArea: Polygon = undefined as unknown as Polygon,
        phenomenonTime: string = undefined as unknown as string,
        resultTime: string = undefined as unknown as string
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
        if (phenomenonTime && !checker.checkTimeRange(phenomenonTime))
            throw new RangeError(`"${phenomenonTime}" is not a valid phenomenonTime value.`);
        this.phenomenonTime = phenomenonTime;
        if (resultTime && !checker.checkTimeRange(resultTime))
            throw new RangeError(`"${resultTime}" is not a valid resultTime value.`);
        this.resultTime = resultTime;
    }

    get dao(): BaseDao<Datastream> {
        return new DatastreamDao(this._service);
    }
}
