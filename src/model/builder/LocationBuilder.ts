import {AbstractBuilder} from "./AbstractBuilder";
import {Location} from "../Location";
import {Point} from "@turf/helpers";
import {MissingArgumentError} from "../../error/MissingArgumentError";
import {SensorThingsService} from "../../service/SensorThingsService";

export class LocationBuilder extends AbstractBuilder<Location> {
    constructor(service: SensorThingsService) {
        super(service);
    }

    setLocation(location: Point): LocationBuilder {
        this._attributes.location = location;
        return this;
    }

    protected buildEntity(): Location {
        if (!this._attributes.location)
            throw new MissingArgumentError('"location" argument is required to build a Location.');

        return new Location(
            this._service,
            '' + this._attributes.name,
            '' + this._attributes.description,
            this._attributes.location as Point
        );
    }
}
