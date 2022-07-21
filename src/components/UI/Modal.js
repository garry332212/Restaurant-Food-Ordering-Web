import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.cartCloseBtn}/>
};

const ModalOverlay = (props) => {
  return <div className="modal">
      <div className="content">{props.children}</div>
    </div>

};

const portalId = document.getElementById("overlays");


const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop cartCloseBtn={props.cartCloseBtn}/>, portalId)}

      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalId)}
    </Fragment>
  );
};

export default Modal;
