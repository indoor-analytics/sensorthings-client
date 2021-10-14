import {SensorThingsService} from "../src";
import {ThingBuilder} from "../src/model/builder/ThingBuilder";
import {MissingArgumentError} from "../src/error/MissingArgumentError";

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

    it('should not build with missing name', () => {
        const builder = new ThingBuilder( new SensorThingsService('https://example.org') );

        const build = () => builder
            .setDescription('This is a test description')
            .build();

        expect(build).toThrowError(
            new MissingArgumentError('"name" argument is required to build a Thing.')
        );
    });

    it('should not build with missing description', () => {
        const builder = new ThingBuilder( new SensorThingsService('https://example.org') );

        const build = () => builder
            .setName('Thingything')
            .build();

        expect(build).toThrowError(
            new MissingArgumentError('"description" argument is required to build a Thing.')
        );
    });
});
