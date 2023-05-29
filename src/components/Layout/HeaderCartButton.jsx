import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  //버튼 상태

  const cartCtx = useContext(CartContext);
  //useContext를 이용해서 CartContext를 사용
  //CartContext에 접근하려면 Provider가 관리(Managing)-> 이 앱 컴포넌트에서 사용되는 CartProvider
  //컨텍스트가 변경(업데이트) 될때마다 이 컴포넌트의 value를 고침(장바구니 항목 수 고침)

  //배열 아이템의 숫자로
  // cartCtx.items.lenght ->각 아이템당 여러개라 이렇게 못씀
  //배열.reduce((총합,각아이템)=>{ return 총합 =+ 각아이템 },총합의초기값) -Array고차함수2
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  //버튼에 애니메이션이 작동되도록
  //const btnClasses = `${classes.button} ${classes.bump}`; //우선은 무조건 되게
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  const { items } = cartCtx; //아래 deps에 cartCtx를 다 쓰긴 머해서 구조분해-위로 올려서 18번째줄도 바꿔줘!
  //아이템이 변경된 경우.0보다 컸을 경우에만
  useEffect(() => {
    //if (cartCtx.items.length === 0) {
    if (items.length === 0) {
      return; //항목이 없을경우는 빠져나감
    }
    setBtnIsHighlighted(true);
    //나중에 추가 - 클라스가 처음에 한번 추가되고 끝나는 것을 방지,타이머설정
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    //나중에 추가 -사이드이펙트 정리,클린업함수 추가
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      {/* 여기 onClick은 내장 이벤트명 */}
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>YourCart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
