import { SensorThingsService } from '../src';
import {Thing} from "../src/model/Thing";
import {LocationBuilder} from "../src/model/builder/LocationBuilder";

async function main() {
    const service = new SensorThingsService(
        'http://localhost:8080/FROST-Server/v1.0'
    );

    // Getting non-existent Thing
    console.log('\n## Getting non-existent Thing\n');
    try {
        const thing = await service.things.get(8708208);
        console.log(thing.name);
    } catch (err) {
        console.log(err);
    }

    // Creating a new Thing
    console.log('\n## Creating a new Thing\n');
    const newThing = new Thing('Test thing', 'Test description', service);
    await service.things.create(newThing);

    // Retrieving Thing from API
    console.log('' + await service.things.get(newThing.id));

    // Pushing a new location
    console.log('\n## Pushing a new location\n');
    const location = new LocationBuilder(service)
        .setLocation([50.6048862, 3.1498135])
        .build();
    await newThing.locations.add(location);
    console.log('' + await newThing.locations.list());
}

main();
