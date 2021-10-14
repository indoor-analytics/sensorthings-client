import {AbstractBuilder} from "./AbstractBuilder";
import {Thing} from "../Thing";
import {SensorThingsService} from "../../service/SensorThingsService";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class ThingBuilder extends AbstractBuilder<Thing> {
    constructor(service: SensorThingsService) {
        super(service);
    }

    public setName(name: string): ThingBuilder {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): ThingBuilder {
        this._attributes.description = description;
        return this;
    }

    buildEntity(): Thing {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is required to build a Thing.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is required to build a Thing.');

        return new Thing('' + this._attributes.name, '' + this._attributes.description, this._service);
    }
}
