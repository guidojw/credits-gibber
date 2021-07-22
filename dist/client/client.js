"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eventHandlers = tslib_1.__importStar(require("./events"));
const discord_js_1 = require("discord.js");
class CreditsGibberClient {
    constructor(container) {
        this.container = container;
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES]
        });
        this.client.once('ready', this.ready.bind(this));
    }
    async login(token = process.env.DISCORD_TOKEN) {
        return await this.client.login(token);
    }
    ready() {
        this.bindEvent('interactionCreate');
        this.bindEvent('messageCreate');
        console.log(`Ready to serve on ${this.client.guilds.cache.size} servers, for ${this.client.users.cache.size} users.`);
    }
    bindEvent(eventName) {
        // @ts-expect-error
        const handler = eventHandlers[eventName];
        this.client.on(eventName, (...args) => handler(this, ...args));
    }
}
exports.default = CreditsGibberClient;
