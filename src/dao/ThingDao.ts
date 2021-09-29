import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return 'Things';
    }

    async get(id: number): Promise<Thing> {
        const response = await this._service.httpClient.get([
            this._service.endpoint.origin,
            this.getEntityPathname() + `(${id})`
        ].join('/'));
        const thing = new Thing(response.data.name, response.data.description);
        thing.id = response.data['@iot.id']
        return thing;
    }
}
