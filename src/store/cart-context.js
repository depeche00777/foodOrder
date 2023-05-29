import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,

  //컨텍스트를 업데이트할 함수 들
  addItem: (item) => {},
  removeItem: (id) => {},
}); //장바구니 항목 초기값

export default CartContext;
