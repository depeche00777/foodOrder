import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartInShown, setCartInShown] = useState(false); //cart모달 보이고안보이고, 상태관리

  //cart모달 보이게 하는 함수
  const showCartHandler = () => {
    setCartInShown(true);
  };
  //cart모달 안보이게 하는 함수
  const hideCartHandler = () => {
    setCartInShown(false);
  };

  return (
    <CartProvider>
      {cartInShown && <Cart onClose={hideCartHandler} />}
      {/* cartInShown이 true일때만 Cart컴포넌트가 보임 */}
      <Header onShowCart={showCartHandler} />
      {/* props으로 함수 포인터(이름) 전달  on으로 시작되는 이름으로 정하는 것이 일종의 규약, 이벤트라*/}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
