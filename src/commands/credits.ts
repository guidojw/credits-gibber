import { Universe, DataStore } from '@daw588/roblox.js/dist/index.js'
import type BaseCommand from './base.js'
import type { CommandInteraction } from 'discord.js'
import applicationConfig from '../configs/application.js'
import { injectable } from 'inversify'

type DataStoreData = { TrainCredits: number }

@injectable()
export default class CreditsCommand implements BaseCommand {
  public async execute (interaction: CommandInteraction): Promise<void> {
    const universe = new Universe(applicationConfig.universeId, process.env.ROBLOX_KEY as string)
    const dataStore = new DataStore(universe, applicationConfig.dataStoreName)

    const subCommand = interaction.options.getSubcommand()
    switch (subCommand) {
      case 'get': {
        const { value: userId } = interaction.options.get('userid', true) as { value: number }
        const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())

        try {
          const data = (await dataStore.GetAsync<DataStoreData>(key))[0]
          return await interaction.reply({
            // Roblox API returns "inf" in JSON when the amount of credits is
            // very big, which Node.js apparently sees as typeof undefined.
            content: `**${userId}** has **${typeof data.TrainCredits !== 'undefined' ? Math.floor(data.TrainCredits) : '∞'}** credits`
          })
        } catch (err) {
          // TODO: fix "SyntaxError: Unexpected token i in JSON at position 36"
          //  when Roblox returns "inf".
          return await interaction.reply({
            content: `**${userId}** has no in-game data yet`
          })
        }
      }

      // case 'give': {
      //   const { value: userId } = interaction.options.get('userid', true) as { value: number }
      //   const { value: amount } = interaction.options.get('amount', true) as { value: number }
      //   const key = applicationConfig.dataStoreKeyTemplate.replace(/{userId}/g, userId.toString())
      //
      //   let oldData: DataStoreData
      //   let newData: DataStoreData
      //   try {
      //     await dataStore.UpdateAsync<DataStoreData>(
      //       key,
      //       (oldValue: DataStoreData) => {
      //         if (typeof oldValue === 'undefined') {
      //           return
      //         }
      //         oldData = { ...oldValue }
      //         oldValue.TrainCredits = Math.floor(oldValue.TrainCredits + amount)
      //         newData = { ...oldValue }
      //         return oldValue
      //       }
      //     )
      //   } catch {}
      //
      //   if (typeof oldData === 'undefined' || typeof newData === 'undefined') {
      //     return await interaction.reply({
      //       content: `Cannot change credits of user with ID **${userId}**, they probably don't have any in-game data ` +
      //         'yet.\nAsk them to join the game and try again.',
      //       ephemeral: true
      //     })
      //   }
      //
      //   return await interaction.reply({
      //     content: `Successfully changed **${userId}**'s credits: from **${Math.floor(oldData.TrainCredits)}** to **${newData.TrainCredits}**`
      //   })
      // }
    }
  }
}
