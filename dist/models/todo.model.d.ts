import { Entity } from '@loopback/repository';
export declare class Todo extends Entity {
    id?: string;
    name: string;
    constructor(data?: Partial<Todo>);
}
export interface TodoRelations {
}
export type TodoWithRelations = Todo & TodoRelations;
