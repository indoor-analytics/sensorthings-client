import { Entity } from './Entity';
import { BaseDao } from '../dao/BaseDao';
import { ThingDao } from '../dao/ThingDao';
import { SensorThingsService } from '../service/SensorThingsService';
import {ThingLocationsList} from "./list/ThingLocationsList";
import {ThingHistoricalLocationsList} from "./list/ThingHistoricalLocationsList";
import {ThingDatastreamsList} from "./list/ThingDatastreamsList";

/**
 * The OGC SensorThings API follows the ITU-T definition, i.e., with regard to the Internet of Things, a thing 
 * is an object of the physical world (physical things) or the information world (virtual things) that is capable 
 * of being identified and integrated into communication networks [ITU-T Y.2060].
 * 
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#25
 */
export class Thing extends Entity<Thing> {
    /**
     * A property provides a label for Thing entity, commonly a descriptive name.
     */
    public name: string;

    /**
     * This is a short description of the corresponding Thing entity.
     */
    public description: string;

    /**
     * A JSON Object containing user-annotated properties as key-value pairs.
     */
    public properties: Record<string, unknown>;


    /**
     * The Location entity locates the Thing. 
     * 
     * Multiple Things MAY be located at the same Location. 
     * A Thing MAY not have a Location. A Thing SHOULD have only one Location.
     * However, in some complex use cases, a Thing MAY have more than one Location representations. In such case, 
     * the Thing MAY have more than one Locations. These Locations SHALL have different encodingTypes and the 
     * encodingTypes SHOULD be in different spaces (e.g., one encodingType in Geometrical space and one encodingType 
     * in Topological space).
     */
    public locations: ThingLocationsList;

    /**
     * A Thing has zero-to-many HistoricalLocations. A HistoricalLocation has one-and-only-one Thing.
     */
    public historicalLocations: ThingHistoricalLocationsList;

    /**
     * A Thing MAY have zero-to-many Datastreams.
     */
    public datastreams: ThingDatastreamsList;

    constructor(
        service: SensorThingsService, name: string, description: string,
        properties: Record<string, unknown> = {}
    ) {
        super(service);
        this.name = name;
        this.description = description;
        this.properties = properties;
        this.locations = new ThingLocationsList(this, this._service);
        this.historicalLocations = new ThingHistoricalLocationsList(this, this._service);
        this.datastreams = new ThingDatastreamsList(this, this._service);
    }

    get dao(): BaseDao<Thing> {
        return new ThingDao(this._service);
    }
}
