import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  CLEAR_NUMBER,
} from "../actions/orderSubmit";

// Определяем начальное состояние для деталей заказа
const orderDetailsState = {
  orderNumber: "",
  loading: false,
  error: "",
};

// Создаем редуктор `orderReducer` для управления состоянием деталей заказа
export const orderReducer = (state = orderDetailsState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      // Обрабатываем начало запроса
      return { orderNumber: "", loading: true, error: "" };
    }
    case ORDER_SUCCESS: {
      // Обрабатываем успешный заказ и получение номера заказа
      return {
        loading: false,
        error: "",
        orderNumber: action.payload,
      };
    }
    case ORDER_FAIL: {
      // Обрабатываем ошибку при заказе
      return {
        loading: false,
        error: action.payload,
        orderNumber: "",
      };
    }
    case CLEAR_NUMBER: {
      // Очищаем номер заказа и сбрасываем состояние
      return { orderNumber: "", loading: false, error: "" };
    }
    default: {
      return state;
    }
  }
};
