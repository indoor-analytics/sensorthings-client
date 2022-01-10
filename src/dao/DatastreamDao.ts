import {BaseDao} from "./BaseDao";
import {Datastream} from "../model/Datastream";
import {UnitOfMeasurement} from "../model/utils/UnitOfMeasurement";
import {ObservationType} from "../model/utils/ObservationType";
import {Polygon} from "@turf/helpers";

export class DatastreamDao extends BaseDao<Datastream> {
    buildEntity(data: Record<string, unknown>): Datastream {
        return new Datastream(
            this._service,
            data.name as string,
            data.description as string,
            data.unitOfMeasurement as UnitOfMeasurement,
            data.observationType as ObservationType,
            data.observedArea as Polygon,
            data.phenomenonTime as string,
            data.resultTime as string
        );
    }
    get entityPathname(): string {
        return "Datastreams";
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'unitOfMeasurement', 'observationType', 'observedArea', 'phenomenonTime', 'resultTime'];
    }
}
