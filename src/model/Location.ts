import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";
import {LocationDao} from "../dao/LocationDao";
import {Point} from "@turf/helpers";
import {LocationThingsList} from "./list/LocationThingsList";
import {LocationHistoricalLocationsList} from "./list/LocationHistoricalLocationsList";

/**
 * The Location entity locates the Thing or the Things it associated with. 
 * A Thing’s Location entity is defined as the last known location of the Thing.
 * A Thing’s Location may be identical to the Thing’s Observations’ FeatureOfInterest. 
 * 
 * In the context of the IoT, the principle location of interest is usually associated with the location of the Thing, 
 * especially for in-situ sensing applications. 
 * For example, the location of interest of a wifi-connected thermostat should be the building or the room in which the 
 * smart thermostat is located. And the FeatureOfInterest of the Observations made by the thermostat (e.g., room temperature 
 * readings) should also be the building or the room. In this case, the content of the smart thermostat’s location should be 
 * the same as the content of the temperature readings’ feature of interest.
 * 
 * However, the ultimate location of interest of a Thing is not always the location of the Thing (e.g., in the case of remote 
 * sensing). In those use cases, the content of a Thing’s Location is different from the content of theFeatureOfInterest of 
 * the Thing’s Observations. Section 7.1.4 of [OGC 10-004r3 and ISO 19156:2011] provides a detailed explanation of observation location.
 * 
 * https://docs.opengeospatial.org/is/15-078r6/15-078r6.html#26
 */
export class Location extends Entity<Location> {
    /**
     * A property provides a label for Location entity, commonly a descriptive name.
     */
    public name: string;

    /**
     * The description about the Location.
     */
    public description: string;

    /**
     * The encoding type of the Location property.
     */
    public readonly encodingType: string;

    /**
     * The location type is defined by encodingType.
     */
    public location: Point;


    /**
     * Multiple Things MAY locate at the same Location. A Thing MAY not have a Location.
     */
    public things: LocationThingsList;

    /**
     * A Location can have zero-to-many HistoricalLocations. One HistoricalLocation SHALL have one or many Locations.
     */
    public historicalLocations: LocationHistoricalLocationsList;

    constructor(service: SensorThingsService, name: string, description: string, location: Point) {
        super(service);
        this.name = name;
        this.description = description;
        this.encodingType = this._service.compatibility.encodingType;
        this.location = location;
        this.things = new LocationThingsList(this, this._service);
        this.historicalLocations = new LocationHistoricalLocationsList(this, this._service);
    }

    get dao(): BaseDao<Location> {
        return new LocationDao(this._service);
    }
}
