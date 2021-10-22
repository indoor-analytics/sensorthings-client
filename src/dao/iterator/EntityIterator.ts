import {Entity} from "../../model/Entity";
import {BaseDao} from "../BaseDao";

export class EntityIterator<T extends Entity<T>> {
    private readonly _dao: BaseDao<T>;
    public constructor (dao: BaseDao<T>) {
        this._dao = dao;
    }

    public hasNext(): Promise<boolean> {
        return Promise.resolve(false);
    }

    public next(): Promise<T> {
        console.log(this._dao);
        throw new Error('Not implemented');
    }
}
