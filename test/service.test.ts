import { SensorThingsService } from '../src';
import { DumbEntity } from './utils/DumbEntity';
import { HttpClientMock } from './utils/HttpClientMock';

let mockInjector: HttpClientMock;
beforeEach(() => {
    mockInjector = new HttpClientMock();
});

describe('SensorThingsService', () => {
    it('should not accept empty constructor', () => {
        const build = () => new SensorThingsService(new URL(''));
        expect(build).toThrowError(/Invalid URL/);
    });

    it('should accept string constructor', () => {
        const service1 = new SensorThingsService(
            new URL('https://example.org/')
        );
        const service2 = new SensorThingsService('https://example.org/');
        expect(service1.url).toEqual(service2.url);
    });

    it('should not accept random string as endpoint', () => {
        const build = () =>
            new SensorThingsService(new URL('this_is_my_endpoint'));
        expect(build).toThrowError(/Invalid URL/);
    });

    it('should return endpoint', () => {
        const endpoint = 'https://example.org/';
        const service = new SensorThingsService(new URL(endpoint));
        expect(service.url.toString()).toEqual(endpoint);
    });

    it ('should return endpoint without final slash', () => {
        const endpoint = 'https://example.org/';
        const service = new SensorThingsService(new URL(endpoint));
        const result = service.endpoint;
        expect(result).toEqual('https://example.org');
    });

    it ('should return endpoint without final slash (not given as argument)', () => {
        const endpoint = 'http://localhost:8080/v1.0';
        const service = new SensorThingsService(new URL(endpoint));
        const result = service.endpoint;
        expect(result).toEqual(endpoint);
    });

    describe('Entities handling', () => {
        it('should do a POST call on entity creation', () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const payload = new DumbEntity(
                'Hello there',
                'This is a test entity.',
                service
            );
            mockInjector.injectMockCall(
                service,
                'https://example.org/DumbEntities',
                'post',
                (_data: DumbEntity) => {
                    for (const attribute of payload.dao.entityPublicAttributes) {
                        // @ts-ignore
                        expect(_data[attribute]).toEqual(payload[attribute]);
                    }
                    return JSON.parse(`{
                    "data": {
                        "@iot.id": 2708592,
                        "@iot.selfLink": "https://example.org/Things(2708592)",
                        "description": "This is a test entity.",
                        "name": "Hello there",
                        "Datastreams@iot.navigationLink": "https://example.org/Things(2708592)/Datastreams",
                        "HistoricalLocations@iot.navigationLink": "https://example.org/Things(2708592)/HistoricalLocations",
                        "Locations@iot.navigationLink": "https://example.org/Things(2708592)/Locations"
                    }
                }`);
                }
            );

            service.create(payload);

            expect(
                mockInjector.urlHasBeenCalled(
                    'https://example.org/DumbEntities'
                )
            ).toBeTruthy();
        });

        it('should do a DELETE call on entity removal', async () => {
            const endpoint = 'https://example.org';
            const deleteUrl = 'https://example.org/DumbEntities(42)';
            const service = new SensorThingsService(new URL(endpoint));
            mockInjector.injectMockCall(service, deleteUrl, 'delete', () => {
                return JSON.parse(`{
                    "data": {
                        "readyState": 4,
                        "responseText": "",
                        "status": 200,
                        "statusText": "OK"
                    }
                }`);
            });
            const payload = new DumbEntity(
                'Hello there',
                'This is a test entity.',
                service
            );
            payload.id = 42;

            await service.delete(payload);

            expect(mockInjector.urlHasBeenCalled(deleteUrl));
        });

        it('should assign an id to the entity on creation', async () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const createdId: number = Math.ceil(Math.random() * 3000000);
            mockInjector.injectMockCall(
                service,
                'https://example.org/DumbEntities',
                'post',
                () => {
                    return JSON.parse(`{
                    "data": {
                        "@iot.id": ${createdId},
                        "@iot.selfLink": "https://example.org/Things(${createdId})",
                        "description": "This is a test entity.",
                        "name": "Hello there",
                        "Datastreams@iot.navigationLink": "https://example.org/Things(${createdId})/Datastreams",
                        "HistoricalLocations@iot.navigationLink": "https://example.org/Things(${createdId})/HistoricalLocations",
                        "Locations@iot.navigationLink": "https://example.org/Things(${createdId})/Locations"
                    }
                }`);
                }
            );
            const payload = new DumbEntity(
                'Hello there',
                'This is a test entity.',
                service
            );

            await service.create(payload);

            expect(payload.id).toEqual(createdId);
        });

        it('should do a PATCH call on entity update', async () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const patchUrl = 'https://example.org/DumbEntities(42)';
            mockInjector.injectMockCall(
                service,
                patchUrl,
                'patch',
                (_data: never) => {
                    expect(_data).toEqual(expect.objectContaining(newInfo));
                    return JSON.parse(`{
                    "data": {
                        "@iot.id": 42,
                        "@iot.selfLink": "https://example.org/Things(42)",
                        "description": "${newInfo.description}",
                        "name": "${newInfo.name}",
                        "Datastreams@iot.navigationLink": "https://example.org/Things(42)/Datastreams",
                        "HistoricalLocations@iot.navigationLink": "https://example.org/Things(42)/HistoricalLocations",
                        "Locations@iot.navigationLink": "https://example.org/Things(42)/Locations"
                    }
                }`);
                }
            );
            const payload = new DumbEntity(
                'Hello there',
                'This is a test entity.',
                service
            );
            payload.id = 42;

            const newInfo = {
                name: 'New name',
                description: 'New description',
            };
            payload.name = newInfo.name;
            payload.description = newInfo.description;

            await service.update(payload);

            expect(mockInjector.urlHasBeenCalled(patchUrl)).toBeTruthy();
        });
    });
});
