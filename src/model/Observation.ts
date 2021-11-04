import { SensorThingsService } from "..";
import { BaseDao } from "../dao/BaseDao";
import { Entity } from "./Entity";

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
        this.phenomenonTime = phenomenonTime;
        this.result = result;
        this.resultTime = resultTime;
        this.resultQuality = resultQuality;
        this.validTime = validTime;
        this.parameters = parameters;
    }

    get dao(): BaseDao<Observation> {
        throw new Error("Method not implemented.");
    }
}