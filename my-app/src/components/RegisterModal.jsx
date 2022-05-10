import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Container,
  ModalContainer,
  Title,
  Input,
  Button,
  ErrorText,
  colors,
} from '../styles/StyledComponents'

import { useMutation } from '@apollo/client'

import { REGISTRATION } from '../graphql/mutation'

const LoginLink = styled.a`
  color: ${colors.main};
  text-decoration: underline;
  opacity: 0.7;
  margin-top: 8px;
  margin-left: 0;
  align-self: flex-start;
  cursor: pointer;
`
const Register = ({ active, setActive, setActiveLogin, setIsAuth, isAuth }) => {
  const errorDefaults = {
    usernameError: '',
    passwordError: '',
    repeatPasswordError: '',
    emailError: '',
  }
  const [Registration, { loading }] = useMutation(REGISTRATION)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState(errorDefaults)

  const handleSumbit = async () => {
    try {
      if (username === '') {
        setErrors({
          ...errors,
          usernameError: 'Username field is empty',
        })
        return
      }
      if (email === '') {
        setErrors({
          ...errors,
          emailError: 'Email field is empty',
        })
        return
      }
      if (password !== repeatPassword) {
        setErrors({ ...errors, repeatPasswordError: "Passwords doesn't match" })
        return
      }
      const { data } = await Registration({
        variables: { username, email, password },
      })
      if (data) {
        localStorage.setItem('token', data.registration.activeToken)
        setActive(false)
      }
    } catch (e) {
      console.error(e)
      if (e.message.includes('Unexpected error: ')) {
        let error = e.message.slice(18)
        if (error.includes('User validation failed: ')) {
          error = error.slice(24)
        }
        if (error.toLowerCase().includes('username')) {
          setErrors({ ...errors, usernameError: error })
        }
        if (error.toLowerCase().includes('mail')) {
          setErrors({ ...errors, emailError: 'Please enter valid email' })
        }
        if (error.toLowerCase().includes('mail already')) {
          setErrors({
            ...errors,
            emailError: 'User with such mail already exists',
          })
        }
        if (error.toLowerCase().includes('password')) {
          setErrors({ ...errors, passwordError: error })
        }
      } else if (
        e.message.toLowerCase().includes('username') ||
        e.message.toLowerCase().includes('mail') ||
        e.message.toLowerCase().includes('password')
      ) {
        let error = e.message
        if (error.includes('User validation failed: ')) {
          error = error.slice(24)
        }
        if (error.toLowerCase().includes('username')) {
          setErrors({ ...errors, usernameError: error })
        }
        if (error.toLowerCase().includes('mail')) {
          setErrors({ ...errors, emailError: 'Please enter valid email' })
        }
        if (error.toLowerCase().includes('password')) {
          setErrors({ ...errors, passwordError: error })
        }
      } else {
        setUsername('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setErrors(errorDefaults)
        return (
          <ModalContainer
            onClick={() => {
              setErrors(errorDefaults)
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
    if (isAuth) {
      setUsername('')
      setPassword('')
      setRepeatPassword('')

      setEmail('')
      setErrors(errorDefaults)
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
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Title style={{ marginBottom: 24, marginTop: 32 }}>
              User is authorized already
            </Title>
            <Button
              onClick={() => setActive(false)}
              style={{ marginBottom: 32 }}
            >
              Okay
            </Button>
          </Container>
        </ModalContainer>
      )
    }
    return (
      <div>
        <ModalContainer
          onClick={() => {
            setUsername('')
            setPassword('')
            setRepeatPassword('')

            setEmail('')
            setErrors(errorDefaults)
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
            <Title style={{ marginBottom: 24, marginTop: 32 }}>Register:</Title>
            <Container column style={{ width: '90%', marginBottom: 12 }}>
              <Input
                placeholder="Username..."
                style={{ height: 48 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ErrorText>{errors.usernameError}</ErrorText>
            </Container>
            <Container column style={{ width: '90%', marginBottom: 12 }}>
              <Input
                placeholder="Email..."
                style={{ height: 48 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ErrorText>{errors.emailError}</ErrorText>
            </Container>
            <Container column style={{ width: '90%', marginBottom: 12 }}>
              <Input
                placeholder="Password..."
                style={{ height: 48 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ErrorText>{errors.passwordError}</ErrorText>
            </Container>
            <Container column style={{ width: '90%', marginBottom: 12 }}>
              <Input
                placeholder="Repeat password..."
                style={{ height: 48 }}
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <ErrorText>{errors.repeatPasswordError}</ErrorText>
            </Container>
            <Container style={{ width: '90%' }}>
              <LoginLink
                onClick={() => {
                  setActive(false)
                  setActiveLogin(true)
                }}
              >
                Already have an accout?
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
                  setRepeatPassword('')

                  setEmail('')
                  setErrors(errorDefaults)
                  setActive(false)
                }}
              >
                Cancel
              </Button>

              <Button
                style={{ margin: '24px 0 32px 0' }}
                onClick={async () => {
                  await handleSumbit()
                }}
              >
                {loading ? <span>Loading...</span> : <span>Register</span>}
              </Button>
            </Container>
          </Container>
        </ModalContainer>
      </div>
    )
  } else {
    return null
  }
}

export default Register
