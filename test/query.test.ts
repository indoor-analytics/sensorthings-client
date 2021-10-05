import {SensorThingsService} from "../src";
import {Query} from "../src/query/Query";
import {Thing} from "../src/model/Thing";
import {ThingDao} from "../src/dao/ThingDao";
import { DumbEntity } from "./utils/DumbEntity";
import { DumbEntityDao } from "./utils/DumbEntityDao";
import { HttpClientMock } from "./utils/HttpClientMock";
import { things } from "./responses/things";
import {DumbQuery} from "./utils/DumbQuery";
import {top5Things} from "./responses/top5Things";
import {NegativeValueError} from "../src/error/NegativeValueError";
import {NotIntegerError} from "../src/error/NotIntegerError";

let mockInjector: HttpClientMock;
beforeEach(() => {
    mockInjector = new HttpClientMock();
});

describe('Query', () => {
    it('Query<DumbEntity> should return DumbEntity endpoint', () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const query = new DumbQuery<DumbEntity>(service, new DumbEntityDao(service));
        expect(query.endpoint).toEqual('https://example.org/v1.0/DumbEntities');
    });

    it('Query<Thing> should return Things endpoint', () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const query = new DumbQuery<Thing>(service, new ThingDao(service));
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

    it('should return 10 items when called from service DAO', async () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        mockInjector.injectMockCall(service, 'https://example.org/v1.0/Things', 'get', () => {
            return {
                data: things
            }
        });
        const result = await service.things.query().list();
        expect(result.length).toEqual(10);
    });

    it('should return 5 items with top command', async () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        mockInjector.injectMockCall(service, 'https://example.org/v1.0/Things?$top=5', 'get', () => {
            return {
                data: top5Things
            }
        });
        const result = await service.things.query()
            .top(5)
            .list();
        expect(result.length).toEqual(5);
    });

    it('should throw when trying to get first -7 items', async () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const getThings = async () => await service.things.query()
            .top(-7)
            .list();
        await expect(getThings()).rejects.toThrow(
            new NegativeValueError('Top argument shall be a non-negative integer.')
        );
    });

    it('should throw when trying to get first 9.6 items', async () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const getThings = async () => await service.things.query()
            .top(9.6)
            .list();
        await expect(getThings()).rejects.toThrow(
            new NotIntegerError('Top argument shall be a non-negative integer.')
        );
    });
});
