import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../components/Card/CardNotification/CardNotification.module.css";
import {
  notificationTypeChatRoomNewMessage,
  notificationTypeChatRoomRandomCompensation,
  notificationTypeChatRoomRandomInitiated,
  notificationTypeCommentNew,
  notificationTypeFollow,
  notificationTypeFollowed,
  notificationTypeFriendNew,
  notificationTypeLike,
  notificationTypeMatched,
  notificationTypeMessageNew,
  notificationTypeShare,
  notificationTypeFriendRequest_gotNewFriendRequest,
  notificationTypeFriendRequest_becameFriends,
} from "../../data/constants/notificationConstants";

const useCardNotification = (notification) => {
  // console.log("notification", notification);

  const navigate = useNavigate();

  const entityId = useMemo(() => {
    return notification ? notification.entityId : null;
  }, [notification]);
  const read = useMemo(() => {
    return notification ? notification.read : null;
  }, [notification]);

  const classNameReadOrNot = useMemo(() => {
    switch (read) {
      case true:
        return classes.read;
      case false:
        return classes.notRead;

      default:
        return null;
    }
  }, [read]);

  const notificationType = useMemo(() => {
    return notification ? notification.notificationType : null;
  }, [notification]);

  const strNotification = useMemo(() => {
    switch (notificationType) {
      case notificationTypeFollow:
        return "";
      case notificationTypeFollowed:
        return "他のユーザーがあなたをフォローしました！";
      case notificationTypeFriendNew:
        return "新しい友達ができました！";
      case notificationTypeChatRoomNewMessage:
        return "新しいメッセージが届きました！";
      case notificationTypeMessageNew:
        return "新しいメッセージが届きました！";
      case notificationTypeShare:
        return "他のユーザーがあなたの投稿をシェアしました！";
      case notificationTypeLike:
        return "他のユーザーがあなたの投稿にいいねしました！";
      case notificationTypeMatched:
        return "チャットがマッチしました！";
      case notificationTypeChatRoomRandomInitiated:
        return "チャットがマッチしました！";
      case notificationTypeCommentNew:
        return "あなたの投稿にコメントが届きました！";
      case notificationTypeChatRoomRandomCompensation:
        return "AI会話の無料枠が付与されました！";
      case notificationTypeFriendRequest_gotNewFriendRequest:
        return "友達申請が届きました！";
      case notificationTypeFriendRequest_becameFriends:
        return "新しい友達ができました！";
      default:
        return "";
    }
  }, [notificationType]);

  const linkNotification = useMemo(() => {
    switch (notificationType) {
      case notificationTypeFollow:
        return `/followFollower/follow`;
      case notificationTypeFollowed:
        return `/followFollower/follower`;
      case notificationTypeFriendNew:
        return `/friends`;
      case notificationTypeChatRoomNewMessage:
      case notificationTypeMessageNew:
      case notificationTypeMatched:
      case notificationTypeChatRoomRandomInitiated:
        return `/chatroom/${entityId}`;
      case notificationTypeShare:
        return `/arasuzydetail/${entityId}`;
      case notificationTypeLike:
        return `/arasuzydetail/${entityId}`;
      // case notificationTypeMatched:
      //   return `/chatroom/${entityId}`;
      // case notificationTypeChatRoomRandomInitiated:
      //   return `/chatroom/${entityId}`;
      case notificationTypeCommentNew:
        return `/arasuzydetail/${entityId}`;
      case notificationTypeChatRoomRandomCompensation:
        return `/chatroom/ai`;
      case notificationTypeFriendRequest_gotNewFriendRequest:
      case notificationTypeFriendRequest_becameFriends:
        return `/user/${entityId}`;

      default:
        return "";
    }
  }, [notificationType, entityId]);

  const jumpToThePageOfNotification = useCallback(() => {
    if (linkNotification) {
      navigate(linkNotification);
    }
  }, [linkNotification, navigate]);

  return {
    strNotification,
    entityId,
    read,
    classNameReadOrNot,
    linkNotification,
    jumpToThePageOfNotification,
  };
};

export default useCardNotification;
