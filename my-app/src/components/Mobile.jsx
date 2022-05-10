import React from 'react'
import {
  Container,
  SectionText,
  Title,
  Text,
  colors,
} from '../styles/StyledComponents'

import styled, { css } from 'styled-components'

import googlePlay from '../images/takeAway/google.png'
import apple from '../images/takeAway/apple.png'
import mobile from '../images/takeAway/mobile.png'

const DownloadButton = styled.a`
  cursor: pointer;
  padding: 11px 29px;
  background-color: ${colors.text};
  font-family: 'Roboto', 'sans-serif';
  font-weight: 500;
  white-space: nowrap;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 1;
  }

  ${(props) =>
    props.reverse &&
    css`
      background-color: #fbf1e7;
      border-radius: 5px;
      border: 1.5px solid rgba(220, 120, 11, 0.1);
      &:hover {
        border: 1.5px solid rgba(220, 120, 11, 0.3);
      }
      &:active {
        border: 1.5px solid rgba(220, 120, 11, 0.1);
      }
    `}
`

const MobileBg = styled.img`
  position: absolute;
  right: 0;
  z-index: 0;
  top: 0;
  margin-top: -64px;
  @media (max-width: 970px) {
    display: none;
  } ;
`

const Container1 = styled(Container)`
  align-self: flex-start;
  margin-left: 8px;
  @media (max-width: 970px) {
    margin: 0 auto;
    justify-content: center;
    text-align: center;
  }
`
const Mobile = () => {
  return (
    <div style={{ backgroundColor: '#FBF1E7', marginTop: 187 }} id="mobile">
      <Container
        row
        style={{
          paddingTop: 114,
          paddingBottom: 130,
          maxWidth: 946,
          position: 'relative',
        }}
      >
        <Container1 column>
          <SectionText>TAKE AWAY</SectionText>
          <Title
            style={{
              maxWidth: 555,
              marginBottom: 30,
              marginLeft: 4,
              marginRight: 4,
            }}
          >
            Food Stalls with Persons but to Product marketing plane.
          </Title>
          <Text style={{ maxWidth: 555, marginLeft: 4, marginRight: 4 }}>
            There are many things are needed to start the Fast Food Business.
            You need not only Just Food Stalls with Persons but also specialized
            equipmentwith Persons but also Just Food Stalls with Persons.
          </Text>
          <Container1 row style={{ marginTop: 48 }}>
            <DownloadButton
              style={{ marginRight: 30, textDecoration: 'none' }}
              href="https://www.apple.com/"
            >
              <img
                src={apple}
                alt=""
                style={{
                  height: 26,
                  width: 26,
                  marginRight: 8,
                }}
              />
              <Text style={{ opacity: 1, color: colors.bg }}>App Store</Text>
            </DownloadButton>
            <DownloadButton
              reverse
              href="https://play.google.com/store/apps"
              style={{ textDecoration: 'none' }}
            >
              <img
                src={googlePlay}
                alt=""
                style={{ height: 26, width: 26, marginRight: 8 }}
              />
              <Text style={{ opacity: 1 }}>Google Play</Text>
            </DownloadButton>
          </Container1>
        </Container1>
        <MobileBg src={mobile} alt="" />
      </Container>
    </div>
  )
}

export default Mobile
