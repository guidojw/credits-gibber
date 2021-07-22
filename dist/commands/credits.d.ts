import type BaseCommand from './base';
import type { CommandInteraction } from 'discord.js';
export default class CreditsCommand implements BaseCommand {
    execute(interaction: CommandInteraction): Promise<void>;
}
