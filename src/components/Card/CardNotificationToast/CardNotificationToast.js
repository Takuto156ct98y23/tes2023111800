import { useNavigate } from "react-router-dom";
import classes from "./CardNotificationToast.module.css";
import { useCallback } from "react";

/*
notificationToastのお知らせに何か機能を持たせたい時に使う。

以下のようにして使う。

  displayNotificationPlain(
          <CardNotificationToast
            text={"新しいメッセージが届きました！🎉"}
            path={`/chatroom/${chatRoomId}`}
          />,
          {
            autoClose: timeToMilliseconds(300, "second"),
          }
        );

*/

const CardNotificationToast = ({ text, path = null, onClick = null }) => {
  const navigate = useNavigate();

  const onClickHandler = useCallback(() => {
    if (path) {
      navigate(path);
    }
    if (onClick) {
      onClick();
    }
  }, [navigate, onClick, path]);

  return (
    <div className={classes.CardNotificationToast} onClick={onClickHandler}>
      <p className={classes.CardNotificationToast__text}>{text}</p>
    </div>
  );
};

export default CardNotificationToast;
