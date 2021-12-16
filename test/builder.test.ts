import {SensorThingsService} from "../src";
import {ThingBuilder} from "../src/model/builder/ThingBuilder";
import {MissingArgumentError} from "../src/error/MissingArgumentError";
import {HistoricalLocationBuilder} from "../src/model/builder/HistoricalLocationBuilder";
import {ObservedPropertyBuilder} from "../src/model/builder/ObservedPropertyBuilder";
import {FeatureOfInterestBuilder} from "../src/model/builder/FeatureOfInterestBuilder";
import { Geometry } from "@turf/helpers";
import {ObservationBuilder} from "../src/model/builder/ObservationBuilder";

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

    describe ('FeaturesOfInterest', () => {
        const service = new SensorThingsService('https://example.org');

        it ('should not build instance without name', () => {
            const builder = new FeatureOfInterestBuilder(service);
            const build = () => builder
                .setDescription('description')
                .setFeatureFromCoordinates([[-75.343, 39.984]])
                .build();
            expect(build).toThrowError(new MissingArgumentError('"name" argument is required to build a FeatureOfInterest.'));
        });

        it ('should not build instance without description', () => {
            const builder = new FeatureOfInterestBuilder(service);
            const build = () => builder
                .setName('name')
                .setFeatureFromCoordinates([[-75.343, 39.984]])
                .build();
            expect(build).toThrowError(new MissingArgumentError('"description" argument is required to build a FeatureOfInterest.'));
        });

        it ('should not build instance without feature', () => {
            const builder = new FeatureOfInterestBuilder(service);
            const build = () => builder
                .setName('name')
                .setDescription('description')
                .build();
            expect(build).toThrowError(new MissingArgumentError('"feature" argument is required to build a FeatureOfInterest.'));
        });

        it ('should build instance with point feature', () => {
            const builder = new FeatureOfInterestBuilder(service);
            const name = 'name';
            const desc = 'description';
            const position = [-75.343, 39.984];

            const foi = builder
                .setName(name)
                .setDescription(desc)
                .setFeatureFromCoordinates([position])
                .build();

            expect(foi.name).toEqual(name);
            expect(foi.description).toEqual(desc);
            expect((foi.feature.geometry as Geometry).type).toEqual('Point');
            expect((foi.feature.geometry as Geometry).coordinates).toEqual(position);
        });

        it ('should build instance with polygon feature', () => {
            const builder = new FeatureOfInterestBuilder(service);
            const name = 'name';
            const desc = 'description';
            const coordinates = [[-75.343, 39.984], [-78.515, 39.981], [-77.611, 39.983], [-75.343, 39.984]];

            const foi = builder
                .setName(name)
                .setDescription(desc)
                .setFeatureFromCoordinates(coordinates)
                .build();

            expect(foi.name).toEqual(name);
            expect(foi.description).toEqual(desc);
            expect((foi.feature.geometry as Geometry).type).toEqual('Polygon');
            expect((foi.feature.geometry as Geometry).coordinates).toEqual([coordinates]);
        });

        it ('should build instance with feature properties', () => {
            const builder = new FeatureOfInterestBuilder(service);
            const name = 'name';
            const desc = 'description';
            const coordinates = [[-75.343, 39.984], [-78.515, 39.981], [-77.611, 39.983], [-75.343, 39.984]];
            const properties = {"hello": "there"};

            const foi = builder
                .setName(name)
                .setDescription(desc)
                .setFeatureFromCoordinates(coordinates, properties)
                .build();

            expect(foi.feature.properties).toEqual(properties);
        });
    });

    describe('ObservationBuilder', () => {
        const phenomenonTime = '2010-12-23T10:20:00.00-07:00/2010-12-23T12:20:00.00-07:00';
        const result = {test: 42};
        const resultTime = '2010-12-23T10:20:00.00-07:00';
        const resultQuality = 42;
        const validTime = '2010-12-23T10:20:00.00-07:00/2010-12-23T12:20:00.00-07:00';
        const parameters = { key1: 12, key2: 42};
        const service = new SensorThingsService('https://example.org');

        it ('should build an instance with all parameters', () => {
            const builder = new ObservationBuilder(service);
            const observation = builder
                .setPhenomenonTime(phenomenonTime)
                .setResult(result)
                .setResultTime(resultTime)
                .setResultQuality(resultQuality)
                .setValidTime(validTime)
                .setParameters(parameters)
                .build();

            expect(observation.phenomenonTime).toEqual(phenomenonTime);
            expect(observation.result).toEqual(result);
            expect(observation.resultTime).toEqual(resultTime);
            expect(observation.resultQuality).toEqual(resultQuality);
            expect(observation.validTime).toEqual(validTime);
            expect(observation.parameters).toEqual(parameters);
        });
    });
});
