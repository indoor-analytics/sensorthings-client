import { BaseDao } from "../dao/BaseDao";
import { HistoricalLocationDao } from "../dao/HistoricalLocationDao";
import { SensorThingsService } from "../service/SensorThingsService";
import { Entity } from "./Entity";
import { HistoricalLocationLocationsList } from "./list/HistoricalLocationLocationsList";
import { HistoricalLocationThingsList } from "./list/HistoricalLocationThingsList";

export class HistoricalLocation extends Entity<HistoricalLocation> {
    public time: string;

    public things: HistoricalLocationThingsList;
    public locations: HistoricalLocationLocationsList;

    constructor(service: SensorThingsService, time: string) {
        super(service);
        this.time = time;
        this.things = new HistoricalLocationThingsList(this, this._service);
        this.locations = new HistoricalLocationLocationsList(this, this._service);
    }

    get dao(): BaseDao<HistoricalLocation> {
        return new HistoricalLocationDao(this._service);
    }
}