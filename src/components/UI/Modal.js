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

  // 포탈을 사용하지 않을때
  // return (
  //   <>
  //     <Backdrop />
  //     <ModalOverlay>{props.children}</ModalOverlay>
  //   </>
  // );
};

export default Modal;

/*

ReactDOM.createPortal(child, container)   -자식들을 DOM의 다른 위치에 렌더링시킬 수 있다
https://velog.io/@oxeanondo/React-Docs-%EC%A0%95%EB%8F%85%ED%95%98%EA%B8%B0-createPortal
https://velog.io/@rkio/React-ReactDOM.createPortal

*/
