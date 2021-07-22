"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const giveCommand = {
    name: 'give',
    description: 'Hands in-game credits to a Roblox user.',
    options: [{
            name: 'userid',
            description: 'The Roblox ID of the user to give the credits to.',
            type: 'USER',
            required: true
        }, {
            name: 'amount',
            description: 'The amount of credits to give to the user.',
            type: 'INTEGER',
            required: true
        }]
};
exports.default = giveCommand;
