import * as eventHandlers from './events'
import { Client, Intents } from 'discord.js'
import type { BaseEventHandler } from './events'
import { Container } from 'inversify'

export default class CreditsGibberClient {
  public client: Client
  public container: Container

  public constructor (container: Container) {
    this.container = container

    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    })
    this.client.once('ready', this.ready.bind(this))
  }

  public async login (token = process.env.DISCORD_TOKEN): Promise<string> {
    return await this.client.login(token)
  }

  private ready (): void {
    this.bindEvent('interactionCreate')
    this.bindEvent('messageCreate')

    console.log(`Ready to serve on ${this.client.guilds.cache.size} servers, for ${this.client.users.cache.size} users.`)
  }

  private bindEvent (eventName: string): void {
    // @ts-expect-error
    const handler = eventHandlers[eventName] as BaseEventHandler
    this.client.on(eventName, (...args) => handler(this, ...args))
  }
}
