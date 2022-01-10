import {EntityList} from "./EntityList";
import {Datastream} from "../Datastream";
import {Observation} from "../Observation";

export class DatastreamObservationsList extends EntityList<Datastream, Observation> {
    add(entity: Observation): Promise<void> {
        return this._service.observations.createFromEntity(this._parent, entity);
    }
    list(): Promise<Observation[]> {
        return this._service.observations.getFromEntity(this._parent);
    }
}
