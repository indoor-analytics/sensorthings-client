import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    get entityPathname(): string {
        return 'Things';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'properties', 'description'];
    }
    buildEntity(data: Record<string, unknown>): Thing {
        return new Thing(
            this._service,
            data.name as string,
            data.description as string
        );
    }
}
