import { forwardRef } from "react";
import classes from "./Input.module.css";

//forwardRef으로 감싸줌(함수가 인자가 됨),두번째 인자로 ref
//React.forwardRef는 전달받은 ref 어트리뷰트를 하부 트리 내의 다른 컴포넌트로 전달하는 React 컴포넌트를 생성
const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {/* {...props.input}   -- type:input  이런 속성들이 여러개등등...*/}
    </div>
  );
});

export default Input;
