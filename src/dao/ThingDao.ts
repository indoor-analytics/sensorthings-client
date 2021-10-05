import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return 'Things';
    }
    buildEntityFromSensorThingsAPI(data: Record<string, any>): Thing {
        const thing = new Thing(data.name, data.description);
        thing.id = data['@iot.id'];
        return thing;
    }
}
