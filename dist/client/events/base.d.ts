import type Client from '../client';
declare type BaseEventHandler = (client: Client, ...args: any[]) => any;
export default BaseEventHandler;
