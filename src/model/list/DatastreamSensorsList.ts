import {EntityList} from "./EntityList";
import {Datastream} from "../Datastream";
import {Sensor} from "../Sensor";

export class DatastreamSensorsList extends EntityList<Datastream, Sensor> {
    add(entity: Sensor): Promise<void> {
        return this._service.sensors.createFromEntity(this._parent, entity);
    }
    list(): Promise<Sensor[]> {
        return this._service.sensors.getFromEntity(this._parent);
    }
}
