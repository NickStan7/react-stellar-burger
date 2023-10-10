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
    <div className={styles.appHeader}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <div className="pl-5" style={{ display: "flex", alignItems: "center" }}>
          <BurgerIcon type="primary" />
          <span className="pl-2 pr-5 pb-4 pt-4"> Конструктор</span>
        </div>
        <div
          className="pl-5 ml-2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ListIcon type="secondary" />
          <span
            className="pl-2  pr-5 pb-4 pt-4 mr-25"
            style={{ color: "rgba(133, 133, 173, 1)" }}
          >
            Лента заказов
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Logo />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginLeft: 289,
        }}
      >
        <ProfileIcon type="secondary" />
        <span className="pr-5" style={{ color: "rgba(133, 133, 173, 1)" }}>
          Личный кабинет
        </span>
      </div>
    </div>
  );
}
export default AppHeader;
