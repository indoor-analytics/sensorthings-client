/**
 * Types Datastream.unitOfMeasurement attribute.
 *
 * The name property presents the full name of the unitOfMeasurement;
 * the symbol property shows the textual form of the unit symbol;
 * and the definition contains the URI defining the unitOfMeasurement.
 *
 * The values of these properties SHOULD follow the Unified Code for
 * Unit of Measure (UCUM).
 */
export interface UnitOfMeasurement {
    name: string;
    symbol: string;
    definition: string;
}
