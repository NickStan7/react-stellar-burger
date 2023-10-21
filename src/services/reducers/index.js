import { ingredientDetailsReducer } from "./ingridientDetails";
import { combineReducers } from "redux";
import { orderDetailsReducer } from "./orderSubmit";
import { ingredientsReducer } from "./getIngridients";
import { constructorReducer } from "./constructor";



export default combineReducers({
  orderDetailsReducer,
  constructorReducer,
  ingredientsReducer,
  ingredientDetailsReducer,
});