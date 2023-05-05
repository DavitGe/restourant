import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ACTIVATION } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import {
  Container,
  MainTitle,
  ModalContainer,
  Text,
  colors,
} from "../styles/StyledComponents";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background-color: ${colors.main};
  color: ${colors.bg};
  font-family: "Roboto", "sans-serif";
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
`;
const Activation = () => {
  const [Activation, { data, error }] = useMutation(ACTIVATION);
  const { link } = useParams();
  useEffect(() => {
    Activation({ variables: { activationLink: link } });
    //eslint-disable-next-line
  }, []);
  if (data || error) {
    if (data) {
      return (
        <ModalContainer>
          <Container
            column
            style={{
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              width: 700,
              borderRadius: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <MainTitle style={{ padding: "20px 0" }}>Activation page</MainTitle>
            <Text>Congratulations! Account is activated succesfully!</Text>
            <Button style={{ margin: "24px 0 32px 0" }}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                Go to main page
              </Link>
            </Button>
          </Container>
        </ModalContainer>
      );
    } else {
      return (
        <ModalContainer>
          <Container
            column
            style={{
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              width: 700,
              borderRadius: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <MainTitle style={{ padding: "20px 0" }}>Activation page</MainTitle>
            <Text style={{ color: "red" }}>
              Error! Code is expired or wrong
            </Text>
            <Button style={{ margin: "24px 0 32px 0" }}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                Go to main page
              </Link>
            </Button>
          </Container>
        </ModalContainer>
      );
    }
  } else {
    return (
      <ModalContainer>
        <Container
          style={{
            backgroundColor: "#FFFFFF",
            width: 700,
            height: 300,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <MainTitle>loading...</MainTitle>
        </Container>
      </ModalContainer>
    );
  }
};

export default Activation;
