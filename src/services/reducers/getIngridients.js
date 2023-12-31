import {
  FETCH_INGREDIENT_REQUEST,
  FETCH_INGREDIENT_SUCCESS,
  FETCH_INGREDIENT_FAILURE,
  INCREMENT_INGREDIENT_QUANTITY,
  DECREMENT_INGREDIENT_QUANTITY,
} from "../actions/getIngridients";

// Определяем начальное состояние для ингредиентов
const ingredientsInitialState = {
  items: [],
  loading: false,
  error: "",
};

// Создаем редуктор `ingredientsReducer` для управления состоянием ингредиентов
export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENT_REQUEST: {
      // Обрабатываем начало запроса на получение ингредиентов
      return { items: [], loading: true, error: "" };
    }
    case FETCH_INGREDIENT_SUCCESS: {
      // Обрабатываем успешное получение ингредиентов
      return { items: action.payload, loading: false, error: "" };
    }
    case FETCH_INGREDIENT_FAILURE: {
      // Обрабатываем ошибку при получении ингредиентов
      return { items: [], loading: false, error: action.payload };
    }
    case INCREMENT_INGREDIENT_QUANTITY: {
      // Обрабатываем увеличение количества ингредиента
      const ingredientId = action.payload;
      const isBunPresent = state.items.some(
        (el) => el.type === "bun" && el._id === ingredientId
      );
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.type === "bun" && el._id === ingredientId) {
            el.orderedQuantity = 2;
            return el;
          }
          if (el.type === "bun" && el._id !== ingredientId && isBunPresent) {
            el.orderedQuantity = 0;
            return el;
          }
          if (el._id === ingredientId) {
            if (!("orderedQuantity" in el)) {
              el.orderedQuantity = 1;
              return el;
            }
            el.orderedQuantity = el.orderedQuantity + 1;
          }
          return el;
        }),
      };
    }
    case DECREMENT_INGREDIENT_QUANTITY: {
      // Обрабатываем уменьшение количества ингредиента
      const ingredientId = action.payload;
      return {
        ...state,
        items: state.items.map((el) => {
          if (el._id === ingredientId) {
            if (!("orderedQuantity" in el)) {
              return el;
            }
            const decrementedValue = el.orderedQuantity - 1;
            el.orderedQuantity = decrementedValue >= 0 ? decrementedValue : 0;
          }
          return el;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
