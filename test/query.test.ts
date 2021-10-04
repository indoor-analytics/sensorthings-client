import {SensorThingsService} from "../src";
import {Query} from "../src/query/Query";
import {Thing} from "../src/model/Thing";
import {ThingDao} from "../src/dao/ThingDao";
import { DumbEntity } from "./utils/DumbEntity";
import { DumbEntityDao } from "./utils/DumbEntityDao";
import { HttpClientMock } from "./utils/HttpClientMock";
import { things } from "./responses/things";

let mockInjector: HttpClientMock;
beforeEach(() => {
    mockInjector = new HttpClientMock();
});

describe('Query', () => {
    it('Query<DumbEntity> should return DumbEntity endpoint', () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const query = new Query<DumbEntity>(service, new DumbEntityDao(service));
        expect(query.endpoint).toEqual('https://example.org/v1.0/DumbEntities');
    });

    it('Query<Thing> should return Things endpoint', () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const query = new Query<Thing>(service, new ThingDao(service));
        expect(query.endpoint).toEqual('https://example.org/v1.0/Things');
    });

    it('should return 10 items', async () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const query = new Query<DumbEntity>(service, new DumbEntityDao(service));

        mockInjector.injectMockCall(service, 'https://example.org/v1.0/DumbEntities', 'get', () => {
            return {
                data: things
            }
        });

        const result = await query.list();
        expect(result.length).toEqual(10);
    });
});
