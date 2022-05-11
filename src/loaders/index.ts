import { CreditsGibberClient } from '../client/index.js'

export async function init (): Promise<CreditsGibberClient> {
  const client = new CreditsGibberClient()
  await client.login(process.env.DISCORD_TOKEN)

  return client
}
