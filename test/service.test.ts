import {SensorThingsService} from "../src/service/SensorThingsService";

describe('SensorThingsService', () => {
    it ('should not accept empty constructor', () => {
        const build = () => new SensorThingsService(new URL(''));
        expect(build).toThrowError(new TypeError('Invalid URL: '));
    });

    it ('should not accept random string as endpoint', () => {
        const build = () => new SensorThingsService(new URL('this_is_my_endpoint'));
        expect(build).toThrowError(/Invalid URL:/);
    });

    it ('should return endpoint', () => {
        const endpoint = 'https://example.org/';
        const service = new SensorThingsService(new URL(endpoint));
        expect(service.endpoint.toString()).toEqual(endpoint);
    });
});
