import React from 'react'
import {data} from '../../utils/data'
import styles from "../BurgerIngredients/BurgerIngredients.module.css";
import BurgerIngredient from "../../components/BurgerIngredient/BurgerIngredient"

function BurgerIngredients() {
    return (
      <div className={styles.BurgerIngredients}>
        <h2 style={{ marginLeft: 0 }}>Соберите бургер</h2>
        <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
          <h3 style={{ minWidth: 200, textAlign: 'center' }}>Булки</h3>
          <h3 style={{ minWidth: 200, textAlign: 'center' }}>Соусы</h3>
          <h3 style={{ minWidth: 200, textAlign: 'center' }}>Начинки</h3>
          {/* Сюда добавьте компоненты для отображения булок */}
        </div>
  
        <h2 style={{ marginLeft: 0 }}>Булки</h2>
  
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <BurgerIngredient image={data[0].image} price={data[0].price} name ={data[0].name} />
          <BurgerIngredient image={data[14].image} price={data[14].price} name ={data[14].name} />
      
        </div>
  
        <h2 style={{ marginLeft: 0 }}>Соусы</h2>
  
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <BurgerIngredient image={data[3].image} price={data[3].price} name ={data[3].name} />
          <BurgerIngredient image={data[5].image} price={data[5].price} name ={data[5].name} />
          <BurgerIngredient image={data[6].image} price={data[6].price} name ={data[6].name} />
          <BurgerIngredient image={data[9].image} price={data[9].price} name ={data[9].name} />
        </div>
  
        <h2 style={{ marginLeft: 0 }}>Начинки</h2>
  
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <BurgerIngredient image={data[1].image} price={data[1].price} name ={data[1].name} />
        <BurgerIngredient image={data[2].image} price={data[2].price} name ={data[2].name} />
        <BurgerIngredient image={data[4].image} price={data[4].price} name ={data[4].name} />
        <BurgerIngredient image={data[7].image} price={data[7].price} name ={data[7].name} />
        <BurgerIngredient image={data[8].image} price={data[8].price} name ={data[8].name} />
        <BurgerIngredient image={data[10].image} price={data[10].price} name ={data[10].name} />
        <BurgerIngredient image={data[11].image} price={data[11].price} name ={data[11].name} />
        <BurgerIngredient image={data[12].image} price={data[12].price} name ={data[12].name} />
        <BurgerIngredient image={data[13].image} price={data[13].price} name ={data[13].name} />
        </div>
      </div>
    );
  }
  
  
  
  
  
  

export default BurgerIngredients
