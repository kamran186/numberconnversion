"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Todo = exports.Todo = class Todo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Todo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Todo.prototype, "name", void 0);
exports.Todo = Todo = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Todo);
//# sourceMappingURL=todo.model.js.map