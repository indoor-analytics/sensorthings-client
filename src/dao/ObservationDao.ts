import { Observation } from "../model/Observation";
import { BaseDao } from "./BaseDao";

export class ObservationDao extends BaseDao<Observation> {
    get entityPathname(): string {
        return 'Observations';
    }
    get entityPublicAttributes(): string[] {
        return ['phenomenonTime', 'result', 'resultTime', 'resultQuality', 'validTime', 'parameters'];
    }
    buildEntity(data: Record<string, unknown>): Observation {
        return new Observation(
            this._service,
            data.phenomenonTime as string,
            data.result as unknown,
            data.resultTime as string,
            data.resultQuality as unknown,
            data.validTime as string,
            data.parameters as Record<string, unknown>
        );
    }
}