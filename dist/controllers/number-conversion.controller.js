"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberConversionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let NumberConversionController = exports.NumberConversionController = class NumberConversionController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async convertToNumber(data) {
        const words = data.words;
        const wordMap = {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            sixteen: 16,
            seventeen: 17,
            eighteen: 18,
            nineteen: 19,
            twenty: 20,
            thirty: 30,
            forty: 40,
            fifty: 50,
            sixty: 60,
            seventy: 70,
            eighty: 80,
            ninety: 90,
        };
        const units = {
            hundred: 100,
            thousand: 1000,
            million: 1000000,
            billion: 1000000000,
        };
        let finalNumber = 0;
        let cnumber = 0;
        let numbers = [];
        words
            .toLowerCase()
            .split(' ')
            .forEach(n => {
            if (wordMap[n]) {
                cnumber += wordMap[n];
            }
            else if (units[n]) {
                if (numbers.length && units[n] > numbers[numbers.length - 1]) {
                    numbers[numbers.length - 1] += cnumber;
                    numbers[numbers.length - 1] *= units[n];
                }
                else {
                    numbers.push(cnumber * units[n]);
                }
                cnumber = 0;
            }
            else {
                return 'Invalid Number';
            }
        });
        if (cnumber > 0) {
            numbers.push(cnumber);
        }
        for (let number of numbers) {
            finalNumber += number;
        }
        return {
            number: finalNumber,
        };
    }
    async convertToWord(data) {
        return {
            words: this.todoRepository.numberToWordConverstion(data.number),
        };
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/to/number'),
    (0, rest_1.response)(200, {
        description: 'Todo model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Todo) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NumberConversionController.prototype, "convertToNumber", null);
tslib_1.__decorate([
    (0, rest_1.post)('/to/words'),
    (0, rest_1.response)(200, {
        description: 'Todo model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Todo) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NumberConversionController.prototype, "convertToWord", null);
exports.NumberConversionController = NumberConversionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoRepository])
], NumberConversionController);
//# sourceMappingURL=number-conversion.controller.js.map