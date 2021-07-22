import type BaseCommand from './base';
import type { CommandInteraction } from 'discord.js';
export default class GiveCommand implements BaseCommand {
    private readonly _bloxyClient;
    execute(interaction: CommandInteraction): Promise<void>;
}
