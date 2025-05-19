import type { ChatInputCommandInteraction } from 'discord.js'

export default interface BaseCommand {
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}
