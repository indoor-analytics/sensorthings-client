import {Entity} from "./Entity";
import {BaseDao} from "../dao/BaseDao";
import {Polygon} from "@turf/helpers";

export class Datastream extends Entity<Datastream> {
    public name: string;
    public description: string;
    public unitOfMeasurement: {name: string, symbol: string, definition: string};
    public observationType: 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CategoryObservation' | 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CountObservation' | 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement' | 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Observation' | 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_TruthObservation';
    public observedArea: Polygon;
    public phenomenonTime: string;
    public resultTime: string;

    // TODO add entities collections
    //public things;
    //public sensors;
    //public observedProperties;
    //public observations;

    get dao(): BaseDao<Datastream> {
        return undefined;
    }
}
