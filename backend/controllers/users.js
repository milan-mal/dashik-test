import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.js'
import logger from '../utils/logger.js'

const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const credential = req.body.credential
  console.log('credential', credential)

  const client = new OAuth2Client()

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: '345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com',
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
      res.status(201).json(savedUser)
      // TODO: remove the following - only for debugging purposes
      await User.deleteOne({ userId: userId })

    } else {
      logger.info('User already exists.')
    }
  }

  verify().catch(error => {
    logger.error(error)
    res.status(500).send('Internal Server Error')
  })

})

export default userRouter