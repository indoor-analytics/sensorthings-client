import {SensorThingsService} from "../src";
import {Query} from "../src/query/Query";
import {Thing} from "../src/model/Thing";
import {ThingDao} from "../src/dao/ThingDao";
import { DumbEntity } from "./utils/DumbEntity";
import { DumbEntityDao } from "./utils/DumbEntityDao";
import { HttpClientMock } from "./utils/HttpClientMock";
import {DumbQuery} from "./utils/DumbQuery";
import {NegativeValueError} from "../src/error/NegativeValueError";
import {NotIntegerError} from "../src/error/NotIntegerError";
import {ThingAPIResponses} from "./responses/ThingAPIResponses";
import {EmptyValueError} from "../src/error/EmptyValueError";

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

    describe('Query.list', () => {
        it('should return 100 items', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const query = new Query<DumbEntity>(service, new DumbEntityDao(service));

            mockInjector.injectMockCall(service, 'https://example.org/v1.0/DumbEntities', 'get', () => {
                return {
                    data: ThingAPIResponses.things
                }
            });

            const result = await query.list();
            expect(result.length).toEqual(ThingAPIResponses.thingsLength);
        });

        it('should return 100 items when called from service DAO', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            mockInjector.injectMockCall(service, 'https://example.org/v1.0/Things', 'get', () => {
                return {
                    data: ThingAPIResponses.things
                }
            });
            const result = await service.things.query().list();
            expect(result.length).toEqual(ThingAPIResponses.thingsLength);
        });
    });

    describe('Query.top', () => {
        it('should return 5 items with top command', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            mockInjector.injectMockCall(service, 'https://example.org/v1.0/Things?$top=5', 'get', () => {
                return {
                    data: ThingAPIResponses.top5things
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

    describe('Query.skip', () => {
        it('should skip 5 items', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            mockInjector.injectMockCall(service, 'https://example.org/v1.0/Things?$skip=5', 'get', () => {
                return {
                    data: ThingAPIResponses.skipNThings(5)
                }
            });
            const result = await service.things.query()
                .skip(5)
                .list();
            expect(result.length).toEqual(ThingAPIResponses.thingsLength - 5);
            expect(result[0].id).toEqual((ThingAPIResponses.things.value as Record<string, unknown>[])[5]['@iot.id']);
        });

        it('should skip 2 items', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const skippedCount = 2;
            mockInjector.injectMockCall(service, `https://example.org/v1.0/Things?$skip=${skippedCount}`, 'get', () => {
                return {
                    data: ThingAPIResponses.skipNThings(skippedCount)
                }
            });
            const result = await service.things.query()
                .skip(skippedCount)
                .list();
            expect(result.length).toEqual(ThingAPIResponses.thingsLength - skippedCount);
            expect(result[0].id).toEqual((ThingAPIResponses.things.value as Record<string, unknown>[])[2]['@iot.id']);
        });

        it('should not skip with negative value', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const skipThings = async () => await service.things.query()
                .skip(-7)
                .list();
            await expect(skipThings()).rejects.toThrow(
                new NegativeValueError('Skip argument must be a non-negative integer.')
            );
        });

        it('should not skip with float value', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const skipThings = async () => await service.things.query()
                .skip(9.6)
                .list();
            await expect(skipThings()).rejects.toThrow(
                new NegativeValueError('Skip argument must be a non-negative integer.')
            );
        });

        it('should skip with last argument passed when called multiple times', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const skipCount = 42;
            mockInjector.injectMockCall(service, `https://example.org/v1.0/Things?$skip=${skipCount}`, 'get', () => {
                return {
                    data: ThingAPIResponses.skipNThings(skipCount)
                }
            });
            const result = await service.things.query()
                .skip(55)
                .skip(skipCount)
                .list();
            expect(result.length).toEqual(ThingAPIResponses.thingsLength - skipCount);
            expect(result[0].id).toEqual((ThingAPIResponses.things.value as Record<string, unknown>[])[skipCount]['@iot.id']);
        });
    });

    describe('Query.orderBy', () => {
        it('should not order by with empty string', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const query = new DumbQuery<DumbEntity>(service, new DumbEntityDao(service));
            const orderByEmpty = () => query.orderBy('');
            expect(orderByEmpty).toThrowError(
                new EmptyValueError('OrderBy argument must be a non-empty string.')
            );
        });

        it ('should order by name', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const query = new DumbQuery<DumbEntity>(service, new DumbEntityDao(service));
            mockInjector.injectMockCall(service, `https://example.org/v1.0/DumbEntities?$orderBy=name`, 'get', () => {
                return {
                    data: ThingAPIResponses.getThingsOrderedBy("name")
                }
            });

            const entities = await query
                .orderBy('name')
                .list();

            for (let i=0; i<entities.length-1; i++) {
                const firstItem = entities[i];
                const secondItem = entities[i+1];
                if (firstItem.name.localeCompare(secondItem.name) >= 0)
                    fail('Items are not sorted by name.');
            }
        });
    });

    describe('Combining query operations', () => {
        it('should skip and top', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const skippedCount = 15;
            const topCount = 42;
            const expectedUrl = `https://example.org/v1.0/DumbEntities?$skip=${skippedCount}&$top=${topCount}`;
            const query = new DumbQuery<DumbEntity>(service, new DumbEntityDao(service));
            query
                .skip(skippedCount)
                .top(topCount);
            expect(query.endpoint).toEqual(expectedUrl);

            mockInjector.injectMockCall(service, expectedUrl, 'get', () => {
                return {
                    data: ThingAPIResponses.skipAndTop(skippedCount, topCount)
                }
            });

            const entities = await query.list();
            const entitiesIds = entities.map(entity => entity.id);
            const expectedIds = ThingAPIResponses.getThingsIdsBetween(skippedCount, skippedCount+topCount);

            expect(entitiesIds).toEqual(expectedIds);
        });

        it('should top and skip', async () => {
            const service = new SensorThingsService('https://example.org/v1.0');
            const skippedCount = 30;
            const topCount = 12;
            const expectedUrl = `https://example.org/v1.0/DumbEntities?$skip=${skippedCount}&$top=${topCount}`;
            const query = new DumbQuery<DumbEntity>(service, new DumbEntityDao(service));
            query
                .top(topCount)
                .skip(skippedCount)

            expect(query.endpoint).toEqual(expectedUrl);

            mockInjector.injectMockCall(service, expectedUrl, 'get', () => {
                return {
                    data: ThingAPIResponses.skipAndTop(skippedCount, topCount)
                }
            });

            const entities = await query.list();
            const entitiesIds = entities.map(entity => entity.id);
            const expectedIds = ThingAPIResponses.getThingsIdsBetween(skippedCount, skippedCount+topCount);

            expect(entitiesIds).toEqual(expectedIds);
        });
    });
});
