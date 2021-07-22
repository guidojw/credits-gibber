"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissionsCommand = {
    name: 'permissions',
    description: 'Get or edit permissions for a user or a role',
    defaultPermission: false,
    options: [{
            name: 'user',
            description: 'Get or edit permissions for a user',
            type: 'SUB_COMMAND_GROUP',
            options: [{
                    name: 'get',
                    description: 'Get permissions for a user',
                    type: 'SUB_COMMAND',
                    options: [{
                            name: 'user',
                            description: 'The user to get',
                            type: 'USER',
                            required: true
                        }, {
                            name: 'command',
                            description: 'The command to get the permission of',
                            type: 'STRING',
                            required: true
                        }]
                }, {
                    name: 'edit',
                    description: 'Edit permissions for a user',
                    type: 'SUB_COMMAND',
                    options: [{
                            name: 'user',
                            description: 'The user to edit',
                            type: 'USER',
                            required: true
                        }, {
                            name: 'command',
                            description: 'The command to give permission for',
                            type: 'STRING',
                            required: true
                        }, {
                            name: 'allow',
                            description: 'The state of the permission',
                            type: 'STRING',
                            required: true,
                            choices: [{
                                    name: 'true',
                                    value: 'true'
                                }, {
                                    name: 'false',
                                    value: 'false'
                                }, {
                                    name: 'none',
                                    value: 'none'
                                }]
                        }]
                }]
        }, {
            name: 'role',
            description: 'Get or edit permissions for a role',
            type: 'SUB_COMMAND_GROUP',
            options: [{
                    name: 'get',
                    description: 'Get permissions for a role',
                    type: 'SUB_COMMAND',
                    options: [{
                            name: 'role',
                            description: 'The role to get',
                            type: 'ROLE',
                            required: true
                        }, {
                            name: 'command',
                            description: 'The command to get the permission of',
                            type: 'STRING',
                            required: true
                        }]
                }, {
                    name: 'edit',
                    description: 'Edit permissions for a role',
                    type: 'SUB_COMMAND',
                    options: [{
                            name: 'role',
                            description: 'The role to edit',
                            type: 'ROLE',
                            required: true
                        }, {
                            name: 'command',
                            description: 'The command to give permission for',
                            type: 'STRING',
                            required: true
                        }, {
                            name: 'allow',
                            description: 'The state of the permission',
                            type: 'STRING',
                            required: true,
                            choices: [{
                                    name: 'true',
                                    value: 'true'
                                }, {
                                    name: 'false',
                                    value: 'false'
                                }, {
                                    name: 'none',
                                    value: 'none'
                                }]
                        }]
                }]
        }]
};
exports.default = permissionsCommand;
