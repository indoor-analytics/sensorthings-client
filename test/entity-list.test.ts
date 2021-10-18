import {HttpClientMock} from "./utils/HttpClientMock";
import {SensorThingsService} from "../src";
import {DumbEntityLocationsList} from "./utils/DumbEntityLocationsList";
import {DumbEntityBuilder} from "./utils/DumbEntityBuilder";
import {LocationAPIResponses} from "./responses/LocationAPIResponses";
import {LocationBuilder} from "../src/model/builder/LocationBuilder";
import {point} from "@turf/helpers";
import {Location} from "../src/model/Location";

let service = new SensorThingsService('https://example.org');
let mockInjector: HttpClientMock;
beforeEach(() => {
    mockInjector = new HttpClientMock();
    service = new SensorThingsService('https://example.org');
});

describe('Entity lists', () => {
    it('should list entities\' locations', async () => {
        const entity = new DumbEntityBuilder(service).setName('name').setDescription('description').build();
        entity.id = 42;
        mockInjector.injectMockCall(service, 'https://example.org/DumbEntities(42)/Locations', 'get', () => {
            return {
                data: LocationAPIResponses.getEntityLocation()
            }
        });

        const locationsList = new DumbEntityLocationsList(entity, service);
        const locations = await locationsList.list();
        expect(locations.length).toEqual(1);
    });

    it('should add new entity location via entities list', async () => {
        const mock = new DumbEntityBuilder(service).setName('name').setDescription('description').build();
        mock.id = 42;
        let postedLocation = null as unknown as Location;

        // on entity creation, we save payload to send it back on further list call
        mockInjector.injectMockCall(service, 'https://example.org/DumbEntities(42)/Locations', 'post', (data: Location) => {
            postedLocation = data;
            postedLocation.id = 45224;
        });
        mockInjector.injectMockCall(service, 'https://example.org/DumbEntities(42)/Locations', 'get', () => {
            if (!postedLocation) {
                return {
                    data: LocationAPIResponses.getEmptyResponse()
                }
            }
            return {
                data: LocationAPIResponses.getEntityLocationFrom(postedLocation)
            }
        });

        const locationsList = new DumbEntityLocationsList(mock, service);
        let locations = await locationsList.list();
        expect(locations.length).toEqual(0);

        const newCoordinates = [-115.133, 51.08];
        const newLocation = new LocationBuilder(service).setLocation(point(newCoordinates)).build();
        await locationsList.add(newLocation);

        locations = await locationsList.list();
        expect(locations.length).toEqual(1);
        const createdLocation = locations[0];
        expect(createdLocation.location.geometry.coordinates).toEqual(newCoordinates);
    });
});
