import React from 'react'
import styled from 'styled-components'

import {
  Container,
  Title,
  Text,
  Button,
  SectionText,
} from '../styles/StyledComponents'

import aboutImg from '../images/aboutUs/Mask Group.png'
import aboutBG from '../images/aboutUs/bg.png'

const AboutBG = styled.img`
  position: absolute;
  z-index: 0;
  left: 0;
  @media (max-width: 440px) {
    display: none;
  }
`
const AboutImage = styled.img`
  z-index: 1;
  @media (max-width: 1256px) {
    margin-right: 8px;
    height: 407px;
  }
  @media (max-width: 1011px) {
    display: none;
  } ;
`

const Container1 = styled(Container)`
  align-items: 'flex-start';
  @media (max-width: 1011px) {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`
const About = () => {
  return (
    <Container id="about">
      <AboutBG src={aboutBG} alt="" />
      <Container
        row
        style={{
          paddingTop: 124,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <AboutImage src={aboutImg} alt="" />
        <Container1 column>
          <SectionText>ABOUT US</SectionText>
          <Title style={{ maxWidth: 470, marginLeft: 4, marginRight: 4 }}>
            Food Stalls with Persons but to Product marketing plane catlogues
            etc to.
          </Title>
          <Text
            style={{
              maxWidth: 470,
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 4,
              marginRight: 4,
            }}
          >
            There are many things are needed to start the Fast Food Business.
            You need not only Just Food Stalls with Persons but also equipment
            make your marketing plane Effective.
          </Text>
          <Button style={{ width: 140 }}>Read More</Button>
        </Container1>
      </Container>
    </Container>
  )
}

export default About
