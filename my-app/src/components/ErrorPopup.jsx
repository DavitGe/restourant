import React, { useState } from 'react'
import {
  Container,
  ModalContainer,
  Title,
  Button,
  Text,
} from '../styles/StyledComponents'
const ErrorPopup = ({ errorMessage }) => {
  const [active, setActive] = useState(true)
  const error = errorMessage ? errorMessage : 'Unexpected error'
  if (active) {
    return (
      <ModalContainer
        onClick={() => {
          setActive(false)
        }}
      >
        <Container
          column
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            width: 700,
            borderRadius: 10,
            paddingBottom: 24,
            paddingTop: 24,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Title style={{ marginBottom: 12 }}>
            Oops! Something gone wrong.
          </Title>
          <Text style={{ marginBottom: 32 }}>{error}</Text>
          <Button
            onClick={() => {
              setActive(false)
            }}
          >
            Okay
          </Button>
        </Container>
      </ModalContainer>
    )
  } else {
    return null
  }
}

export default ErrorPopup
