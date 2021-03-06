import {AbstractBuilder} from "./AbstractBuilder";
import {Thing} from "../Thing";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class ThingBuilder extends AbstractBuilder<Thing> {
    public setName(name: string): ThingBuilder {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): ThingBuilder {
        this._attributes.description = description;
        return this;
    }
    public setProperties(properties: Object): ThingBuilder {
        this._attributes.properties = properties;
        return this;
    }

    protected buildEntity(): Thing {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is required to build a Thing.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is required to build a Thing.');

        const properties = this._attributes.properties as Record<string, unknown>;

        return new Thing(
            this._service,
            '' + this._attributes.name,
            '' + this._attributes.description,
            properties ? properties : {}
        );
    }
}
