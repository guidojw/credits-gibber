import { Client } from 'discord.js';
import { Container } from 'inversify';
export default class CreditsGibberClient {
    client: Client;
    container: Container;
    constructor(container: Container);
    login(token?: string | undefined): Promise<string>;
    private ready;
    private bindEvent;
}
