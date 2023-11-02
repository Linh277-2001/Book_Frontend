import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Cart from "./common/Cart/Cart";
import History from "./common/History/History";
import HistoryDetail from "./common/History/HistoryDetail";
import ProductDetail  from "./common/Book/ProductDetail";
import Footer from "./common/footer/Footer";

import Pages from "./pages/Pages";

import User from "./components/user/User";

import Search1 from "./common/SearchResult/SearchResult";

import Data from "./components/Data";
import Sdata from "./components/shops/Sdata";

function App() {
  const { productItems } = Data;
  const { shopItems } = Sdata;

  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItem(CartItem.filter((item) => item.id !== productId));
  };

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path="/" exact>
            <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
          </Route>
          <Route path="/cart" exact>
            {/* Step 2: Pass removeFromCart as a prop */}
            <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} removeFromCart={removeFromCart} />
          </Route>
          <Route path="/history">
            <History/>
          </Route>
          <Route path="/historydetail/:id">
            <HistoryDetail/>
          </Route>
          <Route path="/user">
            <User/>
          </Route>
          <Route path="/search/:query">
            <Search1/>
          </Route>
          <Route path="/book/:id">
            <ProductDetail addToCart={addToCart} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
