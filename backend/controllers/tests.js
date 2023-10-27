import express from 'express';
import Test from '../models/test.js'

const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
  const tests = await Test.find({})
  res.status(200).json(tests)
})

testRouter.get('/:id', async (req, res, next) =>  {
  await Test.findById(req.params.id)
    .then((test) => {
      if( test ){
        res.json(test)
      } else {
        res.status(404).end()
      }
    })
    .catch( error => next(error))
})

export default testRouter