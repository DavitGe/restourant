import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  SectionText,
  Title,
  Text,
  ButtonNL,
  colors,
} from '../styles/StyledComponents'
import Product from './Product'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/query'

const Menu = (props) => {
  const query = useQuery(GET_PRODUCTS)
  if (query.loading) {
    return null
  }
  const { data } = query
  const { count } = props
  const products = data.products
  return (
    <Container
      column
      style={{ alignItems: 'center', marginTop: 115 }}
      id="menu"
    >
      <SectionText>MENU</SectionText>
      <Title>Food Full of treaty Love</Title>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 25,
          marginBottom: 60,
        }}
      >
        There are many things are needed to start the Fast Food Business. You
        need not only Just Food Stalls with Persons but also specialized
        equipment, Skills to manage Customers.
      </Text>
      <Container style={{ flexWrap: 'wrap' }}>
        {products.slice(0, count).map((product) => {
          return (
            <Product
              product={product}
              key={product._id}
              setCartList={props.setCartList}
            />
          )
        })}
      </Container>
      <Link
        to={'/products'}
        style={{ textDecoration: 'none', color: colors.main }}
      >
        <ButtonNL reverse>Learn More</ButtonNL>
      </Link>
    </Container>
  )
}

export default Menu
