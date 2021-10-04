import {SensorThingsService} from "../src";
import {Query} from "../src/query/Query";
import {Thing} from "../src/model/Thing";
import {ThingDao} from "../src/dao/ThingDao";

describe('Query', () => {
    it('Query<Thing> should return Things endpoint', () => {
        const service = new SensorThingsService('https://example.org/v1.0');
        const query = new Query<Thing>(service, new ThingDao(service));
        expect(query.endpoint).toEqual('https://example.org/v1.0/Things');
    });
});
