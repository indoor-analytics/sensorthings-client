import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return 'Things';
    }
    buildEntityFromSensorThingsAPI(data: Record<string, string>): Thing {
        return new Thing(data.name, data.description);
    }
}
