import {BaseDao} from "./BaseDao";
import {Datastream} from "../model/Datastream";
import {AxiosResponse} from "axios";
import {UnitOfMeasurement} from "../model/utils/UnitOfMeasurement";
import {ObservationType} from "../model/utils/ObservationType";
import {Polygon} from "@turf/helpers";

export class DatastreamDao extends BaseDao<Datastream> {
    buildEntityFromSensorThingsAPIRawData(data: Record<string, unknown>): Datastream {
        const datastream = new Datastream(
            this._service,
            data.name as string,
            data.description as string,
            data.unitOfMeasurement as UnitOfMeasurement,
            data.observationType as ObservationType,
            data.observedArea as Polygon,
            data.phenomenonTime as string,
            data.resultTime as string
        );
        datastream.id = data['@iot.id'] as unknown as number;
        return datastream;
    }

    buildEntityFromSensorThingsAPIResponse(response: AxiosResponse): Datastream {
        const data = response.data as Record<string, unknown>;
        const datastream = new Datastream(
            this._service,
            data.name as string,
            data.description as string,
            data.unitOfMeasurement as UnitOfMeasurement,
            data.observationType as ObservationType,
            data.observedArea as Polygon,
            data.phenomenonTime as string,
            data.resultTime as string
        );
        datastream.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        return datastream;
    }

    get entityPathname(): string {
        return "Datastreams";
    }

    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'unitOfMeasurement', 'observationType', 'observedArea', 'phenomenonTime', 'resultTime'];
    }

}
