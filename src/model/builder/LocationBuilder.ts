import {AbstractBuilder} from "./AbstractBuilder";
import {Location} from "../Location";
import {point, Point, Position} from "@turf/helpers";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class LocationBuilder extends AbstractBuilder<Location> {
    setName(name: string): LocationBuilder {
        this._attributes.name = name;
        return this;
    }

    setDescription(description: string): LocationBuilder {
        this._attributes.description = description;
        return this;
    }

    setProperties(properties: Object): LocationBuilder {
        this._attributes.properties = properties;
        return this;
    }

    setLocation(coordinates: Position): LocationBuilder {
        this._attributes.location = point(coordinates).geometry;
        return this;
    }

    protected buildEntity(): Location {
        if (!this._attributes.location)
            throw new MissingArgumentError('"location" argument is required to build a Location.');

        const properties = this._attributes.properties as Record<string, unknown>;

        return new Location(
            this._service,
            this._attributes.name ? '' + this._attributes.name : '',
            this._attributes.description ? '' + this._attributes.description : '',
            this._attributes.location as Point,
            properties ? properties : {}
        );
    }
}
