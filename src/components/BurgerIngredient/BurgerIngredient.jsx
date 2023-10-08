import React from 'react'
import {data} from '../../utils/data'
import styles from "../BurgerIngredient/BurgerIngredient.module.css";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredient({ image, price,name }) {
  return (
    <div className={styles.BurgerIngredient}>
        <img src={image} alt="Ингредиент бургера" />
        <h2 className={styles.IngredientPrice}>{price} <CurrencyIcon type="primary" /></h2>
        <p className={styles.IngredientName}>{name} </p>
    </div>


  );
}

export default BurgerIngredient
