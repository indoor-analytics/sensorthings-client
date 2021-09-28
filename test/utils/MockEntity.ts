import { Entity } from '../../src/model/Entity';

export class MockEntity extends Entity {
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this._id = 0;
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

    get id(): number {
        if (this._id === undefined)
            throw new Error();
        return this._id;
    }
    set id (value: number) {
        this._id = value;
    }
}
