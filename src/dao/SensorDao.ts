import { Sensor } from "../model/Sensor";
import { BaseDao } from "./BaseDao";

export class SensorDao extends BaseDao<Sensor> {
    get entityPathname(): string {
        return 'Sensors';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'encodingType', 'metadata'];
    }
    buildEntity(data: Record<string, unknown>): Sensor {
        return new Sensor(
            this._service,
            data.name as string,
            data.description as string,
            data.encodingType as string,
            data.metadata as string
        );
    }
}
