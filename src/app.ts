import 'reflect-metadata'
import * as loaders from './loaders/index.js'
import dotenv from 'dotenv'

dotenv.config()

export default loaders.init()
