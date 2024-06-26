import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userFullName: {
    type: String,
    required: true,
  },
  userGivenName: String,
  userFamilyName: String,
  userEmail: {
    type: String,
    required: true,
  },
  testAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestAnswer'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)