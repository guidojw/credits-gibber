import { CreditsGibberClient } from '../client'
import { InitializeAsync } from '@mfd/rbxdatastoreservice'
import applicationConfig from '../configs/application'

export async function init (): Promise<CreditsGibberClient> {
  await InitializeAsync(process.env.ROBLOX_COOKIE as string, applicationConfig.placeId)

  const client = new CreditsGibberClient()
  await client.login(process.env.DISCORD_TOKEN)

  return client
}
