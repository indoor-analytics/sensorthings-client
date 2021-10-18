import {EntityList} from "./EntityList";
import {Thing} from "../Thing";
import {Location} from "../Location";

export class ThingLocationsList extends EntityList<Thing, Location> {
    add(entity: Location): Promise<void> {
        return this._service.locations.createFromEntity(this._parent, entity);
    }

    list(): Promise<Location[]> {
        return this._service.locations.getFromEntity(this._parent);
    }
}
