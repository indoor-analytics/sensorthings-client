import {AbstractBuilder} from "./AbstractBuilder";
import {Observation} from "../Observation";

export class ObservationBuilder extends AbstractBuilder<Observation> {
    public setPhenomenonTime (time: string): ObservationBuilder {
        this._attributes.phenomenonTime = time;
        return this;
    }
    public setResult (result: unknown): ObservationBuilder {
        this._attributes.result = result;
        return this;
    }
    public setResultTime (time: string): ObservationBuilder {
        this._attributes.resultTime = time;
        return this;
    }
    public setResultQuality (quality: unknown): ObservationBuilder {
        this._attributes.resultQuality = quality;
        return this;
    }
    public setValidTime (time: string): ObservationBuilder {
        this._attributes.validTime = time;
        return this;
    }
    public setParameters(parameters: Object): ObservationBuilder {
        this._attributes.parameters = parameters;
        return this;
    }

    protected buildEntity(): Observation {
        throw new Error('not implemented');
    }
}
