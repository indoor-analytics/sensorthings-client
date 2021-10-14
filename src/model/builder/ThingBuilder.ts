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

    build(): Thing {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is missing.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is missing.');

        const t: Thing = new Thing('' + this._attributes.name, '' + this._attributes.description);
        t.setService(this._service);
        return t;
    }
}
