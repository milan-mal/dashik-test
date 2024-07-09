import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import 'dotenv/config'

import Test from '../models/test.js'
import User from '../models/user.js'
import logger from '../utils/logger.js'

async function verify(authToken) {
  const client = new OAuth2Client()
  const ticket = await client.verifyIdToken({
    idToken: authToken,
    audience: process.env.GOOGLE_SIGN_IN_ID,
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

const testRouter = express.Router()

testRouter.get('/', async (req, res) => {
  const tests = await Test.find({})
  res.status(200).json(tests)
})

testRouter.get('/:id', async (req, res, next) =>  {
  const currentUser = await verify(req.cookies.auth_token)

  if (currentUser) {
    await Test.findById(req.params.id)
      .then((test) => {
        if( test ){
          res.json(test)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
  } else {
    res.status(401).end()
  }
})

export default testRouter