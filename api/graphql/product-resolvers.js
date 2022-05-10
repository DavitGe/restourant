const Product = require('../models/products')

const resolvers = {
  productQuery: {
    products: async () => await Product.find({}),
  },
  productMutation: {
    getCartProducts: async (_, args) => {
      const { cartList_temp } = args
      const cartList = JSON.parse(cartList_temp)

      return cartList
    },
  },
}

module.exports = resolvers
