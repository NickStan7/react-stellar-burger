import { useEffect } from "react";

import app from "./app.module.css";

import AppHeader  from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsFunc } from "../../services/actions/getIngridients";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsFunc());
  }, []);

  return (
    <div className={app.app}>
      <AppHeader />
      <main className={app.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}
