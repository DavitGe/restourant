const mongoose = require('mongoose')
// const { isEmail } = require('validator')
const validate = require('mongoose-validator')

const usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 28],
    message: 'Username should be between 3 and 28 characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Username should contain alpha-numeric characters only.',
  }),
]

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    // validate: [isEmail, 'Please fill a valid email address'],
  },
  username: {
    type: String,
    unique: true,
    required: true,
    // minlength: 5,
    validate: usernameValidator,
  },
  password: {
    type: String,
    required: true,
    // minlength: 5,
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  restoreLink: { type: String },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})

module.exports = mongoose.model('User', userSchema)
