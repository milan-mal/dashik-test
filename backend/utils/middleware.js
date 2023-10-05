import logger from './logger.js'

const requestLogger = (request, response, next) => {
  logger.info('Method:    ', request.method)
  logger.info('Path:      ', request.path)
  // logger.info('Req. body: ', request.body)
  logger.info('---')
  next()
}

export default {
  requestLogger
}