import React from "react";
import mealsImage from "../../assets/meals.jpg";
//이미지를 public에 놓고 써도 됨
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        {/* 새로 만든 onClick프롭스 이름으로 또 전달,포인터(맘대로해도됨,내장 이벤트명 아님) */}
      </header>
      <div className={classes["main-image"]}>
        {/* main-image클라스는 안에 -가 있어서 .못 씀 */}
        <img src={mealsImage} alt='meals' />
      </div>
    </>
  );
};

export default Header;
