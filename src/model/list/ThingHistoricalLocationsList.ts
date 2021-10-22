import {EntityList} from "./EntityList";
import {Thing} from "../Thing";
import {HistoricalLocation} from "../HistoricalLocation";

export class ThingHistoricalLocationsList extends EntityList<Thing, HistoricalLocation>{
    add(entity: HistoricalLocation): Promise<void> {
        return this._service.historicalLocations.createFromEntity(this._parent, entity);
    }
    list(): Promise<HistoricalLocation[]> {
        return this._service.historicalLocations.getFromEntity(this._parent);
    }
}
