import { ApplicationCommandOptionType, type RESTPutAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'

const trainsCommand: RESTPutAPIApplicationCommandsJSONBody[number] = {
  name: 'trains',
  description: 'Get Roblox users their trains',
  default_member_permissions: '0',
  dm_permission: false,
  options: [{
    name: 'get',
    description: 'Get a Roblox user\'s trains',
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: 'userid',
      description: 'The Roblox ID of the user to get the trains of',
      type: ApplicationCommandOptionType.Integer,
      required: true
    }]
  }]
}

export default trainsCommand
