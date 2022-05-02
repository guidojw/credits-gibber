import { Client as DiscordClient, Intents } from 'discord.js'
import type { BaseCommand } from '../commands/index.js'
import type BaseHandler from './base.js'
import type { ClientEvents } from 'discord.js'
import { constants } from '../util/index.js'
import container from '../configs/container.js'
import getDecorators from 'inversify-inject-decorators'

const { TYPES } = constants
// FIXME: why do we need to index default here?
const { lazyInject } = getDecorators.default(container)

export default class CreditsGibberClient extends DiscordClient {
  @lazyInject(TYPES.CommandFactory)
  public readonly commandFactory!: (commandName: string) => BaseCommand

  @lazyInject(TYPES.EventHandlerFactory)
  private readonly eventHandlerFactory!: (eventName: string) => BaseHandler

  public constructor () {
    super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

    this.once('ready', this.ready.bind(this))
  }

  private ready (): void {
    this.bindEvent('interactionCreate')
    this.bindEvent('messageCreate')

    console.log(`Ready to serve on ${this.guilds.cache.size} servers, for ${this.users.cache.size} users.`)
  }

  private bindEvent (eventName: keyof Pick<ClientEvents, 'interactionCreate' | 'messageCreate'>): void {
    const handler = this.eventHandlerFactory(eventName)
    this.on(eventName, handler.handle.bind(handler, this))
  }
}
