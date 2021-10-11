import {Query} from "../../src/query/Query";
import {Entity} from "../../src/model/Entity";

/**
 * This is a dumb extension of the Query class.
 * It allows to read its endpoint, which is not accessible in Query instances.
 */
export class DumbQuery<T extends Entity<T>> extends Query<T> {
    public get endpoint(): string {
        return this._endpoint;
    }
}
