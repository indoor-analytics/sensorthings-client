import {BaseDao} from "./BaseDao";
import {Location} from "../model/Location";
import {Feature} from "@turf/helpers";

export class LocationDao extends BaseDao<Location> {
    buildEntityFromSensorThingsAPI(data: Record<string, unknown>): Location {
        const location = new Location(
            data.name as string,
            data.description as string,
            data.location as Feature,
            this._service
        );
        location.id = data['@iot.id'] as unknown as number;
        return location;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'properties'];
    }
    get entityPathname(): string {
        return "Locations";
    }
}
