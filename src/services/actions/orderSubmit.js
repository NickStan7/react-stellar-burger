import axios from "axios";
import { BASE_URL } from "./getIngridients";

// Определяем константы для действий заказа
const ORDER_REQUEST = "ORDER_REQUEST";
const ORDER_SUCCESS = "ORDER_SUCCESS";
const ORDER_FAIL = "ORDER_FAIL";
const CLEAR_NUMBER = "CLEAR_NUMBER";

// Создаем функцию для отправки заказа и получения его идентификатора
function submitOrderAndGetId(dataArray, callback) {
  return function (dispatch) {
    const arrayOfIds = dataArray.map((el) => {
      return el._id;
    });

    const data = JSON.stringify({
      ingredients: arrayOfIds,
    });

    const orderRequestConfig = {
      method: "post",
      url: `${BASE_URL}/orders`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    // Диспатчим действие ORDER_REQUEST, чтобы обозначить начало запроса
    dispatch({ type: ORDER_REQUEST });

    axios(orderRequestConfig)
      .then(function (response) {
        const order = response.data;
        const orderNum = order.order.number;

        // Диспатчим действие ORDER_SUCCESS с номером заказа и вызываем callback
        dispatch({ type: ORDER_SUCCESS, payload: orderNum });
        callback();
      })
      .catch(function (error) {
        console.log(error);
        // В случае ошибки диспатчим действие ORDER_FAIL с сообщением об ошибке
        dispatch({ type: ORDER_FAIL, payload: error.message });
      });
  };
}

// Создаем функции для действий заказа
function orderNumberRequest() {
  return {
    type: ORDER_REQUEST,
  };
}

function orderNumberSuccess(orderNumber) {
  return {
    type: ORDER_SUCCESS,
    payload: orderNumber,
  };
}

function orderNumberFailure(error) {
  return {
    type: ORDER_FAIL,
    payload: error,
  };
}

function clearOrderNumber() {
  return {
    type: CLEAR_NUMBER,
  };
}

// Экспортируем все константы и функции для использования в других частях приложения
export {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  CLEAR_NUMBER,
  orderNumberRequest,
  orderNumberSuccess,
  orderNumberFailure,
  clearOrderNumber,
  submitOrderAndGetId,
};
