"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const axios_1 = tslib_1.__importDefault(require("axios"));
const repositories_1 = require("../repositories");
let TodoController = exports.TodoController = class TodoController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async count() {
        // {
        //   "country": "United States",
        //   "domains": [
        //   "lindenwood.edu"
        //   ],
        //   "alpha_two_code": "US",
        //   "state-province": null,
        //   "web_pages": [
        //   "http://www.lindenwood.edu/"
        //   ],
        //   "name": "Lindenwood University"
        //   }
        let responseData = [];
        await (0, axios_1.default)({
            method: 'get',
            url: 'http://universities.hipolabs.com/search?country=United+States',
        }).then(function (response) {
            responseData = response.data;
        });
        responseData.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // Convert to uppercase to make the comparison case-insensitive
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        // Sort it using name
        // add only
        let finalData = [];
        for (const data of responseData) {
            finalData.push({
                alpha_two_code: data.alpha_two_code,
                country: data.country,
                name: data.name,
            });
        }
        return finalData;
    }
    async addRandomValue() {
        const x = await this.todoRepository.create({
            name: 'Value' + Math.random(),
        });
        return x;
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/univeristies/get'),
    (0, rest_1.response)(200, {
        description: 'Todo model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/addRandomValue'),
    (0, rest_1.response)(200, {
        description: 'Todo model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "addRandomValue", null);
exports.TodoController = TodoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoRepository])
], TodoController);
//# sourceMappingURL=todo.controller.js.map