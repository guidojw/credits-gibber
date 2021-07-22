import { AsyncContainerModule, Container } from 'inversify'
import { CreditsCommand, PermissionsCommand } from '../commands'
import CreditsGibberClient from '../client/client'
import { InitializeAsync } from '@mfd/rbxdatastoreservice'
import applicationConfig from '../configs/application'
import { constants } from '../util'

const { TYPES } = constants

export default async function init (): Promise<Container> {
  const container = new Container()

  const bindings = new AsyncContainerModule(async bind => {
    // Commands
    bind<CreditsCommand>('credits').to(CreditsCommand)
    bind<PermissionsCommand>('permissions').to(PermissionsCommand)

    // Client
    const creditsGibberClient = new CreditsGibberClient(container)
    await creditsGibberClient.login()
    console.log('Discord client logged in!')
    bind<CreditsGibberClient>(TYPES.CreditsGibberClient).toConstantValue(creditsGibberClient)

    // DataStoreService
    await InitializeAsync(process.env.ROBLOX_COOKIE as string, applicationConfig.placeId)
    console.log('DataStoreService initialized!')
  })
  await container.loadAsync(bindings)

  return container
}
