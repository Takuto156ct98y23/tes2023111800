import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import classes from "./CardChatRoom.module.css";
import UserImage from "../../UserImage/UserImage";
import { range } from "../../../utils/arrayUtils";
import { useNavigate } from "react-router-dom";

const CardChatRoom = ({ chatRoom }) => {
  return (
    <Fragment>
      {chatRoom ? <AreaCardChatRoom chatRoom={chatRoom} /> : null}
    </Fragment>
  );
};

export default CardChatRoom;

const AreaCardChatRoom = ({ chatRoom }) => {
  const name = chatRoom?.name;
  const users = chatRoom?.userGroup?.ids;

  const navigate = useNavigate();
  const _onClick = useCallback(() => {
    if (navigate) {
      navigate(`/chatroom/${chatRoom._id}`);
    }
  }, [navigate, chatRoom]);
  return (
    <div onClick={_onClick} className={classes.AreaCardChatRoom}>
      <ChatRoomName name={name} />
      <ChatRoomUserImages users={users} />
    </div>
  );
};

const ChatRoomName = ({ name }) => {
  // const widthChatRoomName = useMemo(() => {
  //   return Math.round(widthContent * 0.6);
  // }, [widthContent]);

  return (
    <div
      // style={{ width: `${widthContent__main * 0.6}px` }}
      className={classes.ChatRoomName}
    >
      <div className={classes.ChatRoomName__wrapper}>
        <p className={classes.name}>{name}</p>
      </div>
    </div>
  );
};

const theMaxNumberOfUsersToDisplay = 2;
const range_theMaxNumberOfUsersToDisplay = range(theMaxNumberOfUsersToDisplay);
const ChatRoomUserImages = ({ users }) => {
  const moreThanTheNumberOf_theMaxNumberOfUsersToDisplay_usersExist =
    useMemo(() => {
      if (Array.isArray(users)) {
        return theMaxNumberOfUsersToDisplay < users.length;
      }
      return false;
    }, [users]);

  const usersPickedToDisplay = useMemo(() => {
    if (!moreThanTheNumberOf_theMaxNumberOfUsersToDisplay_usersExist) {
      return users;
    }
    const _usersToDisplay = [];
    for (const userNum of range_theMaxNumberOfUsersToDisplay) {
      const userPicked = users[userNum];
      _usersToDisplay.push(userPicked);
    }
    return _usersToDisplay;
  }, [moreThanTheNumberOf_theMaxNumberOfUsersToDisplay_usersExist, users]);

  const [user0, setUser0] = useState(null);
  const [user1, setUser1] = useState(null);
  useEffect(() => {
    const setters = [setUser0, setUser1];
    for (const userIndex in usersPickedToDisplay) {
      const userPicked = usersPickedToDisplay[userIndex];
      if (userPicked) {
        const setter = setters[userIndex];
        if (setter) {
          setter(userPicked);
        }
      }
    }
  }, [usersPickedToDisplay]);

  //   z-indexを使うのを避けるため、上に表示したい写真を、より下に記述し、cssで位置を戻すという方法で写真を表示している
  return (
    <div className={classes.ChatRoomUserImages}>
      <div className={classes.ChatRoomUserImages__images}>
        <div
          className={`${classes.ChatRoomUserImages__images__image} ${classes.ChatRoomUserImages__images__image_others}`}
        >
          <div className={classes.ChatRoomUserImages__images__image__wrapper}>
            {moreThanTheNumberOf_theMaxNumberOfUsersToDisplay_usersExist ? (
              <p className={classes.others}>・・・・・</p>
            ) : null}
          </div>
        </div>

        <div className={classes.ChatRoomUserImages__images__image}>
          <div className={classes.ChatRoomUserImages__images__image__wrapper}>
            {user1 ? (
              <UserImage jumpToUserPageOnClick={false} user={user1} />
            ) : null}
          </div>
        </div>

        <div
          className={`${classes.ChatRoomUserImages__images__image} ${classes.ChatRoomUserImages__images__image_user0}`}
        >
          <div className={classes.ChatRoomUserImages__images__image__wrapper}>
            {user0 ? (
              <UserImage jumpToUserPageOnClick={false} user={user0} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
