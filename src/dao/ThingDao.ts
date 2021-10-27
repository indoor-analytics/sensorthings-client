import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';
import {AxiosResponse} from "axios";

export class ThingDao extends BaseDao<Thing> {
    get entityPathname(): string {
        return 'Things';
    }
    buildEntityFromSensorThingsAPIRawData(data: Record<string, string>): Thing {
        const thing = new Thing(this._service, data.name, data.description);
        thing.id = data['@iot.id'] as unknown as number;
        thing.setService(this._service);
        return thing;
    }
    buildEntityFromSensorThingsAPIResponse(response: AxiosResponse): Thing {
        const data = response.data as Record<string, string>;
        const thing = new Thing(this._service, data.name, data.description);
        thing.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        thing.setService(this._service);
        return thing;
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description'];
    }
}
