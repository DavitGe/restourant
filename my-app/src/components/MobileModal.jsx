import React from 'react'
import {
  ModalContainer,
  NavA,
  Container,
  colors,
  Button,
} from '../styles/StyledComponents'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const Nav = styled(NavA)`
  color: ${colors.text};
  font-size: 32px;
  font-weight: 500;
  opacity: 0.7;
  margin-bottom: 24px;
  text-align: center;
  margin-right: 0;
`

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 32px;
  right: 32px;
  opacity: 0.5;
`
const MobileModal = ({
  active,
  setActive,
  isAuth,
  signOutHandler,
  setActiveLogin,
}) => {
  if (active) {
    return (
      <ModalContainer style={{ backgroundColor: '#FFF' }}>
        <Container column style={{ alignItems: 'center' }}>
          <Nav
            to="home"
            activeClass="active"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            onClick={() => setActive(false)}
          >
            Home
          </Nav>
          <Nav
            activeClass="active"
            to="features"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-180}
            onClick={() => setActive(false)}
          >
            Features
          </Nav>
          <Nav
            to="about"
            activeClass="active"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            onClick={() => setActive(false)}
          >
            About us
          </Nav>
          <Nav
            to="menu"
            activeClass="active"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-180}
            onClick={() => setActive(false)}
          >
            Menu
          </Nav>
          <Nav
            to="mobile"
            activeClass="active"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-180}
            onClick={() => setActive(false)}
          >
            Get app
          </Nav>
          <Nav
            to="contact"
            activeClass="active"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-180}
            onClick={() => setActive(false)}
          >
            Contact us
          </Nav>
          {isAuth ? (
            <Button
              style={{ zIndex: 1, marginTop: 32 }}
              onClick={signOutHandler}
            >
              Sign out
            </Button>
          ) : (
            <Button
              style={{ zIndex: 1, marginTop: 32 }}
              onClick={() => {
                setActive(false)
                setActiveLogin(true)
              }}
            >
              Sign In
            </Button>
          )}
        </Container>
        <CloseIcon
          icon={faXmark}
          size="2x"
          color={colors.text}
          onClick={() => setActive(false)}
        />
      </ModalContainer>
    )
  } else {
    return null
  }
}

export default MobileModal
