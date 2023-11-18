import { Fragment } from "react";
import classes from "./FormMessageTemplate.module.css";

const FormMessageTemplate = ({ message }) => {
  return (
    <Fragment>
      {message ? (
        <div className={classes.FormMessageTemplate}>{message}</div>
      ) : null}
    </Fragment>
  );
};

export default FormMessageTemplate;
