//모달 안에 들어갈 부분
import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal"; //여는 태그와 닫는 태그로 사용
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  //useContext를 호출하고 CartContext를 전달 에 접근하기 위해

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`; //장바구니 실제 총액
  const hasItems = cartCtx.items.length > 0; //장바구니에 품목이 있는지 검사. 있을때만 order버튼 보이게

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id} //list라 필요
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          //추가되거나 삭제된 항목의 아이디가 remove핸드러로 전달
          //bind함수 - props로 함수를 넘겨줄때 인자값도 같이, 보통은 this사용시에 사용
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  //더미로 하나 그냥 만들어 놓음(배열->map으로 볼려 준뒤 ul안에 넣기-> ul에 클라스이름)

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>총금액</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-outline"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
