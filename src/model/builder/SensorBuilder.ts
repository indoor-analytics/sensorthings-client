import {AbstractBuilder} from "./AbstractBuilder";
import {Sensor} from "../Sensor";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class SensorBuilder extends AbstractBuilder<Sensor> {
    public setName(name: string): SensorBuilder {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): SensorBuilder {
        this._attributes.description = description;
        return this;
    }
    public setEncodingType(encodingType: string): SensorBuilder {
        this._attributes.encodingType = encodingType;
        return this;
    }
    public setMetaData(metadata: string): SensorBuilder {
        this._attributes.metadata = metadata;
        return this;
    }

    protected buildEntity(): Sensor {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is required to build a Sensor.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is required to build a Sensor.');
        if (!this._attributes.encodingType)
            throw new MissingArgumentError('"encodingType" argument is required to build a Sensor.');
        if (!this._attributes.metadata)
            throw new MissingArgumentError('"metadata" argument is required to build a Sensor.');

        return new Sensor(
            this._service,
            this._attributes.name as string,
            this._attributes.description as string,
            this._attributes.encodingType as string,
            this._attributes.metadata as string
        );
    }
}
