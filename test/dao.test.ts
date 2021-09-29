import { ThingDao } from '../src/dao/ThingDao';
import { SensorThingsService } from '../src';
import { Thing } from '../src/model/Thing';
// @ts-ignore
import { HttpClientMock } from './utils/HttpClientMock';
import { NotFoundError } from '../src/error/NotFoundError';
import { AxiosError } from 'axios';

let mockInjector: HttpClientMock;
beforeEach(() => {
    mockInjector = new HttpClientMock();
});

describe('DAO', () => {
    describe('Entity path names', () => {
        const service = new SensorThingsService('https://example.org');

        it('ThingDao should return correct path name', () => {
            const urlPrefix = new ThingDao(service).getEntityPathname();
            expect(urlPrefix).toEqual('Things');
        });
    });

    describe('Operations', () => {
        it('should get newly-created entity', async () => {
            const randomThingId = Math.ceil(Math.random() * 3000000);
            const service = new SensorThingsService('https://example.org');
            const thingName = 'name',
                thingDescription = 'description';
            const thing = new Thing(thingName, thingDescription);
            const getThingObject = () => {
                return JSON.parse(`{
                    "data": {
                        "@iot.id": ${randomThingId},
                        "@iot.selfLink": "https://example.org/Things(${randomThingId})",
                        "description": "${thingDescription}",
                        "name": "${thingName}",
                        "Datastreams@iot.navigationLink": "https://example.org/Things(${randomThingId})/Datastreams",
                        "HistoricalLocations@iot.navigationLink": "https://example.org/Things(${randomThingId})/HistoricalLocations",
                        "Locations@iot.navigationLink": "https://example.org/Things(${randomThingId})/Locations"
                    }
                }`);
            };
            mockInjector.injectMockCall(
                service,
                'https://example.org/Things',
                'post',
                getThingObject
            );
            mockInjector.injectMockCall(
                service,
                `https://example.org/Things(${randomThingId})`,
                'get',
                getThingObject
            );

            await service.things.create(thing);
            const createdThing = await service.things.get(thing.id);

            expect(createdThing.equals(thing)).toBeTruthy();
        });

        it('should throw when getting non-existent entity', async () => {
            const service = new SensorThingsService('https://example.org');
            mockInjector.injectMockCall(
                service,
                'https://example.org/Things(42)',
                'get',
                async () => {
                    const error: Error = new Error() as AxiosError;
                    // @ts-ignore
                    error.response = {
                        config: undefined,
                        headers: undefined,
                        request: undefined,
                        statusText: '',
                        status: 404,
                        data: {
                            errorId: '46a645ec-d50f-4ae5-92ee-b5d532ddfaec',
                            code: 'INVALID_ID',
                            message: 'Entity not found',
                            baseURL: 'https://example.org',
                        },
                    };
                    throw error;
                }
            );
            const getThing = () => service.things.get(42);
            await expect(getThing()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should throw when updating non-existent entity', async () => {
            const service = new SensorThingsService('https://example.org');
            mockInjector.injectMockCall(
                service,
                'https://example.org/Things(42)',
                'patch',
                async () => {
                    const error: Error = new Error() as AxiosError;
                    // @ts-ignore
                    error.response = {
                        config: undefined,
                        headers: undefined,
                        request: undefined,
                        statusText: '',
                        status: 404,
                        data: {
                            errorId: '46a645cc-d50f-4ae5-92ee-b5d532ddfaec',
                            code: 'INVALID_ID',
                            message: 'Entity not found',
                            baseURL: 'https://example.org',
                        },
                    };
                    throw error;
                }
            );
            const thing = new Thing('name', 'description');
            thing.id = 42;
            const updateThing = () => service.things.update(thing);
            await expect(updateThing()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should update an entity', async () => {
            const service = new SensorThingsService('https://example.org');
            const randomThingId = Math.ceil(Math.random() * 3000000);
            mockInjector.injectMockCall(
                service,
                `https://example.org/Things(${randomThingId})`,
                'get',
                () => {
                    return {
                        data: {
                            '@iot.id': randomThingId,
                            '@iot.selfLink': `https://example.org/Things(${randomThingId})`,
                            description: 'This is a test object.',
                            name: 'Test object',
                            'Datastreams@iot.navigationLink': `https://example.org/Things(${randomThingId})/Datastreams`,
                            'HistoricalLocations@iot.navigationLink': `https://example.org/Things(${randomThingId})/HistoricalLocations`,
                            'Locations@iot.navigationLink': `https://example.org/Things(${randomThingId})/Locations`,
                        },
                    };
                }
            );
            mockInjector.injectMockCall(
                service,
                `https://example.org/Things(${randomThingId})`,
                'patch',
                (_data: any) => {
                    return {
                        data: {
                            '@iot.id': randomThingId,
                            '@iot.selfLink': `https://example.org/Things(${randomThingId})`,
                            description: _data.description,
                            name: _data.name,
                            'Datastreams@iot.navigationLink': `https://example.org/Things(${randomThingId})/Datastreams`,
                            'HistoricalLocations@iot.navigationLink': `https://example.org/Things(${randomThingId})/HistoricalLocations`,
                            'Locations@iot.navigationLink': `https://example.org/Things(${randomThingId})/Locations`,
                        },
                    };
                }
            );

            const thing = await service.things.get(randomThingId);
            const newDescription = 'bonsoir';
            thing.description = newDescription;
            const updateResult = await service.things.update(thing);
            expect(updateResult['description']).toEqual(newDescription);
        });

        it('should delete an entity', async () => {
            const service = new SensorThingsService('https://example.org');
            const randomThingId = Math.ceil(Math.random() * 3000000);
            const targetUrl = `https://example.org/Things(${randomThingId})`;
            let calledOnce = false;
            mockInjector.injectMockCall(service, targetUrl, 'get', () => {
                if (calledOnce) {
                    const error: Error = new Error() as AxiosError;
                    // @ts-ignore
                    error.response = {
                        config: undefined,
                        headers: undefined,
                        request: undefined,
                        statusText: '',
                        status: 404,
                        data: {
                            errorId: '46a645cc-d40f-4ae5-92ee-b5d532ddfaec',
                            code: 'INVALID_ID',
                            message: 'Entity not found',
                            baseURL: 'https://example.org',
                        },
                    };
                    throw error;
                }
                calledOnce = true;
                return {
                    data: {
                        '@iot.id': randomThingId,
                        '@iot.selfLink': `https://example.org/Things(${randomThingId})`,
                        description: 'This is a test object.',
                        name: 'Test object',
                        'Datastreams@iot.navigationLink': `https://example.org/Things(${randomThingId})/Datastreams`,
                        'HistoricalLocations@iot.navigationLink': `https://example.org/Things(${randomThingId})/HistoricalLocations`,
                        'Locations@iot.navigationLink': `https://example.org/Things(${randomThingId})/Locations`,
                    },
                };
            });
            mockInjector.injectMockCall(service, targetUrl, 'delete', () => {
                return;
            });

            const getThing = async () =>
                await service.things.get(randomThingId);
            const thing = await getThing();

            await service.things.delete(thing);

            await expect(getThing()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should throw when deleting non-existent entity', async () => {
            const service = new SensorThingsService('https://example.org');
            mockInjector.injectMockCall(
                service,
                'https://example.org/Things(42)',
                'delete',
                async () => {
                    const error: Error = new Error() as AxiosError;
                    // @ts-ignore
                    error.response = {
                        config: undefined,
                        headers: undefined,
                        request: undefined,
                        statusText: '',
                        status: 404,
                        data: {
                            errorId: '46a645cc-d50f-4ae5-92ee-b5d532ddfaec',
                            code: 'INVALID_ID',
                            message: 'Entity not found',
                            baseURL: 'https://example.org',
                        },
                    };
                    throw error;
                }
            );
            const thing = new Thing('name', 'description');
            thing.id = 42;
            const deleteThing = () => service.things.delete(thing);
            await expect(deleteThing()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });
    });
});
