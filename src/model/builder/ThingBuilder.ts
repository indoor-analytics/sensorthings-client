import {AbstractBuilder} from "./AbstractBuilder";
import {Thing} from "../Thing";
import {SensorThingsService} from "../../service/SensorThingsService";

export class ThingBuilder extends AbstractBuilder<Thing> {
    constructor(service: SensorThingsService) {
        super(service);
    }

    public setName(name: string): ThingBuilder {
        this._attributes.name = name;
        return this;
    }
    public setDescription(description: string): ThingBuilder {
        this._attributes.description = description;
        return this;
    }

    build(): Thing {
        const t: Thing = new Thing('' + this._attributes.name, '' + this._attributes.description);
        t.setService(this._service);
        return t;
    }
}
