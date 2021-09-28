export abstract class Entity {
    private _id: number | undefined;
    get id(): number {
        if (this._id === undefined)
            throw new RangeError(
                "Entity hasn't been created on a service yet."
            );
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    abstract getURLSuffix(): string;
    get entityResourcePathname(): string {
        return `${this.getURLSuffix()}(${this.id})`;
    }
    abstract toString(): string;
}
