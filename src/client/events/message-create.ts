import * as interactions from '../../interactions'
import BaseEventHandler from './base'
import type Client from '../client'
import type { Message } from 'discord.js'

const messageCreateHandler: BaseEventHandler = async function (client: Client, message: Message): Promise<void> {
  const guild = message.guild
  if (guild === null) {
    return
  }

  if (!client.client.application?.owner) {
    await client.client.application?.fetch()
  }
  if (message.content.toLowerCase() === '!deploy' && message.author.id === client.client.application?.owner?.id) {
    await guild.commands.set(Object.values(interactions))

    const permissionsCommand = guild.commands.cache.find(command => command.name === 'permissions')
    if (typeof permissionsCommand !== 'undefined') {
      await permissionsCommand.permissions.add({
        permissions: [{
          id: message.author.id,
          type: 'USER',
          permission: true
        }]
      })
    }

    await message.reply('Successfully set up Slash Commands for this guild.')
  }
}

export default messageCreateHandler
