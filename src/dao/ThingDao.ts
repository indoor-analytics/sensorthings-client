import { BaseDao } from './BaseDao';
import { Thing } from '../model/Thing';
import {NotFoundError} from "../error/NotFoundError";
import {AxiosError, AxiosResponse} from "axios";

export class ThingDao extends BaseDao<Thing> {
    getEntityPathname(): string {
        return 'Things';
    }

    async get(id: number): Promise<Thing> {
        return await this._service.httpClient.get([
            this._service.endpoint.origin,
            this.getEntityPathname() + `(${id})`
        ].join('/'))
            .catch((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundError('Entity does not exist.');
                }

                // @ts-ignore
        }).then((response: AxiosResponse) => {
            const thing = new Thing(response.data.name, response.data.description);
            thing.id = response.data['@iot.id']
            return thing;
        });
    }
}
