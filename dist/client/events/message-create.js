"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const interactions = tslib_1.__importStar(require("../../interactions"));
const messageCreateHandler = async function (client, message) {
    const guild = message.guild;
    if (guild === null) {
        return;
    }
    if (!client.client.application?.owner) {
        await client.client.application?.fetch();
    }
    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.client.application?.owner?.id) {
        await guild.commands.set(Object.values(interactions));
        const permissionsCommand = guild.commands.cache.find(command => command.name === 'permissions');
        if (typeof permissionsCommand !== 'undefined') {
            await permissionsCommand.permissions.add({
                permissions: [{
                        id: message.author.id,
                        type: 'USER',
                        permission: true
                    }]
            });
        }
        await message.reply('Successfully set up Slash Commands for this guild.');
    }
};
exports.default = messageCreateHandler;
