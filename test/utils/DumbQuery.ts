import {Query} from "../../src/query/Query";
import {Entity} from "../../src/model/Entity";

export class DumbQuery<T extends Entity<T>> extends Query<T> {
    public get endpoint(): string {
        return this._endpoint;
    }
}
