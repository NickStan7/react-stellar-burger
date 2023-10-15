import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Импортируем PropTypes
import styles from "./app.module.css";
import axios from "axios";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const [data, setData] = useState([]);

  const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    const config = {
      method: "get",
      url: apiUrl,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        const data = JSON.parse(JSON.stringify(response?.data?.data));

        setData(data ?? []);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {/* Передаем свойство "data" компонентам */}
        <BurgerIngredients  data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}



export default App;
