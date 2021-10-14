import {DumbEntity} from "./DumbEntity";
import {AbstractBuilder} from "../../src/model/builder/AbstractBuilder";
import {SensorThingsService} from "../../src";
import {MissingArgumentError} from "../../src/error/MissingArgumentError";

export class DumbEntityBuilder extends AbstractBuilder<DumbEntity> {
    constructor(service: SensorThingsService) {
        super(service);
    }

    public setName(name: string): DumbEntityBuilder {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): DumbEntityBuilder {
        this._attributes.description = description;
        return this;
    }

    build(): DumbEntity {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is required to build a DumbEntity.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is required to build a DumbEntity.');

        return new DumbEntity('' + this._attributes.name, '' + this._attributes.description, this._service);
    }
}
