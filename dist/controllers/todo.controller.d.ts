import { TodoRepository } from '../repositories';
export declare class TodoController {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    count(): Promise<any>;
    addRandomValue(): Promise<any>;
}
