import mongoose from 'mongoose'

const testAnswerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  testId: {
    type: Number,
    required: true,
  },
  selectedAnswers: [
    { 
      questionId: Number,
      answerId: Number,
    }
  ]
})

testAnswerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('TestAnswer', testAnswerSchema)