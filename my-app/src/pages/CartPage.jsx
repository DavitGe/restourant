import React, { useState, useEffect } from "react";

import {
  Container,
  BannerContainer,
  Banner,
  SectionText,
  Text,
  Title,
  Button,
} from "../styles/StyledComponents";
import CartPorduct from "../components/CartProduct";

import { useLocation } from "react-router-dom";

const Cart = ({ cartList, setCartList }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let startingPrice = 0;

  if (cartList) {
    if (cartList !== []) {
      cartList.map((e) => {
        if (e) {
          startingPrice += parseInt(e.price.slice(0, -1)) * e.count;
        }
      });
    }
  }
  //eslint-disable-next-line
  const [price, setPrice] = useState(startingPrice);
  const onConfirm = () => {
    console.log("confirm");
  };
  useEffect(() => {
    let result = 0;
    if (cartList) {
      cartList.map((e) => {
        if (e) {
          result += parseInt(e.price.slice(0, -1)) * e.count;
        }
      });
      setPrice(result);
    }
  }, [cartList]);

  if (cartList) {
    return (
      <div style={{ marginBottom: 84 }}>
        <BannerContainer>
          <Banner src="https://raw.githubusercontent.com/DavitGe/HealthyFoodProductRaws/main/mae-mu-I7A_pHLcQK8-unsplash%20(1).jpg" />
        </BannerContainer>
        <Container
          row
          style={{
            justifyContent: "space-between",
            alignItems: "end",
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <Container column style={{ margin: 0 }}>
            <SectionText style={{ fontSize: 22 }}>Cart</SectionText>
            <Text style={{ fontSize: 24 }}>Total amount:</Text>
            <Title style={{ fontSize: 32 }}>{price}$</Title>
          </Container>
          <Button onClick={onConfirm}>Confirm Order</Button>
        </Container>
        <Container column>
          {cartList.map((product) => {
            if (product) {
              return (
                <CartPorduct
                  product={product}
                  setCartList={setCartList}
                  key={product.id}
                />
              );
            }
          })}
          <Button
            style={{ width: 161, margin: "48px auto" }}
            onClick={onConfirm}
          >
            Confirm Order
          </Button>
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

export default Cart;
