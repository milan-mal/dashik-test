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

describe('Checking initial tests:', () => {
  test('tests are returned as json', async () => {
    await api
      .get('/api/tests')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all initial tests are returned', async () => {
    const response = await api.get('/api/tests')
    expect(response.body).toHaveLength(helper.initialTests.length)
  })
})
