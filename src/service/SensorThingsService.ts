import {Entity} from "../model/Entity";

export class SensorThingsService {
    private _endpoint: URL;
    constructor (endpoint: URL) {
        this._endpoint = endpoint;
    }

    public create (entity: Entity): void {
        throw Error("Not implemented");
    }

    public update (entity: Entity): void {
        throw Error("Not implemented");
    }

    public patch (entity: Entity): void {
        throw Error("Not implemented");
    }

    public delete (entity: Entity): void {
        throw Error("Not implemented");
    }
}
