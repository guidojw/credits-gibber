import { Container } from 'inversify'
import containerLoader from './container'

export async function init (): Promise<Container> {
  return await containerLoader()
}
