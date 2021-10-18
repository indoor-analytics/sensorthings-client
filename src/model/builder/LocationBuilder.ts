import {AbstractBuilder} from "./AbstractBuilder";
import {Location} from "../Location";
import {Feature, Geometry} from "@turf/helpers";
import {MissingArgumentError} from "../../error/MissingArgumentError";
import {SensorThingsService} from "../../service/SensorThingsService";

export class LocationBuilder extends AbstractBuilder<Location> {
    constructor(service: SensorThingsService) {
        super(service);
    }

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
            this._attributes.location as Feature<Geometry>,
            this._service
        );
    }
}
