import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return 'Things';
    }

    async get(id: number): Promise<Thing> {
        return new Thing('name', id.toString());
    }
}
