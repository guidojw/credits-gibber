"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rbxdatastoreservice_1 = require("@mfd/rbxdatastoreservice");
const application_1 = tslib_1.__importDefault(require("../configs/application"));
const inversify_1 = require("inversify");
let CreditsCommand = class CreditsCommand {
    async execute(interaction) {
        const dataStore = rbxdatastoreservice_1.DataStoreService.GetDataStore(application_1.default.dataStoreName, application_1.default.dataStoreScope);
        const subCommand = interaction.options.getSubCommand();
        switch (subCommand) {
            case 'get': {
                const { value: userId } = interaction.options.get('userid', true);
                const key = application_1.default.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString());
                const data = await dataStore.GetAsync(key);
                if (typeof data === 'undefined') {
                    return await interaction.reply({
                        content: `**${userId}** has no in-game data yet`
                    });
                }
                else {
                    return await interaction.reply({
                        content: `**${userId}** has **${data.TrainCredits}** credits`
                    });
                }
            }
            case 'give': {
                const { value: userId } = interaction.options.get('userid', true);
                const { value: amount } = interaction.options.get('amount', true);
                const key = application_1.default.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString());
                const oldData = await dataStore.GetAsync(key);
                if (typeof oldData === 'undefined') {
                    return await interaction.reply({
                        content: `Cannot change credits of user with ID **${userId}** because they don't have any in-game data ` +
                            'yet.\nAsk them to join the game and try again.',
                        ephemeral: true
                    });
                }
                try {
                    await dataStore.SetAsync(key, {
                        ...oldData,
                        TrainCredits: oldData.TrainCredits + amount
                    });
                    return await interaction.reply({
                        content: `Successfully changed **${userId}**'s credits: from **${oldData.TrainCredits}** to **${oldData.TrainCredits + amount}**`
                    });
                }
                catch (err) {
                    console.error(err);
                    console.error(err.response.data.errors);
                }
            }
        }
    }
};
CreditsCommand = tslib_1.__decorate([
    inversify_1.injectable()
], CreditsCommand);
exports.default = CreditsCommand;
console.log();
