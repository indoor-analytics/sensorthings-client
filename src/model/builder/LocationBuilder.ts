import {AbstractBuilder} from "./AbstractBuilder";
import {Location} from "../Location";
import {Feature} from "@turf/helpers";

export class LocationBuilder extends AbstractBuilder<Location> {
    setLocation(location: Feature): LocationBuilder {
        this._attributes.location = location;
        return this;
    }

    protected buildEntity(): Location {
        return new Location(
            '' + this._attributes.name,
            '' + this._attributes.description,
            this._service
        );
    }
}
