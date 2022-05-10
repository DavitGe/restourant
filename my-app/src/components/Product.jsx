import React from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import {
  Container,
  ProductTitle,
  Text,
  Button,
  colors,
} from '../styles/StyledComponents'

const ProductImg = styled.img`
  border-radius: 76px 10px 76px 0px;
  transition: ease-in-out 0.4s;
  &:hover {
    transform: scale(1.07);
  }
`

const infoContainerStyles = {
  justifyContent: 'space-between',
  width: '100%',
  paddingLeft: 25,
  paddingRight: 25,
}

const ContainerStyles = {
  border: '1px solid rgba(0, 0, 0, 0.1)',
  maxWidth: 360,
  borderRadius: '76px 10px 10px 10px',
  marginBottom: 30,
}

const buttonStyles = {
  fontSize: 24,
  padding: 12,
  height: 36,
  display: 'flex',
  alignItems: 'center',
}
// const imgContainerStyles = {
//   overflow: 'hidden',
//   borderRadius: '76px 10px 76px 0px',
//   // backgroundColor: '#000000',
// }
const ProductImgContainer = styled.div`
  cursor: pointer;
  display: flex;
  overflow: hidden;
  border-radius: 76px 10px 76px 0;
  transition: ease-in-out 0.3s;
  &:hover {
    opacity: 0.6;
  }
`
const ProductImgBg = styled.div`
  cursor: pointer;
  display: flex;
  overflow: hidden;
  border-radius: 76px 10px 76px 0;
  position: relative;
  background-color: #000;
  transition: ease-in-out 0.3s;
  &:hover {
    &:after {
      content: 'Order Now';
      pointer-events: none;
      font-family: 'Roboto', 'sans-serif';
      font-weight: 500;
      color: #fff;
      opacity: 1;
      font-size: 28px;
      position: absolute;
      z-index: 999;
      top: 50%;
      left: 50%;
      margin-left: -66px;
      margin-top: -17px;
    }
  }
`

const Product = ({ product, setCartList }) => {
  const addInCart = () => {
    const cartList = JSON.parse(localStorage.getItem('cart'))
    if (cartList) {
      const candidate = cartList.find((e) => e.id === product._id)
      if (candidate) {
        const result = cartList.map((e) => {
          if (e === candidate) {
            e.count += 1
            return e
          } else {
            return e
          }
        })
        // localStorage.setItem('cart', JSON.stringify(result))
        setCartList(result)
      } else {
        const result = [
          ...cartList,
          {
            id: product._id,
            image: product.image,
            title: product.title,
            description: product.description,
            price: product.price,
            count: 1,
          },
        ]
        // localStorage.setItem('cart', JSON.stringify(result))
        setCartList(result)
      }
    } else {
      const result = [
        {
          id: product._id,
          image: product.image,
          title: product.title,
          description: product.description,
          price: product.price,
          count: 1,
        },
      ]
      // localStorage.setItem('cart', JSON.stringify(result))
      setCartList(result)
    }
  }
  const stars = Array(5).fill(0)
  return (
    <Container column style={ContainerStyles}>
      <ProductImgBg onClick={addInCart}>
        <ProductImgContainer>
          <ProductImg src={product.image} alt={product.title} />
        </ProductImgContainer>
      </ProductImgBg>
      <Container style={{ ...infoContainerStyles, paddingTop: 25 }}>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductTitle>{product.price}</ProductTitle>
      </Container>
      <Text style={{ padding: '20px 25px 20px 25px' }}>
        {product.description}
      </Text>
      <Container
        row
        style={{ ...infoContainerStyles, padding: '0 25px 25px 25px' }}
      >
        <Button style={buttonStyles} onClick={addInCart}>
          +
        </Button>
        <Container row style={{ margin: 0 }}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={16}
                style={{ marginLeft: 2 }}
                color={product.stars > index ? colors.main : colors.starDef}
              />
            )
          })}
        </Container>
      </Container>
    </Container>
  )
}

export default Product
