import React from 'react'
import {data} from '../../utils/data'
import styles from "../BurgerIngredient/BurgerIngredient.module.css";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types"; // Импортируйте PropTypes

function BurgerIngredient({ image, price,name }) {
  return (
    <div className={styles.BurgerIngredient}>
        <img src={image} alt="Ингредиент бургера" />
        <Counter count={1} size="default" extraClass="m-1" />
        <h2 className={styles.IngredientPrice}>{price} <CurrencyIcon type="primary" /></h2>
        <p className={styles.IngredientName}>{name} </p>
    </div>


  );
}

// Определите PropTypes для свойств
BurgerIngredient.propTypes = {
  image: PropTypes.string.isRequired, // Свойство image должно быть строкой и обязательным
  price: PropTypes.number.isRequired, // Свойство price должно быть числом и обязательным
  name: PropTypes.string.isRequired, // Свойство name должно быть строкой и обязательным
};

export default BurgerIngredient;