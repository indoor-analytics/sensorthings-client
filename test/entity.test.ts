// @ts-ignore
import { MockEntity } from './utils/MockEntity';

describe('Entity', () => {
    it("shouldn't return id when not created", () => {
        const payload = new MockEntity('name', 'description');
        const getId = () => payload.id;
        expect(getId).toThrowError(
            new RangeError("Entity hasn't been created on a service yet.")
        );
    });
});
