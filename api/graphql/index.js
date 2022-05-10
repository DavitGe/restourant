const { userQuery, userMutation } = require('./user-resolvers')
const { productQuery, productMutation } = require('./product-resolvers')
const resolvers = {
  Query: {
    ...productQuery,
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
    ...productMutation,
  },
}

module.exports = resolvers
