import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  testName: String,
  questions: [
    { 
      questionId: Number,
      questionName: String,
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

export default testSchema