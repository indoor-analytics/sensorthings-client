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
        expect(service1.endpoint).toEqual(service2.endpoint);
    });

    it('should not accept random string as endpoint', () => {
        const build = () =>
            new SensorThingsService(new URL('this_is_my_endpoint'));
        expect(build).toThrowError(/Invalid URL/);
    });

    it('should return endpoint', () => {
        const endpoint = 'https://example.org/';
        const service = new SensorThingsService(new URL(endpoint));
        expect(service.endpoint.toString()).toEqual(endpoint);
    });

    describe('Entities handling', () => {
        it('should do a POST call on entity creation', () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            mockInjector.injectMockCall(
                service,
                'https://example.org/MockEntities',
                'post',
                (_data: DumbEntity) => {
                    expect(_data).toEqual(payload);
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

            const payload = new DumbEntity(
                'Hello there',
                'This is a test entity.'
            );

            service.create(payload);

            expect(
                mockInjector.urlHasBeenCalled(
                    'https://example.org/MockEntities'
                )
            ).toBeTruthy();
        });

        it('should do a DELETE call on entity removal', async () => {
            const endpoint = 'https://example.org';
            const deleteUrl = 'https://example.org/MockEntities(42)';
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
                'This is a test entity.'
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
                'https://example.org/MockEntities',
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
                'This is a test entity.'
            );

            await service.create(payload);

            expect(payload.id).toEqual(createdId);
        });

        it('should do a PATCH call on entity update', async () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const patchUrl = 'https://example.org/MockEntities(42)';
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
                'This is a test entity.'
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
