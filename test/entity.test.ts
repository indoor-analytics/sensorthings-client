import { SensorThingsService } from '../src';
import { DumbEntity } from './utils/DumbEntity';
import { HttpClientMock } from './utils/HttpClientMock';

describe('Entity', () => {
    it("shouldn't return id when not created", () => {
        const payload = new DumbEntity('name', 'description');
        const getId = () => payload.id;
        expect(getId).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });

    it('should not return pathname when not created', () => {
        const payload = new DumbEntity('name', 'description');
        payload.setService(
            new SensorThingsService('https://example.org')
        );
        const getLink = () => payload.entityResourcePathname();
        expect(getLink).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });

    it('should return id when created', async () => {
        const payload = new DumbEntity('name', 'description');
        const service = new SensorThingsService('https://example.org');
        payload.setService(new SensorThingsService('https://example.org'));
        const mockInjector = new HttpClientMock();
        const createdId = Math.ceil(Math.random() * 3000000);
        mockInjector.injectMockCall(
            service,
            'https://example.org/DumbEntities',
            'post',
            () => {
                return JSON.parse(`{
                "data": {
                    "@iot.id": ${createdId},
                    "@iot.selfLink": "https://example.org/Things(${createdId})",
                    "description": "${payload.description}",
                    "name": "${payload.name}",
                    "Datastreams@iot.navigationLink": "https://example.org/Things(${createdId})/Datastreams",
                    "HistoricalLocations@iot.navigationLink": "https://example.org/Things(${createdId})/HistoricalLocations",
                    "Locations@iot.navigationLink": "https://example.org/Things(${createdId})/Locations"
                }
            }`);
            }
        );

        await service.create(payload);

        expect(payload.id).toEqual(createdId);
        expect(
            payload.entityResourcePathname()
        ).toEqual(`DumbEntities(${createdId})`);
    });
});
