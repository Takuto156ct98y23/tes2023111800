import { NavLink } from "react-router-dom";
import classes from "./SidebarItem.module.css";

const SidebarItem = ({ category, to, name, otherClassNames = "" }) => {
  return category ? (
    <p className={classes.category}>{category}</p>
  ) : (
    <NavLink
      className={`${classes.navLink} ${otherClassNames}`}
      to={to}
    >{`${name}`}</NavLink>
  );
};

export default SidebarItem;
