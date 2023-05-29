import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartInShown, setCartInShown] = useState(false);

  const showCartHandler = () => {
    setCartInShown(true);
  };

  const hideCartHandler = () => {
    setCartInShown(false);
  };

  return (
    <CartProvider>
      {cartInShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
