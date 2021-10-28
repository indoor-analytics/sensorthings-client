import {EntityList} from "./EntityList";
import {Datastream} from "../Datastream";
import {Thing} from "../Thing";

export class DatastreamThingsList extends EntityList<Datastream, Thing> {
    add(entity: Thing): Promise<void> {
        return this._service.things.createFromEntity(this._parent, entity);
    }
    list(): Promise<Thing[]> {
        return this._service.things.getFromEntity(this._parent);
    }
}
