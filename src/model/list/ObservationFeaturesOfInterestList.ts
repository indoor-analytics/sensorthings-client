import { FeatureOfInterest } from "../FeatureOfInterest";
import { Observation } from "../Observation";
import { EntityList } from "./EntityList";

export class ObservationFeaturesOfInterestList extends EntityList<Observation, FeatureOfInterest> {
    add(entity: FeatureOfInterest): Promise<void> {
        return this._service.featuresOfInterest.createFromEntity(this._parent, entity);
    }
    list(): Promise<FeatureOfInterest[]> {
        return this._service.featuresOfInterest.getFromEntity(this._parent);
    }    
}