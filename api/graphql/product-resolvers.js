const Product = require("../models/products");

const resolvers = {
  productQuery: {
    products: async () => {
      console.log("productss");
      try {
        return await Product.find({});
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
  productMutation: {
    getCartProducts: async (_, args) => {
      const { cartList_temp } = args;
      const cartList = JSON.parse(cartList_temp);

      return cartList;
    },
  },
};

module.exports = resolvers;
