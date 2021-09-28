export abstract class Entity {
    protected _id: number | undefined;
    abstract get id(): number;
    abstract set id(number);

    abstract getURLSuffix(): string;
    abstract toString(): string;
}
