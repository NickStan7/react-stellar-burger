import React from "react";
import modalOverlay from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
export function ModalOverlay({ onClick }) {
  return <div onClick={onClick} className={modalOverlay.modalOverlay}></div>;
}

// Определите PropTypes для свойства "onClick"
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired, // Пример проверки для свойства "onClick"
};
