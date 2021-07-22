"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interactionCreateHandler = async function (client, interaction) {
    if (!interaction.isCommand()) {
        return;
    }
    const command = client.container.get(interaction.commandName);
    if (typeof command === 'undefined') {
        return;
    }
    await command.execute(interaction);
};
exports.default = interactionCreateHandler;
