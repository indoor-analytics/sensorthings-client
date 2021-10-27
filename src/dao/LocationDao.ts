import {BaseDao} from "./BaseDao";
import {Location} from "../model/Location";
import {Point} from "@turf/helpers";

export class LocationDao extends BaseDao<Location> {
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'location', 'encodingType'];
    }
    get entityPathname(): string {
        return "Locations";
    }
    buildEntity(data: Record<string, unknown>): Location {
        return new Location(
            this._service,
            data.name as string,
            data.description as string,
            data.location as Point
        );
    }
}
