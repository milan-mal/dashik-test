import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  testId: {
    type: Number,
    required: true

  },
  testName: {
    type: String,
    required: true
  },
  textsToRead: [
    {
      textId: Number,
      textToRead: String
    }
  ],
  questions: [
    {
      questionId: {
        type: Number,
        required: true
      },
      questionName: {
        type: String,
        required: true
      },
      questionDescription: String,
      answers: [
        {
          answerId: Number,
          answerName: String,
          answerDescription: String
        },
      ]
    }
  ]
})

testSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Test', testSchema)