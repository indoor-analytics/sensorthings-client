import {EntityList} from "./EntityList";
import {Thing} from "../Thing";
import {Location} from "../Location";

export class LocationThingsList extends EntityList<Location, Thing>{
    add(entity: Thing): Promise<void> {
        return this._service.things.createFromEntity(this._parent, entity);
    }
    list(): Promise<Thing[]> {
        return this._service.things.getFromEntity(this._parent);
    }
}
