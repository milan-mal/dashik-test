import logger from './logger.js'

const requestLogger = (req, res, next) => {
  logger.info('Method:    ', req.method)
  logger.info('Path:      ', req.path)
  logger.info('Req. body: ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if ( error.name === 'CastError' ){
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
}