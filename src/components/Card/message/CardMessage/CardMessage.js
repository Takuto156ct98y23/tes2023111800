import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import classes from "./CardMessage.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import UserImage from "../../../UserImage/UserImage";
import { useNavigate, useParams } from "react-router-dom";
import SentenceData from "../../../SentenceData/SentenceData";
import CardMessageText from "../CardMessageText/CardMessageText";
import { getTextBySegmentObjs } from "../../../../utils/message/utilsMessage";

const CardMessage = ({ obj }) => {
  const message = obj;

  return (
    <Fragment>
      {message ? <AreaCardMessage message={message} /> : null}
    </Fragment>
  );
};

export default CardMessage;

const AreaCardMessage = ({ message }) => {
  // const { modalIsOpen, openModal, closeModal } = useModal();

  const { sentenceDataIsOpen, toggleSentenceData } = useSentenceData();

  const textBySegmentObjs = useMemo(() => {
    const segmentObjs = message?.segmentObjs;

    return segmentObjs ? getTextBySegmentObjs({ segmentObjs }) : null;
  }, [message]);

  // useEffect(() => {
  //   console.log({ textBySegmentObjs });
  // }, [textBySegmentObjs]);

  return (
    <div className={classes.AreaCardMessage}>
      <Content message={message} onClick={toggleSentenceData} />

      {sentenceDataIsOpen ? (
        <SentenceData sentence={textBySegmentObjs} />
      ) : null}
    </div>
  );
};

const useSentenceData = () => {
  const [sentenceDataIsOpen, setSentenceDataIsOpen] = useState(false);

  // 自分のメッセージ一覧は、学習の利便性向上のため、sentenceDataIsOpenのデフォルトをtrueにする。
  // 20230901追記：一旦defaultはfalseに戻す
  const params = useParams();
  useEffect(() => {
    // if (params?.chatRoomId === "me") {
    //   setSentenceDataIsOpen(true);
    // }
  }, [params]);

  const toggleSentenceData = useCallback(() => {
    setSentenceDataIsOpen((prev) => !prev);
  }, []);
  const openSentenceData = useCallback(() => {
    setSentenceDataIsOpen(true);
  }, []);
  const closeSentenceData = useCallback(() => {
    setSentenceDataIsOpen(false);
  }, []);

  return {
    sentenceDataIsOpen,
    toggleSentenceData,
    openSentenceData,
    closeSentenceData,
  };
};

const Content = ({ message, onClick = null }) => {
  const { meId } = useMe();
  const user = useMemo(() => {
    return message.userId;
  }, [message.userId]);

  const isMyMessage = useMemo(() => {
    return meId === user?._id;
  }, [meId, user?._id]);

  const navigate = useNavigate();
  const jumpToUserPage = useCallback(() => {
    navigate(user ? `/user/${user._id}` : null);
  }, [navigate, user]);

  const onClickHandlerContent = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <div
      className={`${classes.Content} ${
        isMyMessage
          ? classes.CardMessage_isMyMessage
          : classes.CardMessage_isNotMyMessage
      }`}
      onClick={onClickHandlerContent}
    >
      <div
        className={`${classes.top} ${
          isMyMessage ? classes.top_isMyMessage : classes.top_isNotMyMessage
        }`}
      >
        {/* 名前を際限なく長くできるようにこの位置 */}
        <p
          onClick={jumpToUserPage}
          className={`${classes.name} ${
            isMyMessage ? classes.name_isMyMessage : classes.name_isNotMyMessage
          }`}
        >
          {user?.name ? user?.name : "匿名ユーザー"}
        </p>
      </div>
      <div
        className={`${classes.button} ${
          isMyMessage
            ? classes.button_isMyMessage
            : classes.button_isNotMyMessage
        }`}
      >
        <div className={classes.button__cell_UserImage}>
          {isMyMessage ? null : (
            <AreaUserImage user={user} isMyMessage={isMyMessage} />
          )}
        </div>

        <AreaMessage message={message} isMyMessage={isMyMessage} />

        <div className={classes.button__cell_UserImage}>
          {isMyMessage ? (
            <AreaUserImage user={user} isMyMessage={isMyMessage} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const AreaUserImage = ({ user, isMyMessage }) => {
  return (
    <div
      className={`${classes.wrapperUserImage} ${
        isMyMessage
          ? classes.wrapperUserImage_isMyMessage
          : classes.wrapperUserImage_isNotMyMessage
      }`}
    >
      <UserImage className={classes.UserImage} user={user} />
    </div>
  );
};

const AreaMessage = ({ message, isMyMessage }) => {
  return (
    <div
      className={`${classes.wrapperText} ${
        isMyMessage
          ? classes.wrapperText_isMyMessage
          : classes.wrapperText_isNotMyMessage
      }`}
    >
      {/* <p className={classes.text}>{message.contentStr}</p> */}
      <CardMessageText message={message} />
      {isMyMessage ? (
        <div className={classes.commentPointer_right} />
      ) : (
        <div className={classes.commentPointer_left} />
      )}
    </div>
  );
};
