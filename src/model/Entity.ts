export abstract class Entity {
    abstract getId(): number;
    abstract getURLSuffix(): string;
    abstract toString(): string;
}
