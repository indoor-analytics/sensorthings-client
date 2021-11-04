import { Feature } from "@turf/helpers";
import { MissingArgumentError } from "../../error/MissingArgumentError";
import { FeatureOfInterest } from "../FeatureOfInterest";
import { AbstractBuilder } from "./AbstractBuilder";

export class FeatureOfInterestBuilder extends AbstractBuilder<FeatureOfInterest> {
    public setName(name: string): FeatureOfInterestBuilder {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): FeatureOfInterestBuilder {
        this._attributes.description = description;
        return this;
    }
    public setFeature(feature: Feature): FeatureOfInterestBuilder {
        this._attributes.feature = feature;
        return this;
    }
    protected buildEntity(): FeatureOfInterest {
        if (!this._attributes.name)
            throw new MissingArgumentError('"name" argument is required to build a FeatureOfInterest.');
        if (!this._attributes.description)
            throw new MissingArgumentError('"description" argument is required to build a FeatureOfInterest.');
        if (!this._attributes.feature)
            throw new MissingArgumentError('"feature" argument is required to build a FeatureOfInterest.');
        
        return new FeatureOfInterest(
            this._service,
            this._attributes.name as string,
            this._attributes.description as string,
            this._attributes.feature as Feature
        );
    }
}