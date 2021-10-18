import {AxiosResponse} from "axios";

/**
 * This class ensures the library works on several SensorThings API implementations by
 * handling differences between them.
 */
export class CompatibilityUtils {
    /**
     * Some SensorThings API implementations return created entity id in request body,
     * others in location header.
     * @param response SensorThings API response to entity creation
     */
    public getCreatedEntityIdFromResponse(response: AxiosResponse<Object>): number {
        // @ts-ignore
        if (response.data['@iot.id'] !== undefined) return response.data['@iot.id'];

        if (response.headers.location !== undefined) {
            const header = response.headers.location;
            const entityId = header.substring(
                header.lastIndexOf('(')+1,
                header.lastIndexOf(')')
            );
            return +entityId;
        }

        throw new RangeError();
    }
}
