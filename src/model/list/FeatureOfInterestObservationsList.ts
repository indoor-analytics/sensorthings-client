import { FeatureOfInterest } from "../FeatureOfInterest";
import { Observation } from "../Observation";
import { EntityList } from "./EntityList";

export class FeatureOfInterestObservationsList extends EntityList<FeatureOfInterest, Observation> {
    add(entity: Observation): Promise<void> {
        return this._service.observations.createFromEntity(this._parent, entity);
    }
    list(): Promise<Observation[]> {
        return this._service.observations.getFromEntity(this._parent);
    }
}