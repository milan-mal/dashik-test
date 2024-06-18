import express from 'express'
import jwt from 'jsonwebtoken'
import TestAnswer from '../models/testAnswer.js'

const testAnswerRouter = express.Router()

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

testAnswerRouter.get('/', async (req, res) => {
  const testAnswers = await TestAnswer
    .find({})
    .populate('user', { userId: 1, userFullName: 1 })
  res.status(200).json(testAnswers)
})

testAnswerRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  //TODO finish posting
})

export default testAnswerRouter