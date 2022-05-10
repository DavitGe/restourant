import React from 'react'
import styled from 'styled-components'
import HomeBG from '../images/homeBG.png'
import { Link } from 'react-router-dom'
import {
  Container,
  MainTitle,
  Text,
  ButtonNL,
  colors,
} from '../styles/StyledComponents'

const StyleBG = styled.img`
  position: absolute;
  right: 0;
  margin-right: -150px;
  margin-top: -48px;
  z-index: 0;
  /* max-width: 100%; */
  @media (max-width: 1439px) {
    position: static;
    max-width: 700px;
    margin-top: 20px;
    margin: 0;
  }
  @media (max-width: 1256px) {
    position: relative;
    left: -20px;
  }
  @media (max-width: 1011px) {
    display: none;
  } ;
`
const ImgContainer = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 1439px) {
    overflow: hidden;
    align-self: end;
    margin-bottom: -72px;
  }
`
const Container1 = styled(Container)`
  z-index: 1;
  margin-left: 0;
  margin-top: 160px;
  @media (max-width: 1011px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 64px;
  }
`
const Home = () => {
  return (
    <Container id="home">
      <Container1 column>
        <MainTitle>
          Making time a good time
          <br />
          by making food the good
          <br />
          food.
        </MainTitle>
        <Text
          style={{
            marginTop: 42,
            maxWidth: 476,
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          There are many things are needed to start the Fast Food Business. You
          need not only Just Food Stalls with Persons but also specialized
          equipment,
        </Text>
        <Container1 style={{ marginLeft: 0, marginTop: 50 }}>
          <Link
            to={'/products'}
            style={{ textDecoration: 'none', color: '#FFFFFF' }}
          >
            <ButtonNL style={{ marginRight: 30 }}>Order Now</ButtonNL>
          </Link>
          <Link
            to={'/products'}
            style={{ textDecoration: 'none', color: colors.main }}
          >
            <ButtonNL reverse>Food Details</ButtonNL>
          </Link>
        </Container1>
      </Container1>
      <ImgContainer>
        <StyleBG src={HomeBG} alt="" />
      </ImgContainer>
    </Container>
  )
}

export default Home
