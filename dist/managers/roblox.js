"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dist_1 = require("bloxy/dist");
const got_1 = require("got");
const inversify_1 = require("inversify");
let RobloxManager = class RobloxManager {
    constructor() {
        this.authenticatedClients = {};
        // Unauthenticated client
        const client = new dist_1.Client();
        // Set custom requester again, like with the authenticated clients.
        client.rest.requester = requester.bind(client.rest.requester);
        this.unauthenticatedClient = client;
    }
    async init() {
        // Authenticated client(s)
        try {
            const client = new dist_1.Client();
            // Set the client's requester to the custom requester. Needs to be done
            // after instantiation as we need to know what the original requester was.
            client.rest.requester = requester.bind(client.rest.requester);
            await client.login(process.env.ROBLOX_COOKIE);
            console.log('Roblox account logged in!');
            const groups = await client.user?.getGroups();
            const groupIds = groups?.data.map(group => group.group.id) ?? [];
            for (const groupId of groupIds) {
                this.authenticatedClients[groupId] = client;
            }
        }
        catch (err) {
            console.error(err.message);
        }
    }
    getClient(groupId) {
        return typeof groupId !== 'undefined'
            ? this.authenticatedClients[groupId] ?? this.unauthenticatedClient
            : this.unauthenticatedClient;
    }
};
RobloxManager = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], RobloxManager);
exports.default = RobloxManager;
// Custom requester that uses Bloxy's default requester but
// enables its throwHttpErrors option as the project relies on that.
async function requester(options) {
    // HTTP 403s are thrown on fetching new X-CSRF tokens, Bloxy's token refresh
    // mechanism however relies on this so don't throw HTTP errors then.
    if (options.xcsrf !== false && options.url !== 'https://auth.roblox.com/v2/login') {
        options.throwHttpErrors = true;
    }
    try {
        // this refers to Bloxy's original requester.
        return await this(options);
    }
    catch (err) {
        if (err instanceof got_1.HTTPError) {
            if (typeof err.response !== 'undefined' && err.response.statusCode === 403 && err.response.statusMessage.includes('Token Validation Failed')) {
                return err.response;
            }
        }
        throw err;
    }
}
