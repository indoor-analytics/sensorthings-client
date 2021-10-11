import {BaseDao} from "./BaseDao";
import {Location} from "../model/Location";

export class LocationDao extends BaseDao<Location> {
    buildEntityFromSensorThingsAPI(data: Record<string, string>): Location {
        const location = new Location(data.name, data.description);
        location.id = data['@iot.id'] as unknown as number;
        return location;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'properties'];
    }
    getEntityPathname(): string {
        return "Locations";
    }
}
