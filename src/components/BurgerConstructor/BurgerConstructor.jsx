import React, { useState, useCallback } from "react";

import { data } from "../../utils/data";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon, 
} from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../OrderDetails/OrderDetails";

function BurgerConstructor() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModalClose = useCallback(() => setModalIsOpen(false), []);
  return (
    <div className={styles.BurgerConstructor}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={data[0].name}
        thumbnail={data[0].image}
        price={data[0].price}

      />
      
     
      <div className={styles.BurgerConstructorMiddle}>
      <DragIcon type="primary" />
        <ConstructorElement
          text={data[1].name}
          price={data[1].price}
          thumbnail={data[1].image}
        /> 
        <DragIcon type="primary" />
        <ConstructorElement
          text={data[2].name}
          price={data[2].price}
          thumbnail={data[2].image}
        />
        <DragIcon type="primary" />
        <ConstructorElement
          text={data[3].name}
          price={data[3].price}
          thumbnail={data[3].image}
        />
        <DragIcon type="primary" />
        <ConstructorElement
          text={data[4].name}
          price={data[4].price}
          thumbnail={data[4].image}
        />
        <DragIcon type="primary" />
        <ConstructorElement
          text={data[5].name}
          price={data[5].price}
          thumbnail={data[5].image}
        />
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={data[0].name}
        price={data[0].price}
        thumbnail={data[0].image}
      />

      <div className={styles.pricePlusOrder}>
        <div className={styles.price}>
          <h2
            style={{
              fontFamily: "Iceland",
              fontSize: 48,
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            610
          </h2>
          <CurrencyIcon className={styles.image} type="primary" />
        </div>

        <Button
          type="primary"
          size="medium"
          onClick={() => setModalIsOpen(true)}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title={null}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

// Определите PropTypes для свойств

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
