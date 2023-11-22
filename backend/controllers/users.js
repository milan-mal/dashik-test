import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.js'

const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
    
userRouter.post('/', async (req, res) => {
  const credential = req.body.credential
  const client = new OAuth2Client()

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: '345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com',
    })
    const payload = ticket.getPayload()
    const userId = payload['sub']
    console.log('userId', userId)
  }
  verify().catch(console.error)

  res.status(204).end()
})

export default userRouter