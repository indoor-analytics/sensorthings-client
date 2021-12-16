import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { ObservationDao } from "../dao/ObservationDao";
import { Entity } from "./Entity";
import { ObservationsDatastreamsList } from "./list/ObservationDatastreamsList";
import { TimeChecker } from "./utils/TimeChecker";

export class Observation extends Entity<Observation> {
    public phenomenonTime: string;
    public result: unknown;
    public resultTime: string;
    public resultQuality: unknown | undefined;
    public validTime: string | undefined;
    public parameters: Record<string, unknown> | undefined;

    public datastreams: ObservationsDatastreamsList;

    public constructor(
        service: SensorThingsService,
        phenomenonTime: string,
        result: unknown,
        resultTime: string,
        resultQuality: unknown = undefined,
        validTime: string | undefined = undefined,
        parameters: Record<string, unknown> | undefined = undefined
    ) {
        super(service);

        this.parameters = parameters;
        this.resultQuality = resultQuality;
        this.result = result;
        this.datastreams = new ObservationsDatastreamsList(this, this._service);

        const checker = new TimeChecker();
        if (!checker.checkISODate(phenomenonTime) && !checker.checkTimeRange(phenomenonTime))
            throw new RangeError(`"${phenomenonTime}" is not a valid phenomenonTime value.`);
        this.phenomenonTime = phenomenonTime;

        if (resultTime !== undefined && !checker.checkISODate(resultTime))
            throw new RangeError(`"${resultTime}" is not a valid resultTime value.`);
        this.resultTime = resultTime;

        if (validTime !== undefined && !checker.checkTimeRange(validTime))
            throw new RangeError(`"${validTime}" is not a valid validTime value.`);
        this.validTime = validTime;
    }

    get dao(): BaseDao<Observation> {
        return new ObservationDao(this._service);
    }
}
