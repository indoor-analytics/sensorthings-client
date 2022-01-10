import {EntityList} from "./EntityList";
import {Sensor} from "../Sensor";
import {Datastream} from "../Datastream";

export class SensorDatastreamsList extends EntityList<Sensor, Datastream> {
    add(entity: Datastream): Promise<void> {
        return this._service.datastreams.createFromEntity(this._parent, entity);
    }
    list(): Promise<Datastream[]> {
        return this._service.datastreams.getFromEntity(this._parent);
    }
}
