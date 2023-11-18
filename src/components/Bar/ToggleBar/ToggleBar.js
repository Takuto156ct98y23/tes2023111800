/*
"src\App.js"で対応するrouteを設定する必要がある。
*/

import { NavLink } from "react-router-dom";
import classes from "./ToggleBar.module.css";

const ToggleBar = (props) => {
  const toggleData = props.toggleData;
  return (
    <div className={classes.ToggleBar}>
      {toggleData.map((data) => {
        return (
          <NavLink key={data.name} to={data.to}>
            {data.name}
          </NavLink>
        );
      })}
    </div>
  );
};
export default ToggleBar;
