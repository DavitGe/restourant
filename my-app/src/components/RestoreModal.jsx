import React, { useState } from 'react'
import {
  Container,
  ErrorText,
  Input,
  ModalContainer,
  Title,
  Button,
} from '../styles/StyledComponents'

import { useMutation } from '@apollo/client'
import { SEND_RES_LINK } from '../graphql/mutation'

const Restore = ({ active, setActive }) => {
  const [successActive, setSuccessActive] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)

  const [SendResLink] = useMutation(SEND_RES_LINK)
  const setDefaults = () => {
    setSuccessActive(false)
    setEmail('')
    setEmailError('')
    setLoading(false)
  }
  const restoreHandler = async () => {
    setEmailError('')
    if (email === '') {
      setEmailError('Email should not be empty')
    } else {
      try {
        setLoading(true)
        await SendResLink({ variables: { email } })
        setLoading(false)
        setSuccessActive(true)
      } catch (e) {
        setLoading(false)
        setEmailError('User with such email is not found')
      }
    }
  }

  if (successActive) {
    return (
      <ModalContainer
        onClick={() => {
          setDefaults()
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
            paddingBottom: 64,
            paddingTop: 64,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Title style={{ marginBottom: 48 }}>Message is sent to email</Title>
          <Button
            onClick={() => {
              setDefaults()
              setActive(false)
              setSuccessActive(false)
            }}
          >
            Okay
          </Button>
        </Container>
      </ModalContainer>
    )
  }
  if (active) {
    return (
      <ModalContainer
        onClick={() => {
          setDefaults()
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
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Title style={{ marginBottom: 24, marginTop: 32 }}>
            Enter your email
          </Title>
          <Container column style={{ width: '90%', marginBottom: 12 }}>
            <Input
              placeholder="Email..."
              style={{ height: 48 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorText>{emailError}</ErrorText>
          </Container>
          <Container
            row
            style={{ width: '90%', justifyContent: 'space-between' }}
          >
            <Button
              reverse
              style={{ margin: '24px 0 32px 0' }}
              onClick={() => {
                setDefaults()
                setActive(false)
              }}
            >
              Cancel
            </Button>

            <Button
              style={{ margin: '24px 0 32px 0' }}
              onClick={async () => {
                await restoreHandler()
              }}
            >
              {loading ? 'Loading...' : 'Restore'}
            </Button>
          </Container>
        </Container>
      </ModalContainer>
    )
  } else {
    return null
  }
}

export default Restore
