import React from 'react'
import {Logo,BurgerIcon,ListIcon,ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "../AppHeader/AppHeader.module.css";

function AppHeader() {
  return (
    <div className={styles.appHeader}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <BurgerIcon type="primary" />
        <span style={{ color: 'white', padding: '0 48px 0 8px' }}>конструктор</span>
        <ListIcon type="primary" />
        <span  style={{ color: 'white', padding: '0 0 0 8px', marginRight: 132 } }>лента заказов</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Logo className="logo" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end',marginLeft: 289 }}>
        <ProfileIcon type="primary" />
        <span style={{ color: 'white', padding: '0 0 0 8px' }}>личный кабинет</span>
      </div>
    </div>
  );
}

export default AppHeader


