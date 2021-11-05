import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { Entity } from "./Entity";
import { TimeChecker } from "./utils/TimeChecker";

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

        const checker = new TimeChecker();
        if (!checker.checkTimeRange(phenomenonTime))   // TODO phenomenonTime can be simple date as well as time range
            throw new RangeError(`"${phenomenonTime}" is not a valid phenomenonTime value.`);
        this.phenomenonTime = phenomenonTime;

        this.resultTime = resultTime;
        
        if (!checker.checkTimeRange(validTime))
            throw new RangeError(`"${validTime}" is not a valid validTime value.`);
        this.validTime = validTime;
    }

    get dao(): BaseDao<Observation> {
        throw new Error("Method not implemented.");
    }
}