import { ApplicationCommandOptionType, type RESTPutAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'

const creditsCommand: RESTPutAPIApplicationCommandsJSONBody[number] = {
  name: 'credits',
  description: 'Get or give Roblox users credits',
  default_member_permissions: '0',
  dm_permission: false,
  options: [{
    name: 'get',
    description: 'Get a Roblox user\'s credits',
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: 'userid',
      description: 'The Roblox ID of the user to get the credits of',
      type: ApplicationCommandOptionType.Integer,
      required: true
    }]
  }, {
    name: 'give',
    description: 'Give a Roblox user\'s credits',
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: 'userid',
      description: 'The Roblox ID of the user to give credits to',
      type: ApplicationCommandOptionType.Integer,
      required: true
    }, {
      name: 'amount',
      description: 'The amount of credits to give to the user',
      type: ApplicationCommandOptionType.Integer,
      required: true
    }]
  }]
}

export default creditsCommand
