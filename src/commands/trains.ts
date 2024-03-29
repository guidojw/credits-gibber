import { AttachmentBuilder, type ChatInputCommandInteraction } from 'discord.js'
import { DataStore, Universe } from '@daw588/roblox.js/dist/index.js'
import type BaseCommand from './base.js'
import applicationConfig from '../configs/application.js'
import { injectable } from 'inversify'

type DataStoreData = { TrainData: number } | undefined

@injectable()
export default class TrainsCommand implements BaseCommand {
  public async execute (interaction: ChatInputCommandInteraction): Promise<void> {
    const universe = new Universe(applicationConfig.universeId, process.env.ROBLOX_KEY as string)
    const dataStore = new DataStore(universe, applicationConfig.dataStoreName)

    const subCommand = interaction.options.getSubcommand()
    switch (subCommand) {
      case 'get': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        const data = (await dataStore.GetAsync<DataStoreData>(key))[0]
        if (typeof data === 'undefined') {
          await interaction.reply({
            content: `**${userId}** has no in-game data yet`
          })
        } else {
          await interaction.reply({
            content: `**${userId}**'s trains:`,
            files: [new AttachmentBuilder(Buffer.from(JSON.stringify(
              data.TrainData,
              (_key, value) => Array.isArray(value) ? JSON.stringify(value) : value,
              2
            )), { name: `${userId}-trains.lua` })]
          })
        }
      }
    }
  }
}
