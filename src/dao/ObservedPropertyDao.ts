import {BaseDao} from "./BaseDao";
import {ObservedProperty} from "../model/ObservedProperty";

export class ObservedPropertyDao extends BaseDao<ObservedProperty> {
    buildEntity(data: Record<string, unknown>): ObservedProperty {
        return new ObservedProperty(
            this._service,
            data.name as string,
            data.definition as string,
            data.description as string
        );
    }
    get entityPathname(): string {
        return "ObservedProperties";
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'definition'];
    }
}
