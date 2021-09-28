import { Entity } from '../../src/model/Entity';

export class MockEntity extends Entity {
    public name: string;
    public description: string;
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }
    getURLSuffix(): string {
        return 'MockEntity';
    }
    toString(): string {
        return JSON.stringify({
            name: this.name,
            description: this.description,
        });
    }
    getId(): number {
        return 42;
    }
}
