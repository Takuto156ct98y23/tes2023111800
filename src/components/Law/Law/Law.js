import classes from "./Law.module.css";

const Law = ({ title, text }) => {
  return (
    <div className={classes.Law}>
      <div className={classes.titleWrapper}>
        <h6 className={classes.title}>{title}</h6>
      </div>
      <div className={classes.textWrapper}>
        <p className={classes.text}>{text}</p>
      </div>
    </div>
  );
};

export default Law;
