const { gql } = require('apollo-server')

const typeDefs = gql`
  type product {
    title: String!
    description: String!
    price: String!
    stars: Int!
    image: String!
    categories: [String!]!
    _id: ID!
  }
  type user {
    email: String!
    username: String!
    isActivated: Boolean!
    _id: ID!
  }
  type regReturn {
    activeToken: String!
    refreshToken: String
    user: user!
  }
  type CartElement {
    product: product!
    count: Int!
  }
  type Query {
    products: [product!]!
    users: [user!]!
  }
  type Mutation {
    registration(email: String, username: String, password: String): regReturn
    activation(activationLink: String): user
    login(username: String, password: String): regReturn
    resPass(restoreLink: String, password: String): regReturn
    sendResLink(email: String): Boolean
    checkAuth: Boolean
    getCartProducts(cartList: String): [CartElement]
  }
`

module.exports = typeDefs
