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

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  useEffect(() => {
    const config = {
      method: "get",
      url: apiUrl,
      headers: {},
    };

    axios(config)
    .then(function (response) {
      const data = JSON.parse(JSON.stringify(response?.data?.data));

      return data ?? [];
    })
    .then((data) => {
      // Выполните операции с данными здесь
      setData(data);

      // Затем вызовите checkResponse для проверки успешности выполнения запроса
      return checkResponse(data);
    })
    .catch(function (error) {
      console.log(error);
      // Если требуется дополнительная обработка ошибки, добавьте её здесь
    });
}, []);






  //Стоит добавить проверку успешности выполнения с помощью res.ok так как catch ловит
  //только ошибки в самом запросе, но если сервер вернет к примеру 400, то ее catch не поймает.
  //Теперь код более корректно обрабатывает успешное выполнение запроса и ошибки.

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {/* Передаем свойство "data" компонентам */}
        <BurgerIngredients  modalIsOpen={true} data={data} />
        <BurgerConstructor modalIsOpen={true} data={data} />
      </main>
    </div>
  );
}

export default App;
