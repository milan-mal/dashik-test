import express from 'express'
const app = express()
import middleware from './utils/middleware.js'
// import logger from './utils/logger.js'

app.use(middleware.requestLogger)

export default app