import React, { useState } from "react";

import styled, { css } from "styled-components";
import {
  Container,
  SectionText,
  Title,
  colors,
  BannerContainer,
  Banner,
} from "../styles/StyledComponents";
import Product from "../components/Product";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/query";

import { useLocation } from "react-router-dom";

const Parameter = styled.button`
  background-color: #fff;
  border: 1px solid rgba(220, 120, 11, 0.7);
  border-radius: 32px;
  color: rgba(220, 120, 11, 0.7);
  font-family: "Roboto", "sans-serif";
  font-weight: 500;
  font-size: 16px;
  padding: 8px 24px;
  margin-right: 12px;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(220, 120, 11, 0.4);
  }

  &:active {
    border: 1px solid rgba(220, 120, 11, 0.1);
  }

  ${(props) =>
    props.active &&
    css`
      color: ${colors.bg};
      background-color: ${colors.main};
      border-width: 0;
      &:hover {
        border-width: 0;
        opacity: 0.9;
      }

      &:active {
        border-width: 0;
        opacity: 1;
      }
    `}
`;

const PageButton = styled.button`
  background-color: #fff;
  border: 1px solid rgba(220, 120, 11, 0.7);
  border-radius: 4px;
  color: rgba(220, 120, 11, 0.7);
  font-family: "Roboto", "sans-serif";
  font-weight: 500;
  font-size: 16px;
  padding: 10px 14px;
  margin-right: 12px;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(220, 120, 11, 0.4);
  }

  &:active {
    border: 1px solid rgba(220, 120, 11, 0.1);
  }
  ${(props) =>
    props.active &&
    css`
      color: ${colors.bg};
      background-color: ${colors.main};
      border-width: 0;
      &:hover {
        border-width: 0;
        opacity: 0.9;
      }

      &:active {
        opacity: 1;
        border-width: 0;
      }
    `}
`;

const ProductList = ({ setCartList }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [activeElement, setActiveElement] = useState(0);
  const query = useQuery(GET_PRODUCTS);
  if (query.loading) {
    return null;
  }
  const { data } = query;
  const products = data.products;

  const categories = [
    "All",
    "Burgers",
    "Pizza",
    "Meaty",
    "Salads",
    "Fruits",
    "Drinks",
  ];
  return (
    <div style={{ marginBottom: 84 }}>
      <BannerContainer>
        <Banner src="https://raw.githubusercontent.com/DavitGe/HealthyFoodProductRaws/main/mae-mu-I7A_pHLcQK8-unsplash%20(1).jpg" />
      </BannerContainer>
      <Container column>
        <SectionText>CATALOG</SectionText>
        <Title>Food with a New Passion</Title>
        <Container
          row
          style={{
            marginLeft: 0,
            marginTop: 24,
            marginBottom: 64,
            flexWrap: "wrap",
          }}
        >
          {categories.map((category, index) => {
            if (activeElement === index) {
              return (
                <Parameter key={index} active>
                  {category}
                </Parameter>
              );
            }
            return (
              <Parameter
                key={index}
                onClick={() => {
                  setActiveElement(index);
                }}
              >
                {category}
              </Parameter>
            );
          })}
        </Container>
        <Container style={{ flexWrap: "wrap" }}>
          {products.map((product) => {
            if (activeElement === 0) {
              return <Product key={product._id} product={product} />;
            }
            const categoryValidation = product.categories.find(
              (category) =>
                category.toLowerCase() ===
                categories[activeElement].toLowerCase()
            );
            if (categoryValidation) {
              return (
                <Product
                  key={product._id}
                  product={product}
                  setCartList={setCartList}
                />
              );
            } else {
              return null;
            }
          })}
        </Container>
        <Container style={{ alignSelf: "center" }}>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
        </Container>
      </Container>
    </div>
  );
};

export default ProductList;
