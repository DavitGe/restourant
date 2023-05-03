import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  Title,
  Text,
  Button,
  colors,
} from "../styles/StyledComponents";

const ProductContainer = styled.div`
  border-style: solid;
  border-width: 1px 0 0 0;
  border-top-color: #808080;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* padding-bottom: 12px; */
  padding-top: 18px;
  width: 100%;
  margin-top: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
    /* border-width: 0; */
    border-top-color: #eeeeee;
    align-items: center;
  }
`;
const Container1 = styled(Container)`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-width: 480px;
    margin: 0;
    text-align: center;
  }
`;
const Container2 = styled(Container)`
  @media (max-width: 600px) {
    margin: 0;
    flex-direction: row;
    margin-top: 8px;
  }
`;
const Button1 = styled(Button)`
  @media (max-width: 600px) {
    margin-left: 24px;
  }
`;

const ProductImg = styled.img`
  width: 124px;
  height: 124px;
  object-fit: cover;
  border-radius: 3px;
  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

const CountButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  background-color: #fff;
  color: ${colors.main};
  border-style: none;
`;

const CartPorduct = ({ product, setCartList }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      const result = parseInt(product.price.slice(0, -1) * product.count);
      setPrice(result);
    }
  }, [product]);

  const onDecrease = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const candidate = cart.find((e) => e.id === product.id);
    if (candidate) {
      if (candidate.count === 1) {
        const result = cart.filter((element, index) => {
          return element.id !== candidate.id;
        });
        setCartList(result);
      } else {
        candidate.count -= 1;
        const result = cart.map((e) => {
          if (e.id !== candidate.id) {
            return e;
          } else {
            return candidate;
          }
        });
        setCartList(result);
      }
    }
  };
  const onIncrease = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const candidate = cart.find((e) => e.id === product.id);
    if (candidate) {
      candidate.count += 1;
      const result = cart.map((e) => {
        if (e.id !== candidate.id) {
          return e;
        } else {
          return candidate;
        }
      });
      setCartList(result);
    }
  };
  const onRemove = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const candidate = cart.find((e) => e.id === product.id);
    const result = cart.filter((element, index) => {
      return element.id !== candidate.id;
    });
    setCartList(result);
  };
  if (product) {
    return (
      <Container style={{ width: "100%" }}>
        <ProductContainer>
          <Container1 style={{ marginLeft: 24 }}>
            <ProductImg src={product.image} alt={product.title} />
            <Container1 column style={{ marginLeft: 24 }}>
              <Container2 row style={{ marginLeft: 0, alignItems: "center" }}>
                <Text style={{ paddingBottom: 12, paddingRight: 8 }}>
                  {product.count}x
                </Text>
                <Title style={{ marginBottom: 12 }}>{product.title}</Title>
                <Container row>
                  <CountButton
                    style={{
                      marginBottom: 4,
                      paddingRight: 8,
                      marginLeft: 9,
                      borderRight: "solid 1px #eeeeee",
                    }}
                    onClick={onDecrease}
                  >
                    -
                  </CountButton>
                  <CountButton style={{ paddingLeft: 8 }} onClick={onIncrease}>
                    +
                  </CountButton>
                </Container>
              </Container2>
              <Text>{product.description}</Text>
            </Container1>
          </Container1>
          <Container2
            column
            style={{ alignItems: "flex-end", marginRight: 24 }}
          >
            <Title style={{ marginBottom: 12 }}>{price}$</Title>
            <Button1 onClick={onRemove}>Remove</Button1>
          </Container2>
        </ProductContainer>
      </Container>
    );
  } else {
    return null;
  }
};

export default CartPorduct;
