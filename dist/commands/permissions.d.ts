import type { CommandInteraction } from 'discord.js';
import type BaseCommand from './base';
export default class PermissionsCommand implements BaseCommand {
    execute(interaction: CommandInteraction): Promise<void>;
}
