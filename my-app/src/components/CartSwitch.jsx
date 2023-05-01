import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/StyledComponents";
import cart from "../images/cart.svg";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const LogoContainer = styled.div`
  cursor: pointer;
  position: fixed;
  z-index: 9999;
  width: 70px;
  height: 70px;
  right: 100px;
  bottom: 30px;
  border-radius: 35px;
  background-color: ${colors.main};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1300px) {
    right: 10px;
  }
`;
const Count = styled.div`
  font-family: "Roboto", "sans-serif";
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  color: #fff;
  width: 24px;
  height: 24px;
  z-index: 10000;
  background-color: red;
  position: fixed;
  bottom: 30px;
  right: 150px;
  @media (max-width: 1300px) {
    right: 10px;
  }
`;
const CartImg = styled.img`
  width: 32px;
  height: 32px;
  color: #fff;
`;
const CartSwitch = ({ cartList }) => {
  //eslint-disable-next-line
  const [count, setCount] = useState(0);

  if (cartList && cartList.length !== count) {
    setCount(cartList.length);
  }
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  if (count !== 0) {
    return (
      <Link to="/cart" onClick={toggleHome}>
        <LogoContainer>
          <Count>
            <span>{count}</span>
          </Count>
          <CartImg src={cart} />
        </LogoContainer>
      </Link>
    );
  } else {
    return null;
  }
};

export default CartSwitch;
