import {EntityList} from "../../src/model/list/EntityList";
import {DumbEntity} from "./DumbEntity";
import {Location} from "../../src/model/Location";

export class DumbEntityLocationsList extends EntityList<DumbEntity, Location>{
    add(entity: Location): Promise<void> {
        return this._service.locations.createFromEntity(this._parent, entity);
    }

    list(): Promise<Location[]> {
        return this._service.locations.getFromEntity(this._parent);
    }
}
