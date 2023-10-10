import React, { useState, useCallback } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./BurgerIngredients.module.css";

import  Modal  from "../Modal/Modal";
import  IngredientDetails  from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types"; // Импортируйте PropTypes


 function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one");

  return (
    <section>
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div className={burgerIngredients.tab}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <section className={burgerIngredients.scroller}>
        <IngredientsContainer
          header="Булки"
          cardsArr={data.filter((el) => {
            return el.type === "bun";
          })}
        />
        <IngredientsContainer
          header="Соусы"
          cardsArr={data.filter((el) => {
            return el.type === "sauce";
          })}
        />
        <IngredientsContainer
          header="Начинки"
          cardsArr={data.filter((el) => {
            return el.type === "main";
          })}
        />
      </section>
    </section>
  );
}

function IngredientsContainer({ header, cardsArr }) {
  return (
    <>
      <h2 className={burgerIngredients.header}>{header}</h2>
      <div className={burgerIngredients.container}>
        {cardsArr.map((el) => {
          return <Ingredient el={el} key={el._id} />;
        })}
      </div>
    </>
  );
}

function Ingredient({ el }) {
  const [count, setCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = useCallback(() => setModalIsOpen(false), []);

  return (
    <>
      <section
        className={burgerIngredients.ingredient}
        onClick={() => setModalIsOpen(true)}
      >
        <img src={`${el.image}`} alt={el.name} />
        {el.count > 0 && <Counter count={el.count} size="default" />}
        <div className={burgerIngredients.price}>
          <div className={burgerIngredients.number}>{el.price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerIngredients.description}>{el.name}</div>
      </section>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title="Детали ингредиента">
          <IngredientDetails el={el} />
        </Modal>
      )}
    </>
  );
}



// Определите PropTypes для свойства "data"
BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired, // Пример проверки для свойства "data"
};

export default BurgerIngredients