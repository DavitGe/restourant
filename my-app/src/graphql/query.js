import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      title
      description
      price
      stars
      image
      categories
      _id
    }
  }
`
