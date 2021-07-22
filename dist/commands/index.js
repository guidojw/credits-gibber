"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsCommand = exports.CreditsCommand = void 0;
var credits_1 = require("./credits");
Object.defineProperty(exports, "CreditsCommand", { enumerable: true, get: function () { return __importDefault(credits_1).default; } });
var permissions_1 = require("./permissions");
Object.defineProperty(exports, "PermissionsCommand", { enumerable: true, get: function () { return __importDefault(permissions_1).default; } });
