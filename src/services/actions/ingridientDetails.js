const GET_INFO = "GET_INFO";
const CLEAR_INFO = "CLEAR_INFO";

function getIngredientInfo(data) {
  return {
    type: GET_INFO,
    payload: data,
  };
}

function clearIngredientInfo() {
  return {
    type: CLEAR_INFO,
  };
}

export {
  GET_INFO,
  CLEAR_INFO,
  getIngredientInfo,
  clearIngredientInfo,
};
