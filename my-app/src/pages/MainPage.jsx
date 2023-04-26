import React from "react";
import { useLocation } from "react-router-dom";

import Home from "../components/Home";
import Features from "../components/Features";
import About from "../components/About";
import Menu from "../components/Menu";
import Mobile from "../components/Mobile";
import Contact from "../components/Contact";

import { Main } from "../styles/StyledComponents";

const MainPage = ({ setCartList }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const DISPLAYED_PRODUCT_COUNT = 6;
  return (
    <Main>
      <Home />
      <Features />
      <About />
      <Menu count={DISPLAYED_PRODUCT_COUNT} setCartList={setCartList} />
      <Mobile />
      <Contact />
    </Main>
  );
};
export default MainPage;
