import {EntityList} from "../../src/model/list/EntityList";
import {DumbEntity} from "./DumbEntity";
import {Location} from "../../src/model/Location";
import {SensorThingsService} from "../../src";

export class DumbEntityLocationsList extends EntityList<DumbEntity, Location>{
    public constructor(parent: DumbEntity, service: SensorThingsService) {
        super(parent, service);
    }
}
