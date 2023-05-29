import { useContext } from "react";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext); //컨텍스트 사용 설정
  const price = `$${props.price.toFixed(2)}`;
  //앞 $는 문자열 달러 의미 toFixed(2)-소수점 이하 두자리 수 까지만 렌더링

  //함수정의, 켄텍스트에 도달하는 함수
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    //컨텍스트에서 정의된 함수
    console.log("cartCtx", cartCtx);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemForm id={props.id} onAddToCart={addToCartHandler} />
        {/*  addToCartHandler를 가리키는 포인터를 넣음 */}
      </div>
    </li>
  );
};

export default MealItem;
