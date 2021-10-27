import { BaseDao } from "./BaseDao";
import { HistoricalLocation } from "../model/HistoricalLocation";

export class HistoricalLocationDao extends BaseDao<HistoricalLocation> {
    get entityPathname(): string {
        return "HistoricalLocations";
    }
    get entityPublicAttributes(): string[] {
        return ['time'];
    }
    buildEntity(data: Record<string, unknown>): HistoricalLocation {
        return new HistoricalLocation(
            this._service,
            data.time as string
        );
    }
}
