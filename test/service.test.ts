import {SensorThingsService} from "../src/service/SensorThingsService";
import {MockEntity} from "./utils/MockEntity";
import axios from "axios";
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

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

    describe('Entities handling', () => {
        it ('should do a POST call on entity creation', () => {
            const endpoint = 'https://example.org';
            const service = new SensorThingsService(new URL(endpoint));
            const payload = new MockEntity("Hello there");
            mockedAxios.post.mockResolvedValueOnce("ok");

            service.create(payload);

            expect(mockedAxios.post).toHaveBeenCalledWith('https://example.org/MockEntity', payload.toString());
        });
    });
});
