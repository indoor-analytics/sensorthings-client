import {SensorThingsService} from "../src";
import {ThingBuilder} from "../src/model/builder/ThingBuilder";
import {MissingArgumentError} from "../src/error/MissingArgumentError";
import {HistoricalLocationBuilder} from "../src/model/builder/HistoricalLocationBuilder";
import {ObservedPropertyBuilder} from "../src/model/builder/ObservedPropertyBuilder";

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

    it('should build a Thing entity with additional properties', () => {
        const builder = new ThingBuilder( new SensorThingsService('https://example.org') );
        const name = 'Thingything';
        const description = 'This is a test description';
        const properties = {"hello": "there"};

        const thing = builder
            .setName(name)
            .setDescription(description)
            .setProperties(properties)
            .build();

        expect(thing.name).toEqual(name);
        expect(thing.description).toEqual(description);
        expect(thing.properties).toEqual(properties);
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

    it('should not retain attributes between consecutive entity builds', () => {
        const builder = new ThingBuilder( new SensorThingsService('https://example.org') );
        const thing1 = builder
            .setName('name1')
            .setDescription('description1')
            .build();
        expect(thing1.name).toEqual('name1');

        const build = () => builder
            .setName('name2')
            .build();

        expect(build).toThrowError(
            new MissingArgumentError('"description" argument is required to build a Thing.')
        );
    });

    it('should not build HistoricalLocation with missing time', () => {
        const builder = new HistoricalLocationBuilder( new SensorThingsService('https://example.org') );
        const build = () => builder.build();
        expect(build).toThrowError(new MissingArgumentError('"time" argument is required to build a HistoricalLocation.'));
    });

    it('should not build HistoricalLocation with random string input', () => {
        const builder = new HistoricalLocationBuilder( new SensorThingsService('https://example.org') );

        const build = () => builder
            .setTime("hello there")
            .build();

        expect(build).toThrowError(new RangeError('"hello there" is not a valid time value.'));
    });

    it('should not build ObservedProperty without name', () => {
        const builder = new ObservedPropertyBuilder( new SensorThingsService('https://example.org') );
        const build = () => builder
            .setDescription('desc')
            .setDefinition('def')
            .build();
        expect(build).toThrowError(new MissingArgumentError('"name" argument is required to build an ObservedProperty.'));
    });

    it('should not build ObservedProperty without description', () => {
        const builder = new ObservedPropertyBuilder( new SensorThingsService('https://example.org') );
        const build = () => builder
            .setName('name')
            .setDefinition('def')
            .build();
        expect(build).toThrowError(new MissingArgumentError('"description" argument is required to build an ObservedProperty.'));
    });

    it('should not build ObservedProperty without definition', () => {
        const builder = new ObservedPropertyBuilder( new SensorThingsService('https://example.org') );
        const build = () => builder
            .setName('name')
            .setDescription('desc')
            .build();
        expect(build).toThrowError(new MissingArgumentError('"definition" argument is required to build an ObservedProperty.'));
    });
});
