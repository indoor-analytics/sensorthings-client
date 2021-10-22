import { AxiosResponse } from "axios";
import { BaseDao } from "./BaseDao";
import { HistoricalLocation } from "../model/HistoricalLocation";

export class HistoricalLocationDao extends BaseDao<HistoricalLocation> {
    get entityPathname(): string {
        throw new Error("HistoricalLocations");
    }
    get entityPublicAttributes(): string[] {
        return ['time'];
    }
    buildEntityFromSensorThingsAPIRawData(data: Record<string, string>): HistoricalLocation {
        const location = new HistoricalLocation(
            this._service,
            data.time
        );
        location.id = data['@iot.id'] as unknown as number;
        return location;
    }
    buildEntityFromSensorThingsAPIResponse(response: AxiosResponse<never>): HistoricalLocation {
        const data = response.data as Record<string, string>;
        const location = new HistoricalLocation(
            this._service,
            data.time
        );
        location.id = this._service.compatibility.getCreatedEntityIdFromResponse(response);
        return location;
    }
    
}