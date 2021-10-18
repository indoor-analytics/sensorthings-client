import {HttpClientMock} from "./utils/HttpClientMock";
import {SensorThingsService} from "../src";
import {DumbEntityLocationsList} from "./utils/DumbEntityLocationsList";
import {DumbEntityBuilder} from "./utils/DumbEntityBuilder";
import {LocationAPIResponses} from "./responses/LocationAPIResponses";

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
});
