import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import cart from "../images/cart.svg";

import {
  Button,
  Container,
  NavA,
  NavBar,
  NavMenu,
  Div,
  LogoContainer,
  MobileIcon,
  colors,
} from "../styles/StyledComponents";

import Login from "./LoginModal";
import Register from "./RegisterModal";
import Restore from "./RestoreModal";
import MobileModal from "./MobileModal";

const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? "#FFF" : "transparent")};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: -80px; */
  /* font-size: 1rem; */
  position: sticky;
  top: 0;
  z-index: 1000000;
  /* width: 100%; */
  transition: 0.8s all ease;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
  @media (max-width: 784px) {
    height: 60px;
  }
`;
const Button1 = styled(Button)`
  @media (max-width: 1011px) {
    margin-right: 8px;
  }
  @media (max-width: 784px) {
    display: none;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: center;
`;

const CartImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transform: scaleX(-1);
`;

const CartWrapper = styled(Link)`
  position: relative;
  cursor: pointer;

  transition: 0.2s;
  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`;

const Counter = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  margin-right: -10px;
  margin-top: -9px;

  height: 16px;
  width: 16px;
  border-radius: 100%;

  background-color: red;
  color: white;
  font-size: 12px;
  font-family: "Roboto", "sans-serif";

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = ({ isAuth, setIsAuth, cartList }) => {
  const [activeLogin, setActiveLogin] = useState(false);
  const [activeRegister, setActiveRegister] = useState(false);
  const [activeRestore, setActiveRestore] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);
  const [activeMobile, setActiveMobile] = useState(false);
  const [count, setCount] = useState(0);

  if (cartList && cartList.length !== count) {
    setCount(cartList.length);
  }

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const signOutHandler = async () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <Nav scrollNav={scrollNav}>
      <Container
        style={{
          alignSelf: "center",
          width: "100%",
          paddingTop: 32,
          paddingBottom: 24,
        }}
      >
        <NavBar
          style={{
            alignItems: "center",
          }}
        >
          <Div>
            <LogoContainer to="/" onClick={toggleHome}>
              <img src={Logo} alt="logo" style={{ marginRight: 35 }} />
            </LogoContainer>

            <NavMenu style={{ zIndex: 1 }}>
              <NavA
                to="home"
                activeClass="active"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Home
              </NavA>
              <NavA
                activeClass="active"
                to="features"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-180}
              >
                Features
              </NavA>
              <NavA
                to="about"
                activeClass="active"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                About us
              </NavA>
              <NavA
                to="menu"
                activeClass="active"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-180}
              >
                Menu
              </NavA>
              <NavA
                to="mobile"
                activeClass="active"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-180}
              >
                Get app
              </NavA>
              <NavA
                to="contact"
                activeClass="active"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-180}
              >
                Contact us
              </NavA>
            </NavMenu>
          </Div>
          <ProfileWrapper>
            <CartWrapper to="/cart">
              {count !== 0 && <Counter>{count}</Counter>}
              <CartImg src={cart} />
            </CartWrapper>
            {isAuth ? (
              <Button1 style={{ zIndex: 1 }} onClick={signOutHandler}>
                Sign out
              </Button1>
            ) : (
              <Button1
                style={{ zIndex: 1 }}
                onClick={() => setActiveLogin(true)}
              >
                Sign In
              </Button1>
            )}
          </ProfileWrapper>

          <MobileIcon onClick={() => setActiveMobile(true)}>
            <FontAwesomeIcon icon={faBars} color={colors.main} size="2x" />
          </MobileIcon>
        </NavBar>
      </Container>
      <Login
        active={activeLogin}
        setActive={setActiveLogin}
        setActiveRegister={setActiveRegister}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setActiveRestore={setActiveRestore}
        activeRegister={activeRegister}
      />
      <Register
        active={activeRegister}
        setActive={setActiveRegister}
        setActiveLogin={setActiveLogin}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
      <Restore
        active={activeRestore}
        setActive={setActiveRestore}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
      <MobileModal
        active={activeMobile}
        setActive={setActiveMobile}
        isAuth={isAuth}
        setActiveLogin={setActiveLogin}
        signOutHandler={signOutHandler}
      />
    </Nav>
  );
};

export default Header;
