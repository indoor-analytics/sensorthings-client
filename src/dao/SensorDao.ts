import { Sensor } from "../model/Sensor";
import { BaseDao } from "./BaseDao";

export class SensorDao extends BaseDao<Sensor> {
    get entityPathname(): string {
        return 'Sensors';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'encodingType', 'metadata'];
    }
    buildEntity(_: Record<string, unknown>): Sensor {
        throw new Error("Method not implemented.");
    }
}