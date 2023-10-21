import axios from "axios";
export const BASE_URL = "https://norma.nomoreparties.space/api";

const getIngredients = {
  method: "get",
  url: `${BASE_URL}/ingredients`,
  headers: {},
};

// Типы для экшенов загрузки ингредиентов
export const FETCH_INGREDIENT_REQUEST = "FETCH_INGREDIENT_REQUEST";
export const FETCH_INGREDIENT_SUCCESS = "FETCH_INGREDIENT_SUCCESS";
export const FETCH_INGREDIENT_FAILURE = "FETCH_INGREDIENT_FAILURE";

// Типы для экшенов увеличения и уменьшения количества ингредиентов
export const INCREMENT_INGREDIENT_QUANTITY = "INCREMENT_INGREDIENT_QUANTITY";
export const DECREMENT_INGREDIENT_QUANTITY = "DECREMENT_INGREDIENT_QUANTITY";

// Экшен для запроса ингредиентов
export const fetchIngredientRequest = () => ({
  type: FETCH_INGREDIENT_REQUEST,
});

// Экшен для успешного получения ингредиентов
export const fetchIngredientSuccess = (data) => ({
  type: FETCH_INGREDIENT_SUCCESS,
  payload: data,
});

// Экшен для ошибки при получении ингредиентов
export const fetchIngredientFailure = (error) => ({
  type: FETCH_INGREDIENT_FAILURE,
  payload: error,
});

// Функция для загрузки ингредиентов
export const getIngredientsFunc = () => (dispatch) => {
  dispatch(fetchIngredientRequest());
  axios(getIngredients)
    .then((response) => {
      const data = response?.data?.data;
      dispatch(fetchIngredientSuccess(data ?? []));
    })
    .catch((error) => {
      console.error(error);
      dispatch(fetchIngredientFailure(error.message));
    });
};
