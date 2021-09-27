import {SensorThingsService} from "../src/service/SensorThingsService";

describe('SensorThingsService', () => {
    it ('should not accept empty constructor', () => {
        const build = () => new SensorThingsService(new URL(''));
        expect(build).toThrowError(new TypeError('Invalid URL: '));
    });
});
