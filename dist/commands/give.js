"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const application_1 = tslib_1.__importDefault(require("../configs/application"));
const util_1 = require("../util");
const inversify_1 = require("inversify");
const { TYPES } = util_1.constants;
class GiveCommand {
    async execute(interaction) {
        const dataStore = this._bloxyClient.dataStoreManager.getDataStore(application_1.default.placeId, application_1.default.dataStoreName, application_1.default.dataStoreScope);
        const userIdOption = interaction.options.get('userid');
        const amountOption = interaction.options.get('amount');
        if (userIdOption !== null && amountOption !== null) {
            const { value: userId } = userIdOption;
            const { value: amount } = amountOption;
            console.log(userId, amount);
            const key = application_1.default.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString());
            const old = await dataStore.getAsync(key);
            await interaction.reply({ content: `Credits: ${old}`, ephemeral: true });
        }
    }
}
tslib_1.__decorate([
    inversify_1.inject(TYPES.BloxyClient),
    tslib_1.__metadata("design:type", Function)
], GiveCommand.prototype, "_bloxyClient", void 0);
exports.default = GiveCommand;
