import { DataStore, Universe } from '@daw588/roblox.js/dist/index.js'
import type BaseCommand from './base.js'
import type { ChatInputCommandInteraction } from 'discord.js'
import applicationConfig from '../configs/application.js'
import { injectable } from 'inversify'

interface DataStoreData { TrainCredits: number }

@injectable()
export default class CreditsCommand implements BaseCommand {
  public async execute (interaction: ChatInputCommandInteraction): Promise<void> {
    const universe = new Universe(applicationConfig.universeId, process.env.ROBLOX_KEY as string)
    const dataStore = new DataStore(universe, applicationConfig.dataStoreName)

    const subCommand = interaction.options.getSubcommand()
    switch (subCommand) {
      case 'get': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        try {
          const data = (await dataStore.GetAsync<DataStoreData>(key))[0]
          await interaction.reply({
            content: `**${userId}** has **${data.TrainCredits !== Infinity ? Math.floor(data.TrainCredits) : '∞'}** credits`
          })
        } catch (err: any) {
          if (typeof err.status !== 'undefined' && err.status === 404) {
            await interaction.reply({
              content: `**${userId}** has no in-game data yet`
            })
            return
          }
          throw err
        }
        return
      }

      case 'give': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const { value: amount } = interaction.options.get('amount', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        let oldData: DataStoreData
        let newData: DataStoreData
        try {
          oldData = (await dataStore.GetAsync<DataStoreData>(key))[0]
          newData = { ...oldData, TrainCredits: Math.floor(oldData.TrainCredits + amount) }
          await dataStore.SetAsync<DataStoreData>(key, newData)
        } catch (err) {
          await interaction.reply({
            content: `Cannot change credits of user with ID **${userId}**, they probably don't have any in-game data ` +
              'yet.\nAsk them to join the game and try again.',
            ephemeral: true
          })
          return
        }

        await interaction.reply({
          content: `Successfully changed **${userId}**'s credits: from **${Math.floor(oldData.TrainCredits)}** to **${newData.TrainCredits}**`
        })
      }
    }
  }
}
