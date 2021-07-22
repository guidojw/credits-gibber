"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const creditsCommand = {
    name: 'credits',
    description: 'Get or give Roblox users credits',
    defaultPermission: false,
    options: [{
            name: 'get',
            description: 'Get a Roblox user\'s credits',
            type: 'SUB_COMMAND',
            options: [{
                    name: 'userid',
                    description: 'The Roblox ID of the user to get the credits of',
                    type: 'INTEGER',
                    required: true
                }]
        }, {
            name: 'give',
            description: 'Give Roblox users edits',
            type: 'SUB_COMMAND',
            options: [{
                    name: 'userid',
                    description: 'The Roblox ID of the user to give credits to',
                    type: 'INTEGER',
                    required: true
                }, {
                    name: 'amount',
                    description: 'The amount of credits to give to the user',
                    type: 'INTEGER',
                    required: true
                }]
        }]
};
exports.default = creditsCommand;
