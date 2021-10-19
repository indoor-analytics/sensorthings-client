import {AbstractBuilder} from "./AbstractBuilder";
import {HistoricalLocation} from "../HistoricalLocation";
import {SensorThingsService} from "../../service/SensorThingsService";
import {MissingArgumentError} from "../../error/MissingArgumentError";

export class HistoricalLocationBuilder extends AbstractBuilder<HistoricalLocation>{
    constructor(service: SensorThingsService) {
        super(service);
    }

    setTime(time: string): HistoricalLocationBuilder {
        this._attributes.time = time;
        return this;
    }

    protected buildEntity(): HistoricalLocation {
        if (!this._attributes.time)
            throw new MissingArgumentError('"time" argument is required to build a HistoricalLocation.');
        return new HistoricalLocation( this._service, this._attributes.time as string);
    }
}
