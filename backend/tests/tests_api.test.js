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
            questionName: 'Question name 1',
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
            questionId: 2,
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
    
    await api
      .post('/api/tests')
      .send(newTest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const testsAtEnd = await helper.testsInDb()
    expect(testsAtEnd).toHaveLength( helper.initialTests.length + 1 )
  })
  
  test('fails with invalid data', async () => {
    const newTest = [
      {
        testName: 'Second test',
        questions: [
          {
            questionId: 1,
            questionName: 'Question name 1',
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
            questionId: 2,
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
    const testsAtStart = await helper.testsInDb()
    const testToView = testsAtStart[0]
    const resultTest = await api
      .get(`/api/tests/${testToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(resultTest.body).toEqual(
      expect.objectContaining({
        testName: testToView.testName
      })
    )

    expect(resultTest.body.questions).toHaveLength( testToView.questions.length )
  })

  test('fails with statuscode 404 if a test does not exist', async () => {
    const validNonexistingId = await helper.invalidIdTest()
    await api
      .get(`/api/tests/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if Id is invalid', async () => {
    const invalidId = '653926ee4594253da332af0'
    await api
      .get(`/api/tests/${invalidId}`)
      .expect(400)
  })
})