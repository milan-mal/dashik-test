import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import 'dotenv/config'

import TestAnswer from '../models/testAnswer.js'
import User from '../models/user.js'
import logger from '../utils/logger.js'

const testAnswerRouter = express.Router()

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization?.startsWith('Bearer ')){
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
  const authClient = new OAuth2Client()
  const ticket = await authClient.verifyIdToken({
    idToken: getTokenFrom(req),
    audience: process.env.GOOGLE_SIGN_IN_ID,
  })
    .catch(error => {
      logger.error(error)
      res.status(401).json({ error: 'token invalid' })
      return
    })

  const userId = ticket.getUserId()
  const user = await User.findOne({ userId: userId })
  logger.info('user', user)
  if(!user) {
    res.status(401).json({ error: 'user not found' })
  }
  const userSystemId = user.id
  logger.info('userSystemId', userSystemId)

  const testAnswer = new TestAnswer({
    testId: req.body.testId,
    selectedAnswers: req.body.selectedAnswers,
    user: userSystemId,
  })

  const savedTestAnswer = await testAnswer.save()
  res.status(201).json(savedTestAnswer)
})

export default testAnswerRouter