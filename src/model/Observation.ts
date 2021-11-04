import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { Entity } from "./Entity";
import { TimeChecks } from "./utils/TimeChecks";

export class Observation extends Entity<Observation> {
    public phenomenonTime: string;
    public result: unknown;
    public resultTime: string;
    public resultQuality: unknown;
    public validTime: string;
    public parameters: Record<string, unknown>;

    public constructor(
        service: SensorThingsService,
        phenomenonTime: string,
        result: unknown,
        resultTime: string,
        resultQuality: unknown,
        validTime: string,
        parameters: Record<string, unknown>
    ) {
        super(service);

        this.parameters = parameters;
        this.resultQuality = resultQuality;
        this.result = result;

        const checker = new TimeChecks();
        checker.checkTimeRange(phenomenonTime, 'phenomenonTime');   // TODO phenomenonTime can be simple date as well as time range
        this.phenomenonTime = phenomenonTime;

        this.resultTime = resultTime;
        
        checker.checkTimeRange(validTime, 'validTime');
        this.validTime = validTime;
    }

    get dao(): BaseDao<Observation> {
        throw new Error("Method not implemented.");
    }
}