import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    get entityPathname(): string {
        return 'Things';
    }
    buildEntityFromSensorThingsAPI(data: Record<string, string>): Thing {
        const thing = new Thing(data.name, data.description, this._service);
        thing.id = data['@iot.id'] as unknown as number;
        thing.setService(this._service);
        return thing;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description'];
    }
}
