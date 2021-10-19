import { HistoricalLocation } from "../HistoricalLocation";
import { Thing } from "../Thing";
import { EntityList } from "./EntityList";

export class HistoricalLocationThingsList extends EntityList<HistoricalLocation, Thing> {
    public list(): Promise<Thing[]> {
        return this._service.things.getFromEntity(this._parent);
    }
    public add(entity: Thing): Promise<void> {
        return this._service.things.createFromEntity(this._parent, entity);
    }
}