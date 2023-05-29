import React, { useRef } from "react";
import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  //ref를 통해서 입력된 값을 받아올것(특정 돔을 선택할 때 사용)
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    console.log("input에 입력한 값을 가져옴", enteredAmount);
    //console.log("enteredAmount타입은? ", typeof enteredAmount);
    const enteredAmountNumber = +enteredAmount; //숫자열로 바꿔줌 Number(string)
    //console.log("enteredAmountNumber타입은? ", typeof enteredAmountNumber);

    //유효성검사(공백)
    if (
      enteredAmount.trim().length === 0 || //(공백을 잘라냈더니) 아무것도 없음
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return; //함수에서 빠져나감
    }

    props.onAddToCart(enteredAmountNumber);
    //수량만, context매소드를 실행해서 카트에 넘고 싶음, props를 가져올 함수 호출
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: "amount_" + props.id, //'amount',
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
//label="Amount"  -수량 / input ={{}} 다 내가 만든게 아니라 내장 속성
