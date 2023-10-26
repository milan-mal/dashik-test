import Test from '../models/test.js'

const initialTests = [
  {
    testName: 'First test',
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

const testToBeRemoved = {
    testName: 'Test to be removed',
    questions: [
      {
        questionId: 1,
        questionName: 'Question name 1',
      },
    ]
  }

const testsInDb = async () => {
  const tests = await Test.find({})
  return tests.map(test => test.toJSON())
}

const invalidIdTest = async () => {
  const test = new Test(testToBeRemoved)
  await test.save()
  await test.deleteOne()
  return test._id.toString()
}

export default {
  initialTests,
  testsInDb,
  invalidIdTest
}