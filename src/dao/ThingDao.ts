import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return 'Things';
    }
    buildEntityFromSensorThingsAPI(data: Record<string, string>): Thing {
        const thing = new Thing(data.name, data.description);
        thing.id = data['@iot.id'] as unknown as number;
        return thing;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description'];
    }
}
