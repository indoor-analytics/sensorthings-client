import {AbstractBuilder} from "./AbstractBuilder";
import {Observation} from "../Observation";
import {MissingArgumentError} from "../../error/MissingArgumentError";

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
        if (!this._attributes.phenomenonTime)
            throw new MissingArgumentError('"phenomenonTime" argument is required to build an Observation.');
        if (!this._attributes.result)
            throw new MissingArgumentError('"result" argument is required to build an Observation.');
        if (!this._attributes.resultTime)
            throw new MissingArgumentError('"resultTime" argument is required to build an Observation.');

        return new Observation(
            this._service,
            this._attributes.phenomenonTime as string,
            this._attributes.result,
            this._attributes.resultTime as string,
            this._attributes.resultQuality,
            this._attributes.validTime as string,
            this._attributes.parameters as Record<string, unknown>
        )
    }
}
