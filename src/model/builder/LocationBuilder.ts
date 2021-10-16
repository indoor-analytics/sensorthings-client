import {AbstractBuilder} from "./AbstractBuilder";
import {Location} from "../Location";
import {Feature} from "@turf/helpers";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class LocationBuilder extends AbstractBuilder<Location> {
    setLocation(location: Feature): LocationBuilder {
        this._attributes.location = location;
        return this;
    }

    protected buildEntity(): Location {
        if (!this._attributes.location)
            throw new MissingArgumentError('"location" argument is required to build a Location.');

        return new Location(
            '' + this._attributes.name,
            '' + this._attributes.description,
            this._attributes.location as Feature,
            this._service
        );
    }
}
