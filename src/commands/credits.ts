import type BaseCommand from './base'
import type { CommandInteraction } from 'discord.js'
import { DataStoreService } from '@mfd/rbxdatastoreservice'
import applicationConfig from '../configs/application'
import { injectable } from 'inversify'

type DataStoreData = { TrainCredits: number } | undefined

@injectable()
export default class CreditsCommand implements BaseCommand {
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
            // Roblox API returns "inf" in JSON when the amount of credits is
            // very big, which Node.js apparently sees as typeof undefined.
            content: `**${userId}** has **${typeof data.TrainCredits !== 'undefined' ? Math.floor(data.TrainCredits) : '∞'}** credits`
          })
        }
      }

      case 'give': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const { value: amount } = interaction.options.get('amount', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        let oldData: DataStoreData
        let newData: Exclude<DataStoreData, undefined>
        try {
          newData = await dataStore.UpdateAsync<DataStoreData>(
            key,
            (oldValue: DataStoreData) => {
              if (typeof oldValue === 'undefined') {
                return
              }
              oldData = { ...oldValue }
              oldValue.TrainCredits = Math.floor(oldValue.TrainCredits + amount)
              return oldValue
            }
          ) as Exclude<DataStoreData, undefined>
        } catch {}

        if (typeof oldData === 'undefined' || typeof newData === 'undefined') {
          return await interaction.reply({
            content: `Cannot change credits of user with ID **${userId}**, they probably don't have any in-game data ` +
              'yet.\nAsk them to join the game and try again.',
            ephemeral: true
          })
        }

        return await interaction.reply({
          content: `Successfully changed **${userId}**'s credits: from **${Math.floor(oldData.TrainCredits)}** to **${newData.TrainCredits}**`
        })
      }
    }
  }
}
