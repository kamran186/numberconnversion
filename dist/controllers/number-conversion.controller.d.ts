import { TodoRepository } from '../repositories';
export declare class NumberConversionController {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    convertToNumber(data: {
        words: string;
    }): Promise<{
        number: number;
    }>;
    convertToWord(data: {
        number: number;
    }): Promise<{
        words: string;
    }>;
}
