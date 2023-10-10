import React from "react";
import ingredientDetails from "./IngredientDetails.module.css";
import PropTypes from "prop-types"; // Импортируйте PropTypes


 function IngredientDetails({ el }) {
  return (
    <div className={ingredientDetails.container}>
      <img src={el.image} className={ingredientDetails.img} alt={el.name} />
      <h3 className={ingredientDetails.description}>{el.name}</h3>
      <div className={ingredientDetails.nutrition}>
        <div>
          <h4 className={ingredientDetails.name}>Калории,ккал</h4>
          <div className={ingredientDetails.number}>{el.calories}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Белки, г</h4>
          <div className={ingredientDetails.number}>{el.proteins}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Жиры, г</h4>
          <div className={ingredientDetails.number}>{el.fat}</div>
        </div>
        <div>
          <h4 className={ingredientDetails.name}>Углеводы, г</h4>
          <div className={ingredientDetails.number}>{el.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
    el: PropTypes.shape({
      image: PropTypes.string.isRequired, // Свойство image должно быть строкой и обязательным
      name: PropTypes.string.isRequired, // Свойство name должно быть строкой и обязательным
      calories: PropTypes.number.isRequired, // Свойство calories должно быть числом и обязательным
      proteins: PropTypes.number.isRequired, // Свойство proteins должно быть числом и обязательным
      fat: PropTypes.number.isRequired, // Свойство fat должно быть числом и обязательным
      carbohydrates: PropTypes.number.isRequired, // Свойство carbohydrates должно быть числом и обязательным
    }).isRequired,
  };
export default IngredientDetails