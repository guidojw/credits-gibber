import * as interactions from '../../interactions'
import type BaseHandler from '../base'
import type Client from '../client'
import type { Message } from 'discord.js'
import { injectable } from 'inversify'

@injectable()
export default class MessageCreateHandler implements BaseHandler {
  public async handle (client: Client, message: Message): Promise<void> {
    const guild = message.guild
    if (guild === null) {
      return
    }

    if (client.application?.owner === null) {
      await client.application?.fetch()
    }
    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner?.id) {
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
}
