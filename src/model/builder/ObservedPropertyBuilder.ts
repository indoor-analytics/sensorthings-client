import {AbstractBuilder} from "./AbstractBuilder";
import {ObservedProperty} from "../ObservedProperty";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class ObservedPropertyBuilder extends AbstractBuilder<ObservedProperty> {
    public setName(name: string): this {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): this {
        this._attributes.description = description;
        return this;
    }
    public setDefinition(definition: string): this {
        this._attributes.definition = definition;
        return this;
    }
    protected buildEntity(): ObservedProperty {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is required to build an ObservedProperty.');
        if (!this._attributes.definition)
            throw new MissingArgumentError('"definition" argument is required to build an ObservedProperty.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is required to build an ObservedProperty.');

        return new ObservedProperty(
            this._service,
            this._attributes.name as string,
            this._attributes.definition as string,
            this._attributes.description as string
        );
    }
}
