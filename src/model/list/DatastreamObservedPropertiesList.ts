import {EntityList} from "./EntityList";
import {Datastream} from "../Datastream";
import {ObservedProperty} from "../ObservedProperty";

export class DatastreamObservedPropertiesList extends EntityList<Datastream, ObservedProperty> {
    add(entity: ObservedProperty): Promise<void> {
        return this._service.observedProperties.createFromEntity(this._parent, entity);
    }
    list(): Promise<ObservedProperty[]> {
        return this._service.observedProperties.getFromEntity(this._parent);
    }
}
