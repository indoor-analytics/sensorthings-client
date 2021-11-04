import { Feature, Geometry } from "@turf/helpers";
import { FeatureOfInterest } from "../model/FeatureOfInterest";
import { BaseDao } from "./BaseDao";

export class FeatureOfInterestDao extends BaseDao<FeatureOfInterest> {
    get entityPathname(): string {
        return 'FeaturesOfInterest';
    }
    get entityPublicAttributes(): string[] {
        return ['name', 'description', 'encodingType', 'feature'];
    }
    buildEntity(data: Record<string, unknown>): FeatureOfInterest {
        return new FeatureOfInterest(
            this._service,
            data.name as string,
            data.description as string,
            data.feature as Feature<Geometry>
        )
    }
}