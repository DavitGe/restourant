import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ISAUTH } from "./graphql/mutation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.scss";

import MainPage from "./pages/MainPage";
import ProductList from "./pages/ProductList";
import Activation from "./pages/Activation";
import RestorePage from "./pages/RestorePage";
import Cart from "./pages/CartPage";

function App() {
  const [IsAuth] = useMutation(ISAUTH);
  const [isAuth, setIsAuth] = useState(false);
  const [cartList, setCartList] = useState([]);

  //eslint-disable-next-line
  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("cart")));
  }, []);

  useEffect(() => {
    // const { data, error } = await IsAuth()
    // if (error) {
    //   setIsAuth(false)
    // } else {
    //   setIsAuth(data.checkAuth)
    // }

    IsAuth().then(({ data, error }) => {
      if (error) {
        setIsAuth(false);
      } else {
        setIsAuth(data.checkAuth);
      }
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);
  return (
    <Router>
      <Header cartList={cartList} isAuth={isAuth} setIsAuth={setIsAuth} />
      {/* <CartSwitch cartList={cartList} /> */}
      <Routes>
        <Route path="/api/activate/:link" element={<Activation />} />
        <Route path="/api/restore/:link" element={<RestorePage />} />
        <Route
          path="/products"
          element={<ProductList setCartList={setCartList} />}
        />
        <Route
          path="/cart"
          element={<Cart cartList={cartList} setCartList={setCartList} />}
        />
        <Route path="/" element={<MainPage setCartList={setCartList} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
