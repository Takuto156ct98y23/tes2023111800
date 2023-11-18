import { useMemo } from "react";
import classes from "./FriendRequestStatus.module.css";
import {
  friendRequestStatus_accepted,
  friendRequestStatus_notSent,
  friendRequestStatus_pending_fromViewedUser,
  friendRequestStatus_pending_toViewedUser,
} from "../../../data/constants/friendConstants";

const messageFrom = "友達申請が届いています！";
const messageTo = "友達申請を送信しました！";

const FriendRequestStatus = ({ status, viewedUserName = null }) => {
  const message = useMemo(() => {
    switch (status) {
      case friendRequestStatus_notSent:
        return null;
      case friendRequestStatus_pending_fromViewedUser:
        return viewedUserName
          ? `${viewedUserName}さんから${messageFrom}`
          : messageFrom;
      case friendRequestStatus_pending_toViewedUser:
        return viewedUserName
          ? `${viewedUserName}さんに${messageTo}`
          : messageTo;
      case friendRequestStatus_accepted:
        return "このユーザーと友達です";
      default:
        return null;
    }
  }, [status, viewedUserName]);

  return (
    <div className={classes.FriendRequestStatus}>
      <p>{message}</p>
    </div>
  );
};

export default FriendRequestStatus;
