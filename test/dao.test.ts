import { ThingDao } from '../src/dao/ThingDao';
import { SensorThingsService } from '../src';
import {Thing} from "../src/model/Thing";
// @ts-ignore
import {HttpClientMock} from "./utils/HttpClientMock";

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
            const randomThingId = Math.ceil(Math.random()*3000000);
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
            mockInjector.injectMockCall(service, 'https://example.org/Things', 'post', getThingObject);
            mockInjector.injectMockCall(service, `https://example.org/Things(${randomThingId})`, 'get', getThingObject);

            await service.things.create(thing);
            const createdThing = await service.things.get(thing.id);

            expect(createdThing.equals(thing)).toBeTruthy();
        });
    });
});
