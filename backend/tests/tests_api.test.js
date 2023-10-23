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

describe('Adding a test:', () => {
  test('succeeds with valid data', async () => {
    const newTest = [
      {
        testName: 'Second test',
        questions: [
          {
            questionId: 1,
            questionDescription: 'Question description 1.',
            answers: [
              {
                answerId: 1,
                answerName: 'Answer name 1',
                answerDescription: 'Answer description 1.'
              },
              {
                answerId: 2,
                answerName: 'Answer name 2',
                answerDescription: 'Answer description 2.'
              },
              {
                answerId: 3,
                answerName: 'Answer name 3',
                answerDescription: 'Answer description 3.'
              },
              {
                answerId: 4,
                answerName: 'Answer name 4',
                answerDescription: 'Answer description 4.'
              },
            ]
          },
          {
            questionName: 'Question name 2',
            questionDescription: 'Question description 2.',
            answers: [
              {
                answerId: 1,
                answerName: 'Answer name 1',
                answerDescription: 'Answer description 1.'
              },
              {
                answerId: 2,
                answerName: 'Answer name 2',
                answerDescription: 'Answer description 2.'
              },
              {
                answerId: 3,
                answerName: 'Answer name 3',
                answerDescription: 'Answer description 3.'
              },
              {
                answerId: 4,
                answerName: 'Answer name 4',
                answerDescription: 'Answer description 4.'
              },
            ]
          },
        ]
      }
    ]  
  })

  test('fails with invalid data', async () => {
    await api
      .post('/api/tests')
      .send(newTest)
      .expect(400)
    
      const testsAtEnd = await helper.testsInDb()
      expect(testsAtEnd).toHaveLength( helper.initialTests.length )
  })
})

describe('Getting one specific test:', () => {
  test('succeeds with a valid id', async () => {
    
  })
})