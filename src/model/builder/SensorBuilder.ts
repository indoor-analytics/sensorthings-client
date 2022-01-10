import {AbstractBuilder} from "./AbstractBuilder";
import {Sensor} from "../Sensor";

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
        return new Sensor(
            this._service,
            this._attributes.name as string,
            this._attributes.description as string,
            this._attributes.encodingType as string,
            this._attributes.metadata as string
        );
    }
}
