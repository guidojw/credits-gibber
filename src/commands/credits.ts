import type BaseCommand from './base'
import type { CommandInteraction } from 'discord.js'
import type { DataStore } from '@mfd/rbxdatastoreservice/lib/types/Classes/DataStore'
import { DataStoreService } from '@mfd/rbxdatastoreservice'
import applicationConfig from '../configs/application'
import { injectable } from 'inversify'

type DataStoreData = { TrainCredits: number } | undefined

@injectable()
export default class CreditsCommand implements BaseCommand {
  public async execute (interaction: CommandInteraction): Promise<void> {
    const dataStore: DataStore = DataStoreService.GetDataStore(
      applicationConfig.dataStoreName,
      applicationConfig.dataStoreScope
    )

    const subCommand = interaction.options.getSubCommand()
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
            content: `**${userId}** has **${data.TrainCredits}** credits`
          })
        }
      }

      case 'give': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const { value: amount } = interaction.options.get('amount', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        const oldData = await dataStore.GetAsync(key) as DataStoreData
        if (typeof oldData === 'undefined') {
          return await interaction.reply({
            content: `Cannot change credits of user with ID **${userId}** because they don't have any in-game data ` +
              'yet.\nAsk them to join the game and try again.',
            ephemeral: true
          })
        }

        try {
          await dataStore.SetAsync(key, {
            ...oldData,
            TrainCredits: oldData.TrainCredits + amount
          })
          return await interaction.reply({
            content: `Successfully changed **${userId}**'s credits: from **${oldData.TrainCredits}** to **${oldData.TrainCredits + amount}**`
          })
        } catch (err) {
          // FIXME: HTTP 400 The provided data length does not match the amount of data.
          console.error(err)
          console.error(err.response.data.errors)
        }
      }
    }
  }
}

console.log()
