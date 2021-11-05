import {SensorThingsService} from '../src';
import {DumbEntity} from './utils/DumbEntity';
import {HttpClientMock} from './utils/HttpClientMock';
import {HistoricalLocation} from "../src/model/HistoricalLocation";
import {Datastream} from "../src/model/Datastream";
import {ObservationType} from "../src/model/utils/ObservationType";
import {polygon} from "@turf/helpers";
import {Observation} from "../src/model/Observation";

const service = new SensorThingsService('https://example.org');

describe('Entity', () => {
    it("shouldn't return id when not created", () => {
        const payload = new DumbEntity('name', 'description', service);
        const getId = () => payload.id;
        expect(getId).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });

    it('should not return pathname when not created', () => {
        const payload = new DumbEntity('name', 'description', service);
        const getLink = () =>
            payload.instancePathname;
        expect(getLink).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });

    it('should return id when created', async () => {
        const payload = new DumbEntity('name', 'description', service);
        const mockInjector = new HttpClientMock();
        const createdId = Math.ceil(Math.random() * 3000000);
        mockInjector.injectMockCalls( service, [{
            targetUrl: 'https://example.org/DumbEntities',
            method: 'post',
            callback: () => {
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
        }]);

        await service.create(payload);

        expect(payload.id).toEqual(createdId);
        expect( payload.instancePathname ).toEqual(`DumbEntities(${createdId})`);
    });
});

describe('HistoricalLocation', () => {
    it ('should throw when created with random input string', () => {
        const create = () => new HistoricalLocation(service, "azerty");
        expect(create).toThrowError(new RangeError('"azerty" is not a valid time value.'));
    });

    it('should throw when created with empty input string', () => {
        const create = () => new HistoricalLocation(service, "");
        expect(create).toThrowError(new RangeError('"" is not a valid time value.'));
    });

    it('should own a date matching input date', () => {
        const dateString = "2021-10";
        const location = new HistoricalLocation(service, dateString);
        expect(new Date(dateString).toISOString()).toEqual(new Date(location.time).toISOString());
    })
});

describe('Datastream', () => {
    const unitOfMeasurement = {name: 'name', definition: 'def', symbol: 'S'}
    const area = polygon([[[0, 1], [1, 2], [2, 3], [0, 1]]]).geometry;

    it('should throw when created with wrong phenomenon time', () => {
        const create = () => new Datastream(
            service, 'name', 'description',
            unitOfMeasurement, ObservationType.OM_CategoryObservation, area,
            "2014-03-01T13:00:00Z",
            "2014-03-01T13:00:00Z/2015-05-11T15:30:00Z"
        );
        expect(create).toThrowError(new RangeError('"2014-03-01T13:00:00Z" is not a valid phenomenonTime value.'));
    });

    it('should throw when created with wrong result time', () => {
        const create = () => new Datastream(
            service, 'name', 'description',
            unitOfMeasurement, ObservationType.OM_CategoryObservation, area,
            "2014-03-01T13:00:00Z/2015-05-11T15:30:00Z",
            "2014-03-01T13:00:00Z"
        );
        expect(create).toThrowError(new RangeError('"2014-03-01T13:00:00Z" is not a valid resultTime value.'));
    });
});

describe ('Observation', () => {
    it ('should create an instance with a date as phenomenonTime', () => {
        const create = () => new Observation(
            service, 
            new Date().toISOString(), // this is the tested field
            '', 
            '2014-03-01T13:00:00Z', 
            42, 
            '2010-12-23T10:20:00.00-07:00/2010-12-23T12:20:00.00-07:00', 
            {}
        );
        expect(create).not.toThrow();
    });

    it ('should create an instance with a time interval as phenomenonTime', () => {
        const create = () => new Observation(
            service, 
            '2010-12-23T10:20:00.00-07:00/2010-12-23T12:20:00.00-07:00', // this is the tested field
            '', 
            '2014-03-01T13:00:00Z', 
            42, 
            '2010-12-23T10:20:00.00-07:00/2010-12-23T12:20:00.00-07:00',
            {}
        );
        expect(create).not.toThrow();
    });
});
