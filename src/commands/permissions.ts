import type { CommandInteraction, Role, User } from 'discord.js'
import type BaseCommand from './base'
import { injectable } from 'inversify'

@injectable()
export default class PermissionsCommand implements BaseCommand {
  public async execute (interaction: CommandInteraction): Promise<void> {
    if (!interaction.inGuild()) {
      return
    }

    await interaction.guild?.commands.fetch()
    const { value: commandName } = interaction.options.get('command', true) as { value: string }
    const command = interaction.guild?.commands.cache.find(command => command.name === commandName)
    if (typeof command === 'undefined') {
      return await interaction.reply({
        content: `Command **/${commandName}** not found`,
        ephemeral: true
      })
    }

    const type = interaction.options.getSubCommandGroup() === 'role' ? 'ROLE' : 'USER'
    const action = interaction.options.getSubCommand() === 'edit' ? 'edit' : 'get'

    let roleOrUser: Role | User
    if (type === 'ROLE') {
      // @ts-expect-error discord.js does not export APIRole
      roleOrUser = interaction.options.getRole('role', true)
    } else {
      roleOrUser = interaction.options.getUser('user', true)
    }

    switch (action) {
      case 'get' : {
        let allowed = command.defaultPermission
        try {
          const permission = (await command.permissions.fetch({ guild: interaction.guildId }))
            .find(permission => permission.type === type && permission.id === roleOrUser.id)
          allowed = permission?.permission ?? allowed
        } catch {}
        return await interaction.reply({
          content: `${roleOrUser.toString()} can${allowed ? '' : 'not'} run **/${command.name}**`,
          ephemeral: true
        })
      }

      case 'edit': {
        const { value: allow } = interaction.options.get('allow', true) as { value: string }

        if (allow === 'none') {
          // @ts-expect-error
          await command.permissions.remove({
            users: type === 'USER' ? roleOrUser.id : undefined,
            roles: type === 'ROLE' ? roleOrUser.id : undefined
          })
          return await interaction.reply({
            content: `Removed ${roleOrUser.toString()}'s **/${command.name}** permission`,
            ephemeral: true
          })
        } else {
          await command.permissions.add({
            permissions: [{
              id: roleOrUser.id,
              type,
              permission: allow === 'true'
            }]
          })
          return await interaction.reply({
            content: `Set ${roleOrUser.toString()}'s **/${command.name}** permission to **${allow}**`,
            ephemeral: true
          })
        }
      }
    }
  }
}
