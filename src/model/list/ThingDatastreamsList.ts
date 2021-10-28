import {EntityList} from "./EntityList";
import {Thing} from "../Thing";
import {Datastream} from "../Datastream";

export class ThingDatastreamsList extends EntityList<Thing, Datastream> {
    add(entity: Datastream): Promise<void> {
        return this._service.datastreams.createFromEntity(this._parent, entity);
    }
    list(): Promise<Datastream[]> {
        return this._service.datastreams.getFromEntity(this._parent);
    }
}
