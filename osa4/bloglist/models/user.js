const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User