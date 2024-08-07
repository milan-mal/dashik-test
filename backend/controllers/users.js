import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import 'dotenv/config'

import User from '../models/user.js'
import logger from '../utils/logger.js'

const userRouter = express.Router()
userRouter.use(express.urlencoded({ extended: true }))

const getDomain = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.PRODUCTION_DOMAIN
  }
  // For development, return null to allow the cookie to be set on localhost
  return null
}

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('testAnswers')
  res.status(200).json(users)
})

userRouter.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
    .populate('testAnswers', { testId: 1 })
  if(user) {
    res.status(200).json(user)
  } else {
    res.status(404).send('User not found')
  }
})

userRouter.post('/', async (req, res) => {
  const credential = req.body.credential
  const client = new OAuth2Client()

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_SIGN_IN_ID,
    })
    const payload = ticket.getPayload()

    const userId = payload['sub']
    const userFullName = payload['name']
    const userEmail = payload['email']
    const userGivenName = payload['given_name']
    const userFamilyName = payload['family_name']

    logger.info(`User "${userFullName}" is logging in.`)
    const existingUser = await User.findOne({ userId: userId })

    if ( !existingUser ) {
      logger.info('Creating a new user.')
      const user = new User({
        userId,
        userFullName,
        userGivenName,
        userFamilyName,
        userEmail
      })
      const savedUser = await user.save()
      // TODO: setup Prod incl. .env
      res.cookie(
        'auth_token', credential, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 3600000, // 1 hour
          path: '/',
          domain: getDomain()
        }
      )
      res.status(201).json(savedUser)
      //TODO: remove the following - only for debugging purposes
      // await User.deleteOne({ userId: userId })
      // logger.info('User removed')
    } else {
      logger.info('User already exists')
    }
  }

  verify().catch(error => {
    logger.error(error)
    res.status(500).send('Internal Server Error')
  })

})

//TODO: protect this api for Prod, api-key for the time being
userRouter.delete('/', async (req, res) => {
  const apiKey = req.headers['api-key']
  if(apiKey === process.env.API_KEY) {
    const user = await User.findOneAndDelete({ userEmail: req.body.userEmail })
    if(user) {
      res.status(200).json(user)
      logger.info('User removed')
    } else {
      res.status(404).send('User not found')
    }
  } else {
    res.status(401).send('Unauthorized')
  }
})

export default userRouter