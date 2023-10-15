import React, { useEffect } from "react";
import ReactDom from "react-dom";
import modal from "./Modal.module.css";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal({ children, onClose, title }) {
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.isComposing || event.key === "Escape") {
        onClose();
        return;
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [onClose]);

  return ReactDom.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={modal.container}>
        <header className={modal.header}>
          <h2 className={modal.title}>{title}</h2>
          <div className={modal.closeIcon}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById("modals")
  );
}

export default Modal;

// Определите PropTypes для свойств
Modal.propTypes = {
  children: PropTypes.node.isRequired, // Пример проверки для свойства "children"
  onClose: PropTypes.func.isRequired, // Пример проверки для свойства "onClose"
  title: PropTypes.string.isRequired, // Пример проверки для свойства "title"
};
