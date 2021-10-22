import {Entity} from "../../model/Entity";
import {BaseDao} from "../BaseDao";

export class EntityIterator<T extends Entity<T>> {
    private _dao: BaseDao<T>;
    public constructor (dao: BaseDao<T>) {
        this._dao = dao;
    }

    public hasNext(): Promise<boolean> {
        return Promise.resolve(true);
    }

    public next(): Promise<T> {

    }
}
