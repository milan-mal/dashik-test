import express, { response } from 'express';
const testRouter = express.Router();

import Test from '../models/test.js'

testRouter.get('/', (req, res) => {
  res.status(200).send('Hello World from Dashik!')
})

export default testRouter