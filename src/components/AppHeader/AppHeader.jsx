import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../AppHeader/AppHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.constructorOrderFeed}>
      <a href="#" className={styles.constructor}>
          <BurgerIcon type="primary"/>
          <span className="pl-2 pr-5 pb-4 pt-4"> Конструктор</span>
        </a>
        <a href="#" className={styles.orderFeed}>
          <ListIcon type="secondary" />
          <span className="pl-2  pr-5 pb-4 pt-4 mr-25">Лента заказов</span>
        </a>
      </div>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <a href="#" className={styles.personalArea}>
        <ProfileIcon type="secondary" />
        <span className="pr-5 ml-2">Личный кабинет</span>
      </a>
    </header>
  );
}
export default AppHeader;
