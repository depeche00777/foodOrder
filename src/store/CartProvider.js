// 이 컴포넌트는 cartContext 데이터를 관리하고 그 컨텍스트를 접근하려는 모든 컴포넌트에 제공하는 일을 함
// reducer 관련 내용도 여기에(상태를 모아서 별도로 관리)

import React, { useReducer } from "react";
import CartContext from "./cart-context";

// reducer함수 만들기 -상태를 업데이트 하는 함수(컴퍼넌트 밖에 있음)
// 우선 defaultCartState를 cartReducer에서 반환
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //액션으로 추가한 아이템이 기존에 존재하는 아이템과 같을 경우 해당항목의 첫번째 요소에 대한 인덱스값을 상수에넣음

    const existingCartItem = state.items[existingCartItemIndex];
    //기존 아이템과 동일한 아이템이 없을 경우는 null

    let updatedItems;

    if (existingCartItem) {
      //겹치는 아이템이 있을 경우
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
        //겹치는 아이템 쫙 나열한 다음, amount를 두개 합친걸로 바꿈
      };
      updatedItems = [...state.items]; //기존 객체를 새 배열로
      updatedItems[existingCartItemIndex] = updatedItem; //값 더해준걸로 기존 아이템 업데이트
    } else {
      //기존에 없는 새 아이템 추가
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  //빼주는 부분 추가
  if (action.type === "REMOVE") {
    //기존 아이템이 있는지 찾음  -위에꺼 복사
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    //기존 아이템과 동일한 아이템이 없을 경우는 null
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    //총합계에서 현재 아이템가격을 빼줌
    let updatedItems;

    //1인 상태에서 빼주면 완전히 사라져야 되서
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //1보다 컸을땐 아이템은 유지하고 수량만 업데이트
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items]; //전체 items 배열은 그대로
      //수량바뀐아이템 수량만 업데이트
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

//컴포넌트 함수 밖에서 초기화 상수 정의
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  // useReducer 호출 (첫번째 파라메터는 연결되는 함수명, 두번째 - 초기값)
  // 두개의 요소로 된 배열을 반환(상태, 함수-리듀서에 액션 전달 )
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
    //type말고 다른것도 가능,문자열일 경우 대문자(그냥 규약)
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  //업데이트 될 객체-나중에 다이나믹하게 변하게 수정
  const cartContext = {
    items: cartState.items, //[]에서 바꿔줌
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler, // 단순히 함수가 값으로 저장됨
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
