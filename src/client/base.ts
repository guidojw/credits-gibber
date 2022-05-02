import type Client from './client.js'

export default interface BaseHandler {
  handle: (client: Client, ...args: any[]) => void | Promise<void>
}
