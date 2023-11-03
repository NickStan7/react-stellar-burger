import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import burgerConstructor from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { clearOrderNumber } from "../../services/actions/orderSubmit";
import { submitOrderAndGetId } from "../../services/actions/orderSubmit";
import OrderDetails from "../OrderDetails/OrderDetails";

import { useDrag, useDrop } from "react-dnd";
import {
  INCREMENT_INGREDIENT_QUANTITY,
  DECREMENT_INGREDIENT_QUANTITY,
} from "../../services/actions/getIngridients";
import {
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  CHANGE_COMPONENT_POSITION,
} from "../../services/actions/constructor";

import { v4 as uuidv4 } from "uuid";

// Обновленный action creator
export const addIngredient = (item) => {
  const ingredientWithUUID = {
    ...item,
    uniqueId: uuidv4()
  };

  return {
    type: ADD_COMPONENT,
    payload: ingredientWithUUID
  };
}

export function BurgerConstructor() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const ingredients = useSelector((store) => store.constructorReducer);
  const dispatch = useDispatch();

  const outerBun = useMemo(
    () =>
      ingredients.find((el) => {
        return el.type === "bun";
      }),
    [ingredients]
  );

  const ingredientsArray = useMemo(
    () =>
      ingredients.filter((el) => {
        return el.type !== "bun";
      }),
    [ingredients]
  );

  const submitOrder = (ingredientsArray) => {
    const ingredientTypes = ingredientsArray.map((el) => el.type);
    const bunIsPresent = ingredientTypes.some((el) => el === "bun");
    const mainIsPresent = ingredientTypes.some((el) => el === "main");
    const sauceIsPresent = ingredientTypes.some((el) => el === "sauce");

    const ingredientsArrayCopy = [...ingredientsArray];
    const bunIngredient = ingredientsArrayCopy.find((el) => el.type === "bun");
    ingredientsArrayCopy.push(bunIngredient);

    if (bunIsPresent && (mainIsPresent || sauceIsPresent)) {
      dispatch(
        submitOrderAndGetId(ingredientsArrayCopy, () => setModalIsOpen(true))
      );
    }
  };

  const handleModalClose = useCallback(() => {
    setModalIsOpen(false);
    dispatch(clearOrderNumber());
  }, []);

  return (
    <section className={burgerConstructor.section}>
      <ConstructorIngredient
        outerBun={outerBun}
        ingredientsArray={ingredientsArray}
        dataArr={ingredients}
        setTotalPrice={setTotalPrice}
      />

      <div className={burgerConstructor.total}>
        <div className={burgerConstructor.amount}>
          <div className={burgerConstructor.price}>{totalPrice}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            submitOrder(ingredients);
          }}
        >
          Оформить заказ
        </Button>
      </div>

      {modalIsOpen && (
        <Modal onClose={handleModalClose} title={null}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

function ConstructorIngredient({ ingredientsArray, outerBun, setTotalPrice }) {
  useEffect(() => {
    if (ingredientsArray.length !== 0 || outerBun) {
      const sum = ingredientsArray.reduce((prev, current) => {
        return prev + current?.price;
      }, 0);
      const bunsPrice = outerBun?.price ? outerBun?.price * 2 : 0;
      const totalPrice = sum + bunsPrice;
      setTotalPrice(totalPrice);
    }
  });

  const dispatch = useDispatch();

  const ingredientsDictionary = useSelector(
    (store) => store.ingredientsReducer
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      const ingredient = ingredientsDictionary.items.find(
        (item) => item._id === itemId.id
      );

      if (ingredient) {
        dispatch(addIngredient(ingredient)); // Используем обновленный action creator
        dispatch({
          type: INCREMENT_INGREDIENT_QUANTITY,
          payload: itemId.id,
        });
      }
    }
  });
  return (
    <div ref={dropTarget}>
      {!outerBun && ingredientsArray.length === 0 && (
        <h3 className={burgerConstructor.empty}>Выберите ингредиенты</h3>
      )}

      {outerBun && (
        <div className={burgerConstructor.margin}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${outerBun?.name ?? ""} (верх)`}
            price={outerBun?.price ?? 0}
            thumbnail={outerBun?.image}
          />
        </div>
      )}
      <div className={burgerConstructor.scroller} ref={dropTarget}>
        <div>
          {ingredientsArray.map((el, i) => {
            return <InnerIngredient index={i} el={el} key={el.uniqueId} />;
          })}
        </div>
      </div>

      {outerBun && (
        <div className={burgerConstructor.margin}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${outerBun?.name} (низ)`}
            price={outerBun?.price}
            thumbnail={outerBun?.image}
          />
        </div>
      )}
    </div>
  );
}

const InnerIngredient = ({ index, el }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDrag }, drag] = useDrag({
    type: "newType",
    item: { id: el._id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    })
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "newType",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (dragIndex !== undefined && hoverIndex !== undefined) {
        dispatch({
          type: CHANGE_COMPONENT_POSITION,
          payload: {
            firstElIndex: dragIndex,
            secondElIndex: hoverIndex,
          },
        });
      }

      item.index = hoverIndex;
    }
  });

  const removeIngredient = (ingredientId, index) => {
    dispatch({
      type: REMOVE_COMPONENT,
      payload: index,
    });
    dispatch({
      type: DECREMENT_INGREDIENT_QUANTITY,
      payload: ingredientId,
    });
  };

  drag(drop(ref));

  return (
    <div ref={ref} className={burgerConstructor.container}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => {
          removeIngredient(el._id, index);
        }}
      />
    </div>
  );
};

export default BurgerConstructor;
