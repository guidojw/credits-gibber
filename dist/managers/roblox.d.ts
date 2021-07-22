import BaseManager from './base';
import { Client } from 'bloxy/dist';
export default class RobloxManager implements BaseManager {
    private readonly authenticatedClients;
    private readonly unauthenticatedClient;
    constructor();
    init(): Promise<void>;
    getClient(groupId?: number): Client;
}
