import {BaseDao} from "../dao/BaseDao";
import {SensorThingsService} from "../service/SensorThingsService";

export abstract class Entity {
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

    abstract getDao(service: SensorThingsService): BaseDao<Entity>;
    public entityResourcePathname(service: SensorThingsService): string {
        return `${this.getDao(service).getEntityPathname()}(${this.id})`;
    }

    public toNetworkObject(): Object {
        const publicAttributes = Object.getOwnPropertyNames(this).filter(
            value => value.charAt(0) !== '_'
        );
        const object: { [attr: string]: any } = {};
        for (const attribute of publicAttributes) {
            // @ts-ignore
            object[attribute] = this[attribute];
        }
        return object;
    }
}
