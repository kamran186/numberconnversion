"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let TodoRepository = exports.TodoRepository = class TodoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Todo, dataSource);
    }
    numberToWordConverstion(number) {
        const wordMap = {
            0: 'zero',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine',
            10: 'ten',
            11: 'eleven',
            12: 'twelve',
            13: 'thirteen',
            14: 'fourteen',
            15: 'fifteen',
            16: 'sixteen',
            17: 'seventeen',
            18: 'eighteen',
            19: 'nineteen',
            20: 'twenty',
            30: 'thirty',
            40: 'forty',
            50: 'fifty',
            60: 'sixty',
            70: 'seventy',
            80: 'eighty',
            90: 'ninety',
        };
        let word = '';
        if (number === 0) {
            return wordMap[number];
        }
        const points = String(number).split('.');
        const billion = Math.floor(number / 1000000000);
        if (billion > 0) {
            if (billion > 99) {
                word += this.numberToWordConverstion(billion);
            }
            else {
                word += wordMap[billion];
            }
            word += ' Billion ';
            number = Math.floor(number % 1000000000);
        }
        const million = Math.floor(number / 1000000);
        if (million > 0) {
            if (million > 99) {
                word += this.numberToWordConverstion(million);
            }
            else {
                word += wordMap[million];
            }
            word += ' Million ';
            number = Math.floor(number % 1000000);
        }
        const thousands = Math.floor(number / 1000);
        if (thousands > 0) {
            if (thousands > 99) {
                word += this.numberToWordConverstion(thousands);
            }
            else {
                word += wordMap[thousands];
            }
            word += ' Thousand ';
            number = Math.floor(number % 1000);
        }
        const hundred = Math.floor(number / 100);
        if (hundred > 0) {
            if (hundred > 99) {
                word += this.numberToWordConverstion(hundred);
            }
            else {
                word += wordMap[hundred];
            }
            word += ' Hundred ';
            number = Math.floor(number % 100);
        }
        const tens = Math.floor(number / 10);
        if (tens > 0) {
            if (tens > 1) {
                word += wordMap[tens * 10];
            }
            else {
                word += wordMap[number];
            }
            number = Math.floor(number % 10);
        }
        if ((tens > 1 && number > 0) || (tens === 0 && number > 0)) {
            word += ' ' + wordMap[number];
            number = Math.floor(number % 1);
        }
        if (points.length > 1) {
            const value = points[1].split('');
            word += ' Point ' + wordMap[Number(value[0])];
            if (value.length > 1)
                word += ' ' + wordMap[Number(value[1])];
        }
        return word;
    }
};
exports.TodoRepository = TodoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.datasource')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DatasourceDataSource])
], TodoRepository);
//# sourceMappingURL=todo.repository.js.map