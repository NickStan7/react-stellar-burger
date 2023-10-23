import { ingredientDetailsReducer } from "./ingridientDetails";
import { combineReducers } from "redux";
import { orderReducer } from "./orderSubmit";
import { ingredientsReducer } from "./getIngridients";
import { constructorReducer } from "./constructor";



export default combineReducers({
  orderReducer,
  constructorReducer,
  ingredientsReducer,
  ingredientDetailsReducer,
});