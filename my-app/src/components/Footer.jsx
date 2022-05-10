import React from 'react'
import styled from 'styled-components'
import { Container, colors } from '../styles/StyledComponents'

import logo from '../images/logo.png'
import instagram from '../images/socialMedia/instagram.png'
import facebook from '../images/socialMedia/facebook.png'
import youtube from '../images/socialMedia/youtube.png'
import twitter from '../images/socialMedia/twitter.png'

const MediaIcon = styled.img`
  height: 21px;
  width: 21px;
  margin-right: 10px;
`

const FooterTitle = styled.h5`
  margin: 0 0 26px 0;
  padding: 0;
  font-family: 'Philosopher', 'sans-serif';
  font-size: 18px;
  font-weight: 700;
  color: ${colors.bg};
`

const FooterLinks = styled.a`
  color: ${colors.bg};
  opacity: 0.7;
  font-family: 'Roboto', 'sans-serif';
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 20px 0;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    opacity: 1;
  }
`

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#252525' }}>
      <Container
        row
        style={{
          justifyContent: 'space-between',
          paddingTop: 137,
          paddingBottom: 104,
          flexWrap: 'wrap',
          // marginLeft: 4,
          // marginRight: 4,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <Container
          column
          style={{ alignSelf: 'flex-start', marginLeft: 2, marginRight: 2 }}
        >
          <img
            src={logo}
            alt="HealthyFood"
            style={{ width: 60, marginBottom: 25, height: 60 }}
          />
          <FooterLinks style={{ fontSize: 14, marginBottom: 17 }}>
            www.companyname.com
          </FooterLinks>
          <FooterLinks style={{ fontSize: 14, marginBottom: 17 }}>
            companyname@gmail.com
          </FooterLinks>
          <FooterLinks style={{ fontSize: 14 }}>
            Phone: +12163547758{' '}
          </FooterLinks>
        </Container>
        <Container
          column
          style={{ alignSelf: 'flex-start', marginLeft: 2, marginRight: 2 }}
        >
          <FooterTitle>Home</FooterTitle>
          <FooterLinks>Landingpage</FooterLinks>
          <FooterLinks>Documentation</FooterLinks>
          <FooterLinks>Referral Program</FooterLinks>
          <FooterLinks>UI & UX Design</FooterLinks>
          <FooterLinks>Web Design</FooterLinks>
        </Container>
        <Container
          column
          style={{ alignSelf: 'flex-start', marginLeft: 2, marginRight: 2 }}
        >
          <FooterTitle>Menu</FooterTitle>
          <FooterLinks>Landingpage</FooterLinks>
          <FooterLinks>Documentation</FooterLinks>
          <FooterLinks>Referral Program</FooterLinks>
          <FooterLinks>UI & UX Design</FooterLinks>
          <FooterLinks>Web Design</FooterLinks>
        </Container>
        <Container
          column
          style={{ alignSelf: 'flex-start', marginLeft: 2, marginRight: 2 }}
        >
          <FooterTitle>Company</FooterTitle>
          <FooterLinks>Landingpage</FooterLinks>
          <FooterLinks>Documentation</FooterLinks>
          <FooterLinks>Referral Program</FooterLinks>
          <Container row>
            <FooterLinks>
              <MediaIcon src={facebook} alt="facebook" />
            </FooterLinks>
            <FooterLinks>
              <MediaIcon src={instagram} alt="instagram" />
            </FooterLinks>
            <FooterLinks>
              <MediaIcon src={twitter} alt="twitter" />
            </FooterLinks>
            <FooterLinks>
              <MediaIcon
                src={youtube}
                alt="youtube"
                style={{ marginRight: 0 }}
              />
            </FooterLinks>
          </Container>
        </Container>
      </Container>
    </div>
  )
}

export default Footer
