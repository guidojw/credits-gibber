import type BaseCommand from './base'
import type { CommandInteraction } from 'discord.js'
import { DataStoreService } from '@mfd/rbxdatastoreservice'
import { MessageAttachment } from 'discord.js'
import applicationConfig from '../configs/application'
import { injectable } from 'inversify'

type DataStoreData = { TrainData: number } | undefined

@injectable()
export default class TrainsCommand implements BaseCommand {
  public async execute (interaction: CommandInteraction): Promise<void> {
    const dataStore = DataStoreService.GetDataStore(
      applicationConfig.dataStoreName,
      applicationConfig.dataStoreScope
    )

    const subCommand = interaction.options.getSubcommand()
    switch (subCommand) {
      case 'get': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        const data = await dataStore.GetAsync(key) as DataStoreData
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
