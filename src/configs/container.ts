import * as commands from '../commands/index.js'
import type { BaseCommand } from '../commands/index.js'
import type { BaseHandler } from '../client/index.js'
import { Container } from 'inversify'
import { constants } from '../util/index.js'
import { eventHandlers } from '../client/index.js'
import type { interfaces } from 'inversify'

const { TYPES } = constants

const container = new Container()
const bind = container.bind.bind(container)

// Event Handlers
bind<BaseHandler>(TYPES.Handler).to(eventHandlers.InteractionCreateHandler)
  .whenTargetTagged('eventHandler', 'interactionCreate')
bind<BaseHandler>(TYPES.Handler).to(eventHandlers.MessageCreateHandler)
  .whenTargetTagged('eventHandler', 'messageCreate')

bind<interfaces.Factory<BaseHandler>>(TYPES.EventHandlerFactory).toFactory<BaseHandler, [string]>(
  (context: interfaces.Context) => {
    return (eventName: string) => {
      return context.container.getTagged<BaseHandler>(TYPES.Handler, 'eventHandler', eventName)
    }
  }
)

// Commands
bind<BaseCommand>(TYPES.Command).to(commands.CreditsCommand)
  .whenTargetTagged('command', 'credits')
bind<BaseCommand>(TYPES.Command).to(commands.PermissionsCommand)
  .whenTargetTagged('command', 'permissions')
bind<BaseCommand>(TYPES.Command).to(commands.TrainsCommand)
  .whenTargetTagged('command', 'trains')

bind<interfaces.Factory<BaseCommand>>(TYPES.CommandFactory).toFactory<BaseCommand, [string]>(
  (context: interfaces.Context) => {
    return (commandName: string) => {
      return context.container.getTagged<BaseCommand>(TYPES.Command, 'command', commandName)
    }
  }
)

export default container
