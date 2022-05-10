const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  stars: Number,
  image: String,
  categories: [String],
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})

module.exports = mongoose.model('Product', productSchema)
