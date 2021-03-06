import { ThingDao } from '../src/dao/ThingDao';
import { SensorThingsService } from '../src';
import { HttpClientMock } from './utils/HttpClientMock';
import { NotFoundError } from '../src/error/NotFoundError';
import { AxiosError } from 'axios';
import { DumbEntityDao } from './utils/DumbEntityDao';
import {ThingAPIResponses} from "./responses/ThingAPIResponses";
import {DumbEntityBuilder} from "./utils/DumbEntityBuilder";
import {LocationDao} from "../src/dao/LocationDao";
import {LocationAPIResponses} from "./responses/LocationAPIResponses";

const service = new SensorThingsService('https://example.org');
let mockInjector: HttpClientMock;
let builder = new DumbEntityBuilder(service);
beforeEach(() => {
    mockInjector = new HttpClientMock();
});

describe('DAO', () => {
    describe('Entity path names', () => {
        it('ThingDao should return correct path name', () => {
            const urlPrefix = new ThingDao(service).entityPathname;
            expect(urlPrefix).toEqual('Things');
        });

        it('MockDao should return correct path name', () => {
            const urlPrefix = new DumbEntityDao(service).entityPathname;
            expect(urlPrefix).toEqual('DumbEntities');
        });
    });

    describe('Operations', () => {
        it('should get newly-created entity', async () => {
            const randomMockId = Math.ceil(Math.random() * 3000000);
            const service = new SensorThingsService('https://example.org');
            const mockName = 'name',
                mockDescription = 'description';
            const mock = builder.setName(mockName).setDescription(mockDescription).build();
            const getMockObject = () => {
                return JSON.parse(`{
                    "data": {
                        "@iot.id": ${randomMockId},
                        "@iot.selfLink": "https://example.org/DumbEntities(${randomMockId})",
                        "description": "${mockDescription}",
                        "name": "${mockName}",
                        "Datastreams@iot.navigationLink": "https://example.org/DumbEntities(${randomMockId})/Datastreams",
                        "HistoricalLocations@iot.navigationLink": "https://example.org/DumbEntities(${randomMockId})/HistoricalLocations",
                        "Locations@iot.navigationLink": "https://example.org/DumbEntities(${randomMockId})/Locations"
                    }
                }`);
            };
            mockInjector.injectMockCalls( service, [{
                    targetUrl: 'https://example.org/DumbEntities',
                    method: 'post',
                    callback: getMockObject
                }, {
                    targetUrl: `https://example.org/DumbEntities(${randomMockId})`,
                    method: 'get',
                    callback: getMockObject
                }]
            );

            const dao = new DumbEntityDao(service);
            await dao.create(mock);
            const createdMock = await dao.get(mock.id);

            expect(createdMock.equals(mock)).toBeTruthy();
        });

        it('should throw when getting non-existent entity', async () => {
            const service = new SensorThingsService('https://example.org');
            mockInjector.injectMockCalls( service, [{
                targetUrl: 'https://example.org/DumbEntities(42)',
                method: 'get',
                callback: async () => {
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
            }]
            );
            const getMock = () => new DumbEntityDao(service).get(42);
            await expect(getMock()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should throw when updating non-existent entity', async () => {
            const service = new SensorThingsService('https://example.org');
            const dao = new DumbEntityDao(service);
            mockInjector.injectMockCalls( service, [{
                targetUrl: 'https://example.org/DumbEntities(42)',
                method: 'patch',
                callback: async () => {
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
            }]);
            const mock = builder.setName('name').setDescription('description').build();
            mock.id = 42;
            mock.setService(service);
            const updateMock = () => dao.update(mock);
            await expect(updateMock()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should update an entity', async () => {
            const service = new SensorThingsService('https://example.org');
            const randomMockId = Math.ceil(Math.random() * 3000000);
            mockInjector.injectMockCalls( service, [{
                targetUrl: `https://example.org/DumbEntities(${randomMockId})`,
                method: 'get',
                callback: () => {
                    return {
                        data: {
                            '@iot.id': randomMockId,
                            '@iot.selfLink': `https://example.org/DumbEntities(${randomMockId})`,
                            description: 'This is a test object.',
                            name: 'Test object',
                            'Datastreams@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/Datastreams`,
                            'HistoricalLocations@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/HistoricalLocations`,
                            'Locations@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/Locations`,
                        },
                    };
                }
                }, {
                targetUrl: `https://example.org/DumbEntities(${randomMockId})`,
                method: 'patch',
                callback: (_data: Record<string, unknown>) => {
                    return {
                        data: {
                            '@iot.id': randomMockId,
                            '@iot.selfLink': `https://example.org/DumbEntities(${randomMockId})`,
                            description: _data.description,
                            name: _data.name,
                            'Datastreams@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/Datastreams`,
                            'HistoricalLocations@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/HistoricalLocations`,
                            'Locations@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/Locations`,
                        },
                    };
                }
                }]
            );

            const dao = new DumbEntityDao(service);
            const mock = await dao.get(randomMockId);
            const newDescription = 'bonsoir';
            mock.description = newDescription;
            const updateResult = await dao.update(mock);
            // @ts-ignore
            expect(updateResult['description']).toEqual(newDescription);
        });

        it('should delete an entity', async () => {
            const service = new SensorThingsService('https://example.org');
            const dao = new DumbEntityDao(service);
            const randomMockId = Math.ceil(Math.random() * 3000000);
            const targetUrl = `https://example.org/DumbEntities(${randomMockId})`;
            let calledOnce = false;
            mockInjector.injectMockCalls(service, [{
                targetUrl,
                method: 'get',
                callback: () => {
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
                            '@iot.id': randomMockId,
                            '@iot.selfLink': `https://example.org/DumbEntities(${randomMockId})`,
                            description: 'This is a test object.',
                            name: 'Test object',
                            'Datastreams@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/Datastreams`,
                            'HistoricalLocations@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/HistoricalLocations`,
                            'Locations@iot.navigationLink': `https://example.org/DumbEntities(${randomMockId})/Locations`,
                        },
                    };
                }
            }, {
                targetUrl,
                method: 'delete',
                callback: () => {
                    return;
                }
            }]);

            const getMock = async () => await dao.get(randomMockId);
            const mock = await getMock();

            await dao.delete(mock);

            await expect(getMock()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should throw when deleting non-existent entity', async () => {
            const service = new SensorThingsService('https://example.org');
            mockInjector.injectMockCalls(
                service,
                [{
                    targetUrl: 'https://example.org/DumbEntities(42)',
                    method: 'delete',
                   callback:  async() => {
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
            }]
            );
            const mock = builder.setName('name').setDescription('description').build();
            mock.id = 42;
            mock.setService(service);
            const deleteMock = () => new DumbEntityDao(service).delete(mock);
            await expect(deleteMock()).rejects.toThrow(
                new NotFoundError('Entity does not exist.')
            );
        });

        it('should return entities count', async () => {
            const service = new SensorThingsService('https://example.org');
            const dao = new DumbEntityDao(service);
            mockInjector.injectMockCalls(service, [{
                targetUrl: 'https://example.org/DumbEntities?$count=true',
                method: 'get',
                callback: () => {
                    return {
                        data: ThingAPIResponses.things
                    }
                }
            }]);
            const entitiesCount = await dao.count();
            expect(entitiesCount).toEqual(27590);
        });

        it('should return entity locations', async () => {
            const service = new SensorThingsService('https://example.org');
            const dao = new LocationDao(service);
            const mock = builder.setName('mockName').setDescription('mockDescription').build();
            mock.id = 42;
            mockInjector.injectMockCalls(service, [{
                targetUrl: 'https://example.org/DumbEntities(42)/Locations',
                method: 'get',
                callback: () => {
                    return {
                        data: LocationAPIResponses.getEntityLocation()
                    }
                }
            }]);

            const locations = await dao.getFromEntity(mock);
            expect(locations.length).toEqual(1);
        });
    });

    it("should return all DumbEntity's attributes", () => {
        const service = new SensorThingsService('https://example.org');
        const dao = new DumbEntityDao(service);
        expect(dao.entityPublicAttributes).toEqual(['name', 'description']);
    });
});
