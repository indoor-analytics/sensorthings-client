/**
 * Lists possible values for Datastream.observationType values.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#table_12
 */
export enum ObservationType {
    OM_CategoryObservation = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CategoryObservation',
    OM_CountObservation = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_CountObservation',
    OM_Measurement = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement',
    OM_Observation = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Observation',
    OM_TruthObservation = 'http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_TruthObservation'
}
