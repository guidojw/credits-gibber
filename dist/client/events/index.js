"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreate = exports.interactionCreate = void 0;
var interaction_create_1 = require("./interaction-create");
Object.defineProperty(exports, "interactionCreate", { enumerable: true, get: function () { return __importDefault(interaction_create_1).default; } });
var message_create_1 = require("./message-create");
Object.defineProperty(exports, "messageCreate", { enumerable: true, get: function () { return __importDefault(message_create_1).default; } });
