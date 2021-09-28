import {Entity} from "./Entity";

export class Thing extends Entity {
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }
    getURLSuffix(): string {
        return "Things";
    }
}
