import {Entity} from "../../src/model/Entity";

export class MockEntity extends Entity {
    public name: string;
    constructor (name: string) {
        super();
        this.name = name;
    }
    getURLSuffix(): string {
        return "MockEntity";
    }
}
