import { Datastream } from "../Datastream";
import { Observation } from "../Observation";
import { EntityList } from "./EntityList";

export class ObservationsDatastreamsList extends EntityList<Observation, Datastream> {
    add(entity: Datastream): Promise<void> {
        return this._service.datastreams.createFromEntity(this._parent, entity);
    }
    list(): Promise<Datastream[]> {
        return this._service.datastreams.getFromEntity(this._parent);
    }
}