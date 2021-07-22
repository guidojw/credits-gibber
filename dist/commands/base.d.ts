import type { CommandInteraction } from 'discord.js';
export default interface BaseCommand {
    execute: (interaction: CommandInteraction) => Promise<void>;
}
