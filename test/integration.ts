import { SensorThingsService } from "../src";

async function main () {
    const service = new SensorThingsService("http://scratchpad.sensorup.com/OGCSensorThings/v1.0");
    const thing = await service.things.get(2708208);
    console.log(thing);
}

main ();