// @ts-ignore
import { MockEntity } from './utils/MockEntity';
import { SensorThingsService } from '../src';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Entity', () => {
    it("shouldn't return id when not created", () => {
        const payload = new MockEntity('name', 'description');
        const getId = () => payload.id;
        expect(getId).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });

    it('should not return pathname when not created', () => {
        const payload = new MockEntity('name', 'description');
        const getLink = () => payload.entityResourcePathname(new SensorThingsService('https://example.org'));
        expect(getLink).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });

    it('should return id when created', async () => {
        const payload = new MockEntity('name', 'description');
        const service = new SensorThingsService('https://example.org');
        const createdId = Math.ceil(Math.random() * 3000000);
        mockedAxios.post.mockResolvedValueOnce(
            JSON.parse(`{
                "data": {
                    "@iot.id": ${createdId},
                    "@iot.selfLink": "https://example.org/Things(${createdId})",
                    "description": "${payload.description}",
                    "name": "${payload.name}",
                    "Datastreams@iot.navigationLink": "https://example.org/Things(${createdId})/Datastreams",
                    "HistoricalLocations@iot.navigationLink": "https://example.org/Things(${createdId})/HistoricalLocations",
                    "Locations@iot.navigationLink": "https://example.org/Things(${createdId})/Locations"
                }
            }`)
        );

        await service.create(payload);

        expect(payload.id).toEqual(createdId);
        expect(payload.entityResourcePathname(new SensorThingsService('https://example.org'))).toEqual(
            `MockEntities(${createdId})`
        );
    });
});
