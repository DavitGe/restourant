import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { RES_PASS } from '../graphql/mutation'
import styled, { css } from 'styled-components'
import {
  Container,
  MainTitle,
  ModalContainer,
  Text,
  Input,
  ErrorText,
  Title,
  colors,
} from '../styles/StyledComponents'

const Button = styled.button`
  cursor: pointer;
  background-color: ${colors.main};
  color: ${colors.bg};
  font-family: 'Roboto', 'sans-serif';
  font-weight: 500;
  padding: 14px 30px;
  white-space: nowrap;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  font-size: 16px;
  border-width: 0;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }

  ${(props) =>
    props.reverse &&
    css`
      color: ${colors.main};
      background-color: ${colors.bg};
      border-radius: 5px;
      border: 1.5px solid rgba(220, 120, 11, 0.1);
      &:hover {
        border: 1.5px solid rgba(220, 120, 11, 0.4);
      }

      &:active {
        border: 1.5px solid rgba(220, 120, 11, 0.1);
      }
    `}
`

const RestorePage = () => {
  const errorDefaultState = {
    passwordError: '',
    repeatPasswordError: '',
  }
  const [ResPass] = useMutation(RES_PASS)
  const { link } = useParams()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState(errorDefaultState)

  const [errorPage, setErrorPage] = useState(false)
  const [successPage, setSuccessPage] = useState(false)

  const handleSubmit = async () => {
    try {
      setErrorMessages(errorDefaultState)
      if (password !== repeatPassword) {
        setErrorMessages({
          ...errorMessages,
          repeatPasswordError: "Passwords doesn't match",
        })
        return
      }
      await ResPass({ variables: { password, restoreLink: link } })
      setSuccessPage(true)
    } catch (e) {
      console.error(e)
      let error = e.message
      if (e.message.includes('Unexpected error: ')) {
        error = error.slice(18)
      }
      if (error.toLowerCase().includes('password')) {
        setErrorMessages({ ...errorMessages, passwordError: error })
        return
      }
      setErrorPage(true)
    }
  }
  if (errorPage) {
    return (
      <ModalContainer
        onClick={() => {
          setPassword('')
          setRepeatPassword('')
          setErrorMessages(errorDefaultState)
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
          <Title style={{ paddingTop: 24, paddingBottom: 12 }}>
            Something gone wrong!
          </Title>
          <Text>Restore link is not valid</Text>
          <Button
            style={{ margin: '24px 0 32px 0' }}
            onClick={() => setErrorPage(false)}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              Go to main page
            </Link>
          </Button>
        </Container>
      </ModalContainer>
    )
  }
  if (successPage) {
    return (
      <ModalContainer
        onClick={() => {
          setPassword('')
          setRepeatPassword('')
          setSuccessPage(false)
          setErrorMessages(errorDefaultState)
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
          <Title style={{ marginTop: 24 }}>
            Password was changed succesfully
          </Title>
          <Button
            style={{ margin: '24px 0 32px 0' }}
            onClick={() => setSuccessPage(false)}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              Go to main page
            </Link>
          </Button>
        </Container>
      </ModalContainer>
    )
  }
  return (
    <ModalContainer>
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
        <MainTitle style={{ padding: '20px 0' }}>
          Password restore page
        </MainTitle>
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
        <Container column style={{ width: '90%' }}>
          <Input
            placeholder="Repeat password..."
            style={{ height: 48 }}
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <ErrorText>{errorMessages.repeatPasswordError}</ErrorText>
        </Container>
        <Container
          row
          style={{ justifyContent: 'space-between', width: '90%' }}
        >
          <Button reverse style={{ margin: '24px 0 32px 0' }}>
            <Link
              to={'/'}
              style={{ textDecoration: 'none', color: colors.main }}
            >
              Cancel
            </Link>
          </Button>
          <Button
            style={{ margin: '24px 0 32px 0' }}
            onClick={async () => await handleSubmit()}
          >
            Change password
          </Button>
        </Container>
      </Container>
    </ModalContainer>
  )
}

export default RestorePage
