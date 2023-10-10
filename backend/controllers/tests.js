import express from 'express';
import Test from '../models/test.js'

const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
  const tests = await Test.find({})
  res.status(200).json(tests)
})

export default testRouter