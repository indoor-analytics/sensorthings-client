import {EntityList} from "./EntityList";
import {ObservedProperty} from "../ObservedProperty";
import {Datastream} from "../Datastream";

export class ObservedPropertyDatastreamsLists extends EntityList<ObservedProperty, Datastream> {
    add(entity: Datastream): Promise<void> {
        return this._service.datastreams.createFromEntity(this._parent, entity);
    }
    list(): Promise<Datastream[]> {
        return this._service.datastreams.getFromEntity(this._parent);
    }
}
