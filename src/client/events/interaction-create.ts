import type { BaseCommand } from '../../commands'
import type BaseEventHandler from './base'
import type Client from '../client'
import type { Interaction } from 'discord.js'

const interactionCreateHandler: BaseEventHandler = async function (
  client: Client,
  interaction: Interaction
): Promise<void> {
  if (!interaction.isCommand()) {
    return
  }

  const command = client.container.get<BaseCommand | undefined>(interaction.commandName)
  if (typeof command === 'undefined') {
    return
  }
  await command.execute(interaction)
}

export default interactionCreateHandler
