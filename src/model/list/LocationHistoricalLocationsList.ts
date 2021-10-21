import {EntityList} from "./EntityList";
import {HistoricalLocation} from "../HistoricalLocation";
import {Location} from "../Location";

export class LocationHistoricalLocationsList extends EntityList<Location, HistoricalLocation> {
    add(entity: HistoricalLocation): Promise<void> {
        return this._service.historicalLocations.createFromEntity(this._parent, entity);
    }
    list(): Promise<HistoricalLocation[]> {
        return this._service.historicalLocations.getFromEntity(this._parent);
    }
}
