import express from 'express';
import Test from '../models/test.js'

const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
  const tests = await Test.find({})
  res.status(200).json(tests)
})

testRouter.get('/:id', async (req, res) =>  {
  const test = await Test.findById(req.params.id)
    .then(() => res.json(test))
    .catch((error) => { // TODO: clean up error handling
      if ( error.name === 'CastError' ){
        return res.status(400).send({ error: 'malformatted id' })
      } else {
        logger.error(error.message)
      }
    })
  // if( test ){
  //   res.json(test)
  // } else {
  //   res.status(404).end()
  // }
})

export default testRouter