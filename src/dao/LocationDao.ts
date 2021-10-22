import {BaseDao} from "./BaseDao";
import {Location} from "../model/Location";
import {Point} from "@turf/helpers";
import {AxiosResponse} from "axios";

export class LocationDao extends BaseDao<Location> {
    buildEntityFromSensorThingsAPIRawData(data: Record<string, unknown>): Location {
        const location = new Location(
            this._service,
            data.name as string,
            data.description as string,
            data.location as Point,
            data.properties as Record<string, unknown>
        );
        location.id = data['@iot.id'] as unknown as number;
        return location;
    }
    buildEntityFromSensorThingsAPIResponse(response: AxiosResponse): Location {
        const data = response.data as Record<string, unknown>;
        const location = new Location(
            this._service,
            data.name as string,
            data.description as string,
            data.location as Point
        );
        location.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        return location;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'properties', 'location', 'encodingType'];
    }
    get entityPathname(): string {
        return "Locations";
    }
}
