import type BaseHandler from '../base'
import type Client from '../client'
import type { Interaction } from 'discord.js'
import { injectable } from 'inversify'

@injectable()
export default class InteractionCreateHandler implements BaseHandler {
  public async handle (client: Client, interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
      return
    }

    try {
      await client.commandFactory(interaction.commandName).execute(interaction)
    } catch (err) {
      await interaction.reply({
        content: err.toString(),
        ephemeral: true
      })
    }
  }
}
