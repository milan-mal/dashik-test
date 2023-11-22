import express from 'express'
const jwt = require('jsonwebtoken')
import TestAnswer from '../models/testAnswer.js'

const testAnswerRouter = express.Router()

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

testAnswerRouter.post('/', async (req, res) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  //TODO finish posting
})

export default testAnswerRouter