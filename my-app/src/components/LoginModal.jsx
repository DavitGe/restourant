import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'

import { AUTHORIZATION, ISAUTH } from '../graphql/mutation'
import {
  Container,
  ModalContainer,
  Title,
  Input,
  Button,
  ErrorText,
  colors,
} from '../styles/StyledComponents'

const LoginLink = styled.a`
  color: ${colors.main};
  text-decoration: underline;
  opacity: 0.7;
  margin-top: 8px;
  cursor: pointer;
`

const Login = ({
  active,
  setActive,
  setActiveRegister,
  isAuth,
  setIsAuth,
  activeRegister,
  setActiveRestore,
}) => {
  const [Authorization] = useMutation(AUTHORIZATION)
  const [IsAuth] = useMutation(ISAUTH)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessages, setErrorMessages] = useState({
    usernameError: '',
    passwordError: '',
  })
  //eslint-disable-next-line
  {
    //eslint-disable-next-line
    useEffect(async () => {
      //eslint-disable-next-line
      const { data, error } = await IsAuth()
      if (error) {
        setIsAuth(false)
      } else {
        setIsAuth(data.checkAuth)
      }
      //eslint-disable-next-line
    }, [active, activeRegister])
  }

  const loginHandler = async (username, password) => {
    try {
      setErrorMessages({ usernameError: '', passwordError: '' })
      if (username === '') {
        setErrorMessages({
          ...errorMessages,
          usernameError: 'Username field is empty',
        })
        return
      }

      const { data } = await Authorization({
        variables: { username, password },
      })
      if (data) {
        localStorage.setItem('token', data.login.activeToken)
        setUsername('')
        setPassword('')
        setActive(false)
      }
    } catch (e) {
      if (e.message.includes('Unexpected error: Unexpected error: ')) {
        const error = e.message.slice(36)
        if (error.toLowerCase().includes('username')) {
          setErrorMessages({ ...errorMessages, usernameError: error })
        }
        if (error.toLowerCase().includes('password')) {
          setErrorMessages({ ...errorMessages, passwordError: error })
          setPassword('')
        }
      } else if (
        e.message.toLowerCase().includes('username') ||
        e.message.toLowerCase().includes('password')
      ) {
        if (e.message.toLowerCase().includes('username')) {
          setErrorMessages({ ...errorMessages, usernameError: e.message })
        }
        if (e.message.toLowerCase().includes('password')) {
          setErrorMessages({ ...errorMessages, passwordError: e.message })
          setPassword('')
        }
      } else {
        setUsername('')
        setPassword('')
        return (
          <ModalContainer
            onClick={() => {
              setPassword('')
              setUsername('')
              setErrorMessages({ usernameError: '', passwordError: '' })
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
              <Title>Something gone wrong!</Title>
              <Button onCluck={() => setActive(false)}>Okay</Button>
            </Container>
          </ModalContainer>
        )
      }
    }
  }

  if (active) {
    if (!isAuth) {
      return (
        <ModalContainer
          onClick={() => {
            setPassword('')
            setUsername('')
            setErrorMessages({ usernameError: '', passwordError: '' })
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
            <Title style={{ marginBottom: 24, marginTop: 32 }}>Log in:</Title>

            <Container column style={{ width: '90%', marginBottom: 12 }}>
              <Input
                placeholder="Username..."
                style={{ height: 48 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ErrorText>{errorMessages.usernameError}</ErrorText>
            </Container>
            <Container column style={{ width: '90%' }}>
              <Input
                placeholder="Password..."
                style={{ height: 48 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ErrorText>{errorMessages.passwordError}</ErrorText>
            </Container>
            <Container
              row
              style={{ justifyContent: 'space-between', width: '90%' }}
            >
              <LoginLink
                onClick={() => {
                  setActive(false)
                  setActiveRestore(true)
                }}
              >
                Forgot password?
              </LoginLink>
              <LoginLink
                onClick={() => {
                  setPassword('')
                  setUsername('')
                  setErrorMessages({ usernameError: '', passwordError: '' })
                  setActive(false)
                  setActiveRegister(true)
                }}
              >
                Haven&#39;t got account yet?
              </LoginLink>
            </Container>
            <Container
              row
              style={{ width: '90%', justifyContent: 'space-between' }}
            >
              <Button
                reverse
                style={{ margin: '24px 0 32px 0' }}
                onClick={() => {
                  setUsername('')
                  setPassword('')
                  setErrorMessages({ usernameError: '', passwordError: '' })
                  setActive(false)
                }}
              >
                Cancel
              </Button>
              <Button
                style={{ margin: '24px 0 32px 0' }}
                onClick={() => loginHandler(username, password)}
              >
                Log In
              </Button>
            </Container>
          </Container>
        </ModalContainer>
      )
    } else {
      return (
        <ModalContainer
          onClick={() => {
            setPassword('')
            setUsername('')
            setErrorMessages({ usernameError: '', passwordError: '' })
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
              User is authorized already
            </Title>
            <Button
              onClick={() => {
                setUsername('')
                setPassword('')
                setActive(false)
              }}
              style={{ marginBottom: 32 }}
            >
              Okay
            </Button>
          </Container>
        </ModalContainer>
      )
    }
  } else {
    return null
  }
}

export default Login
