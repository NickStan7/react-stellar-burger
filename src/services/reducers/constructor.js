// Импортируем константы действий из соответствующего файла
import {
  REMOVE_COMPONENT,
  ADD_COMPONENT,
  CHANGE_COMPONENT_POSITION,
} from "../actions/constructor";

// Импортируем библиотеку `immutability-helper`
import update from "immutability-helper";

// Определяем редуктор `constructorReducer`, который будет обрабатывать действия
export const constructorReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COMPONENT: {
      // В случае действия ADD_COMPONENT
      const isBun = action.payload.type === "bun";
      const hasBun = state.some((el) => el.type === "bun");

      if (isBun && hasBun) {
        // Если добавляемый элемент - булка, и булка уже существует, заменяем её
        return state.map((el) => (el.type === "bun" ? action.payload : el));
      }

      // В противном случае, добавляем элемент в массив состояния
      return [...state, action.payload];
    }
    case REMOVE_COMPONENT: {
      // В случае действия REMOVE_COMPONENT
      if (state.some((el) => el.type === "bun")) {
        // Если булка существует, удаляем элемент по корректному индексу
        const filtered = state.filter(
          (el, index) => index !== action.payload + 1
        );
        return filtered;
      }

      // В противном случае, удаляем элемент по индексу
      const filtered = state.filter((el, index) => index !== action.payload);
      return filtered;
    }
    case CHANGE_COMPONENT_POSITION: {
      // В случае действия CHANGE_COMPONENT_POSITION
      const { firstElIndex, secondElIndex } = action.payload;

      const newArr = [...state];
      const filtered = newArr.filter((el) => el.type !== "bun");

      const updated = update(filtered, {
        $splice: [
          [firstElIndex, 1],
          [secondElIndex, 0, filtered[firstElIndex]],
        ],
      });

      const bunIngredient = newArr.find((el) => {
        return el.type === "bun";
      });

      updated.push(bunIngredient);
      updated.unshift(bunIngredient);
      return updated;
    }

    default: {
      // Если действие не определено, возвращаем текущее состояние
      return state;
    }
  }
};
