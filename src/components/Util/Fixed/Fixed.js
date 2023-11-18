import classes from "./Fixed.module.css";

const Fixed = (props) => {
  return <div className={classes.Fixed}>{props.children}</div>;
};

export default Fixed;
