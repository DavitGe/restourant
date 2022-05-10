import styled, { css } from 'styled-components'
import { Link as LinkS } from 'react-scroll'
import { Link as LinkR } from 'react-router-dom'

export const colors = {
  text: '#150C01',
  bg: '#FFFFFF',
  main: '#DC780B',
  starDef: '#EDEDED',
}

export const LogoContainer = styled(LinkR)`
  cursor: pointer;
  @media (max-width: 1011px) {
    margin-left: 8px;
  }
`

export const MobileIcon = styled.div`
  display: none;
  @media (max-width: 784px) {
    cursor: pointer;
    display: flex;
    margin-right: 8px;
  } ;
`

export const ButtonNL = styled.button`
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
export const SectionText = styled.p`
  font-family: 'Roboto', 'sans-serif';
  font-weight: 500;
  color: ${colors.main};
  opacity: 0.7;
  letter-spacing: 0.2em;
`
export const NavBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const NavMenu = styled.nav`
  display: flex;
  align-self: center;
  @media (max-width: 784px) {
    display: none;
  }
`

export const Container = styled.div`
  display: flex;
  max-width: 1140px;
  align-self: center;
  margin: 0 auto;

  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}

  ${(props) =>
    props.row &&
    css`
      flex-direction: row;
    `}
  @media (max-width: 1156px) {
    max-width: 1000px;
  }
  @media (max-width: 1011px) {
    max-width: 780px;
  }
  @media (max-width: 796px) {
    max-width: 600px;
  }
  @media (max-width: 500px) {
    max-width: 464px;
  }
`

export const NavA = styled(LinkS)`
  font-family: 'Roboto', 'sans-serif';
  font-weight: 400;
  font-size: 16px;
  color: ${colors.text};
  opacity: 0.6;
  margin-right: 40px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &.active {
    color: ${colors.main};
    opacity: 0.7;
    font-weight: 500;
  }
  /* ${(props) =>
    props.choosen &&
    css`
      color: ${colors.main};
      opacity: 0.7;
      font-weight: 500;
    `} */
  @media (max-width: 1011px) {
    font-size: 14px;
  }
`
export const BannerContainer = styled.div`
  margin: 64px 0 48px;
  display: flex;
  width: 100%;
  @media (max-width: 1156px) {
    margin: 32px 0 32px;
  }
  @media (max-width: 890px) {
    margin: 12px 0;
    min-height: 200px;
  }
`
export const Banner = styled.img`
  width: 100%;
  object-fit: cover;
  margin-top: 64px auto;
`
export const Text = styled.p`
  margin: 0;
  font-family: 'Roboto', 'sans-serif';
  font-weight: 500;
  color: ${colors.text};
  opacity: 0.7;
  font-size: 16px;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
`

export const ErrorText = styled.p`
  margin: 0;
  font-family: 'Roboto', 'sans-serif';
  font-weight: 400;
  color: red;
  font-size: 14px;
  margin-left: 12px;
  margin-top: 4px;
`

export const MainTitle = styled.h1`
  font-family: 'Philosopher', 'sans-serif';
  color: ${colors.text};
  font-weight: 700;
  font-size: 49px;
  margin: 0;
  margin-bottom: 7px;
  @media (max-width: 1439px) {
    font-size: 38px;
  }
  @media (max-width: 720px) {
    font-size: 32px;
  }
`

export const Title = styled.h2`
  font-family: 'Philosopher', 'sans-serif';
  color: ${colors.text};
  font-weight: 700;
  font-size: 32px;
  margin: 0;
  @media (max-width: 1439px) {
    font-size: 28px;
  }
  @media (max-width: 720px) {
    font-size: 24px;
  }
`
export const ProductTitle = styled.h3`
  font-family: 'Philosopher', 'sans-serif';
  color: ${colors.text};
  font-weight: 700;
  font-size: 24px;
  margin: 0;
`

export const Button = styled.a`
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
export const Div = styled.div`
  display: flex;
`
export const ModalContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transform: scale(1);
`
export const Input = styled.input`
  margin: 0;
  width: 100%;
  border-radius: 10px;
  border: 1.5px solid rgba(21, 12, 1, 0.1);
  padding-left: 30px;
  &:placeholder-shown {
    padding-left: 30px;
  }
  &:focus {
    outline: none;
    border: 1.5px solid rgba(21, 12, 1, 0.1);
  }
`

export const Main = styled.div`
  background-color: ${colors.bg};
  width: 100%;
  min-height: 100vh;
`
