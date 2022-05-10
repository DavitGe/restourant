import React from 'react'
import {
  Button,
  Container,
  SectionText,
  Title,
  Input,
} from '../styles/StyledComponents'
import styled from 'styled-components'

const Container1 = styled(Container)`
  max-width: 749px;
  min-width: 600px;
  @media (max-width: 612px) {
    max-width: 600px;
    min-width: 400px;
  }
  @media (max-width: 410px) {
    max-width: 400px;
    min-width: 230px;
  }
`
const Contact = () => {
  return (
    <Container
      column
      style={{ marginTop: 100, marginBottom: 70, alignItems: 'center' }}
      id="contact"
    >
      <SectionText>CONTACT</SectionText>
      <Title style={{ maxWidth: 749, textAlign: 'center', marginBottom: 46 }}>
        Food Stalls with Persons but also specialized equipment, Skills to
        manage.
      </Title>
      <Container1 row>
        <Input
          placeholder="Enter your message"
          style={{ borderRadius: '10px 0 0 10px' }}
        />
        <Button style={{ borderRadius: '0 10px 10px 0' }}>Send</Button>
      </Container1>
    </Container>
  )
}

export default Contact
