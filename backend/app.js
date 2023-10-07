import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'

import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import config from './utils/config.js'
import testRouter from './controllers/tests.js'

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/tests', testRouter)

app.use(middleware.requestLogger)

export default app