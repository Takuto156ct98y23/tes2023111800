import classes from "./CardNotification.module.css";

import useCardNotification from "../../../hooks/Notification/useCardNotification";
import { Fragment } from "react";

const CardNotification = ({ notification }) => {
  return (
    <Fragment>
      {notification ? <AreaNotification notification={notification} /> : null}
    </Fragment>
  );
};

export default CardNotification;

const AreaNotification = ({ notification }) => {
  const { strNotification, classNameReadOrNot, jumpToThePageOfNotification } =
    useCardNotification(notification);

  return (
    <div className={`${classes.AreaNotification} ${classNameReadOrNot}`}>
      <div
        className={classes.AreaNotification__messageWrapper}
        onClick={jumpToThePageOfNotification}
      >
        <p className={classes.AreaNotification__messageWrapper__message}>
          {strNotification}
        </p>
      </div>
    </div>
  );
};
