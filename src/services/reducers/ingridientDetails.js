
  import {
    GET_INFO,
    CLEAR_INFO,
  } from "../actions/ingridientDetails";
  
  const defaultIngredientState = null;
  
  export const ingredientDetailsReducer = (
    state = defaultIngredientState,
    action
  ) => {
    switch (action.type) {
      case GET_INFO: {
        return { ...action.payload };
      }
      case CLEAR_INFO: {
        return null;
      }
      default:
        return state;
    }
  };