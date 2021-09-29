import { BaseDao } from '../dao/BaseDao';
import { SensorThingsService } from '../service/SensorThingsService';

export abstract class Entity<T extends Entity<T>> {
    private _id: number | undefined;
    get id(): number {
        if (this._id === undefined)
            throw new RangeError(
                "Entity hasn't been created on a service yet."
            );
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    // TODO force Entity subclasses to implement a static method to instantiate such subclass from HTTP data
    // abstract fromSensorThingsAPI(data: any): Entity;

    abstract getDao(service: SensorThingsService): BaseDao<T>;
    public entityResourcePathname(service: SensorThingsService): string {
        return `${this.getDao(service).getEntityPathname()}(${this.id})`;
    }

    get publicAttributes(): string[] {
        return Object.getOwnPropertyNames(this).filter(
            value => value.charAt(0) !== '_'
        );
    }

    public toNetworkObject(): Object {
        const object: { [attr: string]: any } = {};
        for (const attribute of this.publicAttributes) {
            // @ts-ignore
            object[attribute] = this[attribute];
        }
        return object;
    }

    public equals(comparedTo: T): boolean {
        return (
            Object.getOwnPropertyNames(this).filter((attribute: string) => {
                // @ts-ignore
                return this[attribute] !== comparedTo[attribute];
            }).length === 0
        );
    }
}
