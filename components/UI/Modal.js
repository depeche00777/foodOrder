import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

//모달 뒤에 페이지 상호작용을 막아 주는 역할을 하는 컴포넌트(까만반투명)
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

//모발 오버레이 자체를 렌더링,리액트 포털로 내가 원하는 곳 어디에서나 사용(실제 html요소를 렌더링)
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

//메인 컴포넌트트
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
