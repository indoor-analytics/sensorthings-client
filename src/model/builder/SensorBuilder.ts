import {AbstractBuilder} from "./AbstractBuilder";
import {Sensor} from "../Sensor";

export class SensorBuilder extends AbstractBuilder<Sensor> {
    public setName(_: string): SensorBuilder {
        throw new Error('not implemented');
    }
    public setDescription(_: string): SensorBuilder {
        throw new Error('not implemented');
    }
    public setEncodingType(_: string): SensorBuilder {
        throw new Error('not implemented');
    }
    public setMetaData(_: string): SensorBuilder {
        throw new Error('not implemented');
    }

    protected buildEntity(): Sensor {
        throw new Error('not implemented');
    }
}
