"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const tslib_1 = require("tslib");
const container_1 = tslib_1.__importDefault(require("./container"));
async function init() {
    return await container_1.default();
}
exports.init = init;
