import type Client from '../client'

type BaseEventHandler = (client: Client, ...args: any[]) => any

export default BaseEventHandler
