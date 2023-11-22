import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'

import config from './utils/config.js'
import logger from './utils/logger.js'
import testRouter from './controllers/tests.js'
import userRouter from './controllers/users.js'
import middleware from './utils/middleware.js'

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
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app