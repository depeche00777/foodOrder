import classes from "./Card.module.css";
//wrapper의 역할을 할 컴퍼넌트임(AvailableMeals.js의 ul)

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
