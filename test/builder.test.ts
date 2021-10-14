import {SensorThingsService} from "../src";
import {ThingBuilder} from "../src/model/builder/ThingBuilder";

describe('Model builders', () => {
    it('should build a Thing entity', () => {
        const builder = new ThingBuilder( new SensorThingsService('https://example.org') );
        const name = 'Thingything';
        const description = 'This is a test description';

        const thing = builder
            .setName(name)
            .setDescription(description)
            .build();
        expect(thing.name).toEqual(name);
        expect(thing.description).toEqual(description);
    });
});
