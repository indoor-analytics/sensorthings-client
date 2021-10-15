import {BaseDao} from "./BaseDao";
import {Location} from "../model/Location";

export class LocationDao extends BaseDao<Location> {
    // TODO setup location position
    buildEntityFromSensorThingsAPI(data: Record<string, string>): Location {
        const location = new Location(data.name, data.description, this._service);
        location.id = data['@iot.id'] as unknown as number;
        location.setService(this._service);
        return location;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'properties'];
    }
    get entityPathname(): string {
        return "Locations";
    }
}
