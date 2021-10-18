import { SensorThingsService } from '../src';
import {Thing} from "../src/model/Thing";
import {Location} from "../src/model/Location";
import {LocationBuilder} from "../src/model/builder/LocationBuilder";
import {NotFoundError} from "../src/error/NotFoundError";

// FROST-Server SensorThings service
const service = new SensorThingsService(
    'http://localhost:8080/FROST-Server/v1.0'
);
// Gost SensorThings service
/*
const service = new SensorThingsService(
    'http://localhost:8080/v1.0',
    {
        locationEncodingType: 'application/vnd.geo+json'
    }
);
 */

describe('Integration tests', () => {
    let thing = null as unknown as Thing;
    let location = null as unknown as Location;

    it('should throw on getting non-existent Thing', async () => {
        const getThing = async () => thing = await service.things.get(8708208);
        await expect(getThing()).rejects.toThrow(
            new NotFoundError('Entity does not exist.')
        );
    });

    it('should create a thing', async () => {
        thing = new Thing('Test thing', 'Test description', service);
        await service.things.create(thing);
        expect(thing.id).not.toBeUndefined();
    });

    it('should equal API-imported thing', async () => {
        const importedThing = await service.things.get(thing.id);
        expect(importedThing).toEqual(thing);
    });

    it('should push a new location', async () => {
        const newLocation = new LocationBuilder(service)
            .setName('Test thing location')
            .setDescription('Is... Is it moving?!')
            .setProperties({"hello": "there"})
            .setLocation([50.6048862, 3.1498135])
            .build();
        await thing.locations.add(newLocation);
        const list = await thing.locations.list();
        expect(list.length).toEqual(1);
        location = newLocation;
    });

    it('should list location\'s things', async() => {
        const thingsList = await location.things.list();
        expect(thingsList.length).toEqual(1);
        expect(thingsList[0]).toEqual(thing);
    });
});

