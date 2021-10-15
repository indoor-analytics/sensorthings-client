import { SensorThingsService } from '../src';
import {Thing} from "../src/model/Thing";

async function main() {
    const service = new SensorThingsService(
        'http://localhost:8080/v1.0'
    );

    // Getting non-existent Thing
    try {
        const thing = await service.things.get(8708208);
        console.log(thing.name);
    } catch (err) {
        console.log(err);
    }

    // Creating a new Thing
    const newThing = new Thing('Test thing', 'Test description', service);
    await service.things.create(newThing);

    // Retrieving Thing from API
    console.log(await service.things.get(newThing.id));
}

main();
