"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const commands_1 = require("../commands");
const client_1 = tslib_1.__importDefault(require("../client/client"));
const rbxdatastoreservice_1 = require("@mfd/rbxdatastoreservice");
const application_1 = tslib_1.__importDefault(require("../configs/application"));
const util_1 = require("../util");
const { TYPES } = util_1.constants;
async function init() {
    const container = new inversify_1.Container();
    const bindings = new inversify_1.AsyncContainerModule(async (bind) => {
        // Commands
        bind('credits').to(commands_1.CreditsCommand);
        bind('permissions').to(commands_1.PermissionsCommand);
        // Client
        const creditsGibberClient = new client_1.default(container);
        await creditsGibberClient.login();
        console.log('Discord client logged in!');
        bind(TYPES.CreditsGibberClient).toConstantValue(creditsGibberClient);
        // DataStoreService
        await rbxdatastoreservice_1.InitializeAsync(process.env.ROBLOX_COOKIE, application_1.default.placeId);
        console.log('DataStoreService initialized!');
    });
    await container.loadAsync(bindings);
    return container;
}
exports.default = init;
