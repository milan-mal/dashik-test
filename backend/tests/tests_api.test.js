import supertest from 'supertest'
import mongoose from 'mongoose'
import helper from './test_helper.js'
import app from '../app.js'
import Test from '../models/test.js'

const api = supertest(app)

beforeEach(async() => {
  await Test.deleteMany({})
  await Test.insertMany(helper.initialTests)
})

test('tests are returned as json', async () => {
  await api
    .get('api/tests')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})