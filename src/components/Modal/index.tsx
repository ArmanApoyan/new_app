import "./style.scss";
import ReactDOM from "react-dom";
import React, { useRef } from "react";
import useOutsideClick from "../../hooks";

interface Props {
  children: React.ReactChild | React.ReactChild[];
  isOpen: boolean;
  close: CallableFunction;
}

const Modal: React.FC<Props> = (props) => {
  const { children, isOpen, close } = props;
  const modalBody = useRef(null);

  useOutsideClick(modalBody, close);

  return !!isOpen
    ? ReactDOM.createPortal(
        <div className="modal" data-testid="modal">
          <div data-testid="body" className="body" ref={modalBody}>
            <button onClick={() => close()} data-testid="btn" className="close">
              X
            </button>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
