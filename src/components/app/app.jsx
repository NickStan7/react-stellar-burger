import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients"


function App() {
  return (<>
    <div className={styles.app}>
      <AppHeader/>
    </div>
    <div style={{ display: 'flex',justifyContent: "center"}}><BurgerIngredients/><BurgerIngredients/></div>
    
    </>
  );
}

export default App;


