import { HistoricalLocation } from "../HistoricalLocation";
import { Location } from "../Location";
import { EntityList } from "./EntityList";

export class HistoricalLocationLocationsList extends EntityList<HistoricalLocation, Location> {
    public list(): Promise<Location[]> {
        return this._service.locations.getFromEntity(this._parent);
    }
    public add(entity: Location): Promise<void> {
        return this._service.locations.createFromEntity(this._parent, entity);
    }
}