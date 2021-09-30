import { BaseDao } from '../dao/BaseDao';
import { SensorThingsService } from '../service/SensorThingsService';

/**
 * Abstract representation of a SensorThings entity.
 * http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#24
 */
export abstract class Entity<T extends Entity<T>> {
    private _id: number | undefined;
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
     * Allows to retrieve DAO related to a given entity.
     * @param service endpoint to use
     */
    abstract getDao(service: SensorThingsService): BaseDao<T>;

    /**
     * Returns an URL containing the entity URL domain name and id of
     * the current entity.
     * @param service service hosting entity
     * @returns an url defining current entity
     */
    public entityResourcePathname(service: SensorThingsService): string {
        return `${this.getDao(service).getEntityPathname()}(${this.id})`;
    }

    /**
     * Return all entity public (non-navigation and not private) properties.
     */
    get publicAttributes(): string[] {
        return Object.getOwnPropertyNames(this).filter(
            value => value.charAt(0) !== '_'
        );
    }

    /**
     * Returns an object containing all entity public attributes.
     * This is used while updating an entity, by exposing only fields that
     * can be updated.
     * @returns an object containing all public attributes
     */
    public toNetworkObject(): Object {
        const object: { [attr: string]: any } = {};
        for (const attribute of this.publicAttributes) {
            // @ts-ignore
            object[attribute] = this[attribute];
        }
        return object;
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
