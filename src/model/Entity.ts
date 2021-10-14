import { BaseDao } from '../dao/BaseDao';
import { SensorThingsService } from '../service/SensorThingsService';

/**
 * Abstract representation of a SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#24
 */
export abstract class Entity<T extends Entity<T>> {
    private _id: number | undefined;
    protected _service: SensorThingsService;

    protected constructor(service: SensorThingsService) {
        this._service = service;
    }

    /**
     * Get the SensorThings id associated to this entity on the current service.
     * If the id is not set, it means that the entity is not synchronized with
     * the service: in this case, an error will be thrown.
     */
    get id(): number {
        if (this._id === undefined)
            throw new RangeError(
                "Entity hasn't been created on a service yet."
            );
        return this._id;
    }
    /**
     * Sets the id of the current entity.
     * This should be called with an id from the SensorThings service.
     */
    set id(value: number) {
        this._id = value;
    }

    /**
     * Sets the service of the current entity.
     */
    setService(service: SensorThingsService): void {
        this._service = service;
    }

    /**
     * Allows to retrieve DAO related to a given entity.
     */
    abstract get dao(): BaseDao<T>;

    /**
     * Returns an URL containing the entity URL domain name and id of
     * the current entity.
     * @returns an url defining current entity
     */
    public get instancePathname(): string {
        return `${this.dao.getEntityPathname()}(${this.id})`;
    }


    /**
     * Checks if two entities are equal.
     * Two entities are considered equal if all their public properties are equal.
     * @param comparedTo compared entity
     * @returns true if both entities are equal, false otherwise
     */
    public equals(comparedTo: T): boolean {
        return (
            Object.getOwnPropertyNames(this).filter((attribute: string) => {
                // @ts-ignore
                return this[attribute] !== comparedTo[attribute];
            }).length === 0
        );
    }
}
