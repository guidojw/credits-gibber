import { DataStore, Universe } from '@daw588/roblox.js/dist/index.js'
import type BaseCommand from './base.js'
import type { CommandInteraction } from 'discord.js'
import { MessageAttachment } from 'discord.js'
import applicationConfig from '../configs/application.js'
import { injectable } from 'inversify'

type DataStoreData = { TrainData: number } | undefined

@injectable()
export default class TrainsCommand implements BaseCommand {
  public async execute (interaction: CommandInteraction): Promise<void> {
    const universe = new Universe(applicationConfig.universeId, process.env.ROBLOX_KEY as string)
    const dataStore = new DataStore(universe, applicationConfig.dataStoreName)

    const subCommand = interaction.options.getSubcommand()
    switch (subCommand) {
      case 'get': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        const data = (await dataStore.GetAsync<DataStoreData>(key))[0]
        if (typeof data === 'undefined') {
          return await interaction.reply({
            content: `**${userId}** has no in-game data yet`
          })
        } else {
          return await interaction.reply({
            content: `**${userId}**'s trains:`,
            files: [new MessageAttachment(Buffer.from(JSON.stringify(
              data.TrainData,
              (_key, value) => Array.isArray(value) ? JSON.stringify(value) : value,
              2
            )), `${userId}-trains.lua`)]
          })
        }
      }
    }
  }
}
