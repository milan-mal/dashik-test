import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import 'dotenv/config'

import TestAnswer from '../models/testAnswer.js'
import User from '../models/user.js'
import logger from '../utils/logger.js'

// Verifies auth token from Cookies. Returns User object or null.
async function verify(authToken) {
  const client = new OAuth2Client()
  const ticket = await client.verifyIdToken({
    idToken: authToken,
    audience: process.env.GOOGLE_SIGN_IN_ID,
  })
    .catch(error => {
      logger.error('Error while verifying token', error)
      return null
    })
  const payload = ticket.getPayload()
  const userId = payload['sub']
  const existingUser = await User.findOne({ userId: userId })
  if (existingUser) {
    logger.info(`User "${userId}" exist in the database.`)
    return existingUser
  } else {
    logger.info(`User "${userId}" does not exist in the database.`)
    return null
  }
}

const testAnswerRouter = express.Router()

testAnswerRouter.get('/', async (req, res) => {
  const testAnswers = await TestAnswer
    .find({})
    .populate('user', { userId: 1, userFullName: 1 })
  res.status(200).json(testAnswers)
})

testAnswerRouter.post('/', async (req, res) => {
  const currentUser = await verify(req.cookies.auth_token)

  if(!currentUser) {
    res.status(404).end()
  }
  const userSystemId = currentUser._id
  logger.info('userSystemId', userSystemId)

  const testAnswer = new TestAnswer({
    testId: req.body.testId,
    selectedAnswers: req.body.selectedAnswers,
    user: userSystemId,
  })
  const savedTestAnswer = await testAnswer.save()
  await User.findByIdAndUpdate(userSystemId, {
    $push: { testAnswers: savedTestAnswer._id }
  })

  res.status(201).json(savedTestAnswer)
})

export default testAnswerRouter