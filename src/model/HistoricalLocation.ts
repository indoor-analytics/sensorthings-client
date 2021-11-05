import { BaseDao } from "../dao/BaseDao";
import { HistoricalLocationDao } from "../dao/HistoricalLocationDao";
import { SensorThingsService } from "../service/SensorThingsService";
import { Entity } from "./Entity";
import { HistoricalLocationLocationsList } from "./list/HistoricalLocationLocationsList";
import { HistoricalLocationThingsList } from "./list/HistoricalLocationThingsList";
import { TimeChecker } from "./utils/TimeChecker";

/**
 * Representation of a SensorThings HistoricalLocation entity.
 * https://docs.opengeospatial.org/is/15-078r6/15-078r6.html#27
 */
export class HistoricalLocation extends Entity<HistoricalLocation> {
    public time: string;

    public things: HistoricalLocationThingsList;
    public locations: HistoricalLocationLocationsList;

    constructor(service: SensorThingsService, time: string) {
        super(service);
        if (!new TimeChecker().checkISODate(time))
            throw new RangeError(`"${time}" is not a valid time value.`);
        this.time = time;
        
        this.things = new HistoricalLocationThingsList(this, this._service);
        this.locations = new HistoricalLocationLocationsList(this, this._service);
    }

    get dao(): BaseDao<HistoricalLocation> {
        return new HistoricalLocationDao(this._service);
    }
}
