import combineReducers from "./reducers";
import { createStore } from 'redux';
import reducer from './rootReducer'; // Замените 'ваш_редюсер' на путь к вашему редюсеру

const store = createStore(combineReducers);

export default store;