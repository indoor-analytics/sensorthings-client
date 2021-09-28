import {BaseDao} from "./BaseDao";
import {Thing} from "../model/Thing";

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return "Things";
    }
}
