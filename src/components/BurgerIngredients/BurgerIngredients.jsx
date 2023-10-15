import React, { useState, useCallback, useRef, useMemo  } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./BurgerIngredients.module.css";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("one");
  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);


  const filteredBunItems = useMemo(() => data.filter((el) => el.type === "bun"), [data]);
  const filteredSauceItems = useMemo(() => data.filter((el) => el.type === "sauce"), [data]);
  const filteredMainItems = useMemo(() => data.filter((el) => el.type === "main"), [data]);

  const handleButtonClick = (value) => {
    setCurrent(value);
    switch (value) {
      case "one":
        refOne.current.scrollIntoView({ block: "start", behavior: "smooth" });
        break;
      case "two":
        refTwo.current.scrollIntoView({ block: "start", behavior: "smooth" });
        break;
      case "three":
        refThree.current.scrollIntoView({ block: "start", behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <h1 className={burgerIngredients.heading}>Соберите бургер</h1>

      <div className={burgerIngredients.tab}>
        <Tab value="one" active={current === "one"} onClick={() => handleButtonClick("one")}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={() => handleButtonClick("two")}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={() => handleButtonClick("three")}>
          Начинки
        </Tab>
      </div>

     
      <section className={burgerIngredients.scroller}>
        <div ref={refOne}>
          <IngredientsContainer header="Булки" cardsArr={filteredBunItems} />
        </div>
        <div ref={refTwo}>
          <IngredientsContainer header="Соусы" cardsArr={filteredSauceItems} />
        </div>
        <div ref={refThree}>
          <IngredientsContainer header="Начинки" cardsArr={filteredMainItems} />
        </div>
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = useCallback(() => setModalIsOpen(false), []);

  return (
    <>
      <section
        className={burgerIngredients.ingredient}
        onClick={() => setModalIsOpen(true)}
      >
        <img src={`${el.image}`} alt={el.name} />
        <Counter count={1} size="default" extraClass="m-1" />
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


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  })).isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
};

export default BurgerIngredients;
