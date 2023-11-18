import { Fragment } from "react";
import classes from "./FormMessageErrorTemplate.module.css";

const FormMessageErrorTemplate = ({ isError, message }) => {
  return (
    <Fragment>
      {isError ? (
        <div className={classes.FormMessageErrorTemplate}>{message}</div>
      ) : null}
    </Fragment>
  );
};

export default FormMessageErrorTemplate;
