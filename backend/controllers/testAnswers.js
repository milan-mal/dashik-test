import express from 'express'
import { OAuth2Client } from 'google-auth-library'

import TestAnswer from '../models/testAnswer.js'
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
  async function verify() {
    const ticket = await authClient.verifyIdToken({
      idToken: getTokenFrom(req),
      //TODO: change audience to env variable
      audience: '345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com',
    }).catch(error => {
      logger.error(error)
    })
    // const userId = ticket.getUserId()
    // if (!userId) {
    //   return res.status(401).json({ error: 'token invalid' })
    // } else {
    //   return res.status(201).json({ userId: userId })
    // }
  }
  verify()
  //TODO: finish posting
})

export default testAnswerRouter