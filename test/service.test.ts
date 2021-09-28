import { SensorThingsService } from '../src/service/SensorThingsService';
// @ts-ignore
import { MockEntity } from './utils/MockEntity';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SensorThingsService', () => {
    it('should not accept empty constructor', () => {
        const build = () => new SensorThingsService(new URL(''));
        expect(build).toThrowError(new TypeError('Invalid URL: '));
    });

    it('should not accept random string as endpoint', () => {
        const build = () =>
            new SensorThingsService(new URL('this_is_my_endpoint'));
        expect(build).toThrowError(/Invalid URL:/);
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
            const payload = new MockEntity(
                'Hello there',
                'This is a test entity.'
            );
            mockedAxios.post.mockResolvedValueOnce(JSON.parse(`{
                "data": {
                    "@iot.id": 2708592,
                    "@iot.selfLink": "https://example.org/Things(2708592)",
                    "description": "This is a test entity.",
                    "name": "Hello there",
                    "Datastreams@iot.navigationLink": "https://example.org/Things(2708592)/Datastreams",
                    "HistoricalLocations@iot.navigationLink": "https://example.org/Things(2708592)/HistoricalLocations",
                    "Locations@iot.navigationLink": "https://example.org/Things(2708592)/Locations"
                }
            }`));

            service.create(payload);

            expect(mockedAxios.post).toHaveBeenCalledWith(
                'https://example.org/MockEntity',
                payload.toString()
            );
        });

        it('should do a DELETE call on entity removal', () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const payload = new MockEntity(
                'Hello there',
                'This is a test entity.'
            );
            payload.id = 42;
            mockedAxios.delete.mockResolvedValueOnce(JSON.parse(`{
                "data": {
                    "readyState": 4,
                    "responseText": "",
                    "status": 200,
                    "statusText": "OK"
                }
            }`));

            service.delete(payload);

            expect(mockedAxios.delete).toHaveBeenCalledWith(
                'https://example.org/MockEntity(42)',
            );
        });

        it ('should assign an id to the entity on creation', async () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const payload = new MockEntity(
                'Hello there',
                'This is a test entity.'
            );
            const createdId: number = Math.ceil(Math.random() * 3000000);
            mockedAxios.post.mockResolvedValueOnce(JSON.parse(`{
                "data": {
                    "@iot.id": ${createdId},
                    "@iot.selfLink": "https://example.org/Things(${createdId})",
                    "description": "This is a test entity.",
                    "name": "Hello there",
                    "Datastreams@iot.navigationLink": "https://example.org/Things(${createdId})/Datastreams",
                    "HistoricalLocations@iot.navigationLink": "https://example.org/Things(${createdId})/HistoricalLocations",
                    "Locations@iot.navigationLink": "https://example.org/Things(${createdId})/Locations"
                }
            }`));

            await service.create(payload);

            expect(payload.id).toEqual(createdId);
        });
    });
});
