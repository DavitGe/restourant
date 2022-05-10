import React from 'react'
import styled from 'styled-components'
import { Container, SectionText, Title, Text } from '../styles/StyledComponents'

import Food from '../images/features/1.png'
import Delivery from '../images/features/2.png'
import Taste from '../images/features/3.png'

const Icon = styled.img`
  width: 88px;
  height: 88px;
`

const Features = () => {
  return (
    <Container
      column
      style={{ alignItems: 'center', marginTop: 100, width: '100%' }}
      id="features"
    >
      <SectionText>FEATURES</SectionText>
      <Title>Food with a New Passion</Title>
      <Container
        row
        style={{
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 44,
          flexWrap: 'wrap',
        }}
      >
        <Container column style={{ alignItems: 'center' }}>
          <Icon src={Food} alt="Quality Food" />
          <Title style={{ fontSize: 25, marginTop: 33, marginBottom: 15 }}>
            Quality Food
          </Title>
          <Text center style={{ width: 300 }}>
            It can be a very secure path to earn good money and make you very
            successful creative entrepreneur.
          </Text>
        </Container>
        <Container column style={{ alignItems: 'center' }}>
          <Icon src={Delivery} alt="Food Delivery" />
          <Title style={{ fontSize: 25, marginTop: 33, marginBottom: 15 }}>
            Food Delivery
          </Title>
          <Text center style={{ width: 300 }}>
            It can be a very secure path to earn good money and make you very
            successful creative entrepreneur.
          </Text>
        </Container>
        <Container column style={{ alignItems: 'center' }}>
          <Icon src={Taste} alt="Super Taste" />
          <Title style={{ fontSize: 25, marginTop: 33, marginBottom: 15 }}>
            Super Taste
          </Title>
          <Text center style={{ width: 300 }}>
            It can be a very secure path to earn good money and make you very
            successful creative entrepreneur.
          </Text>
        </Container>
      </Container>
    </Container>
  )
}

export default Features
