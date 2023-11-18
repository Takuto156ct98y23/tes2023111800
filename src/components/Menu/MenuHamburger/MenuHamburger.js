import { slide as BurgerMenuSlide } from "react-burger-menu";
import classes from "./MenuHamburger.module.css";
import "./BurgerMenuSlide.css";

const MenuHamburger = (props) => {
  // return <BurgerMenuSlide>{props.children}</BurgerMenuSlide>;
  return (
    <div className={classes.MenuHamburger}>
      <div className={classes.areaMenu}>
        <BurgerMenuSlide className={classes.BurgerMenuSlide}>
          {props.children}
        </BurgerMenuSlide>
      </div>
    </div>
  );
};

export default MenuHamburger;
