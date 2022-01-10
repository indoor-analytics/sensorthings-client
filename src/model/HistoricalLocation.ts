import { BaseDao } from "../dao/BaseDao";
import { HistoricalLocationDao } from "../dao/HistoricalLocationDao";
import { SensorThingsService } from "../service/SensorThingsService";
import { Entity } from "./Entity";
import { HistoricalLocationLocationsList } from "./list/HistoricalLocationLocationsList";
import { HistoricalLocationThingsList } from "./list/HistoricalLocationThingsList";
import { TimeChecker } from "./utils/TimeChecker";

/**
 * A Thing’s HistoricalLocation entity set provides the times of the current (i.e., last known) and previous locations of the Thing.
 * 
 * https://docs.opengeospatial.org/is/15-078r6/15-078r6.html#27
 */
export class HistoricalLocation extends Entity<HistoricalLocation> {
    /**
     * The time when the Thing is known at the Location.
     */
    public time: string;

    
    /**
     * A HistoricalLocation has one-and-only-one Thing. One Thing MAY have zero-to-many HistoricalLocations.
     */
    public things: HistoricalLocationThingsList;

    /**
     * A Location can have zero-to-many HistoricalLocations. One HistoricalLocation SHALL have one or many Locations.
     */
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
