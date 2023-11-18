import React, { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import useMe from "../../../hooks/user/me/useMe";
import useUserGroup from "../../../hooks/userGroup/useUserGroup";
import ButtonJump from "../../button/ButtonJump/ButtonJump";
import ContentLetsLogin from "../ContentLetsLogin/ContentLetsLogin";

import classes from "./ContentOneUserGroup.module.css";
import CardUser from "../../Card/CardUser/CardUser";

const ContentOneUserGroup = () => {
  const { isGuest } = useMe();

  return (
    <Fragment>
      {
        isGuest ? <ContentLetsLogin /> : <AreaContentOneUserGroup />
        // <AreaOneUserGroup />
      }
    </Fragment>
  );
};

export default ContentOneUserGroup;

const AreaContentOneUserGroup = () => {
  const params = useParams();
  const userGroupId = params.usergroupid;

  // ページタイトルを指定したい時
  const pageTitle = params.pagetitle;
  // chatroom関連ページから来た場合ここに値が入る
  const chatRoomId = params.chatroomid;

  const { userGroup } = useUserGroup({ userGroupId: userGroupId });
  // } = useUserGroup(userGroupId);

  const users = useMemo(() => {
    if (userGroup) {
      return userGroup?.ids;
    }
  }, [userGroup]);

  return (
    <div className={classes.AreaContentOneUserGroup}>
      <div className={classes.AreaContentOneUserGroup__wrapper}>
        <div className={classes.AreaContentOneUserGroup__wrapper__button}>
          {chatRoomId ? (
            <ButtonJump label={"戻る"} path={`/chatroom/${chatRoomId}`} />
          ) : null}
        </div>

        <div className={classes.AreaContentOneUserGroup__wrapper__header}>
          <h3 className={classes.pageTitle}>{pageTitle}</h3>
        </div>

        <div className={classes.AreaContentOneUserGroup__wrapper__main}>
          {users
            ? users.map((user) => {
                return (
                  <div
                    key={user?._id}
                    className={
                      classes.AreaContentOneUserGroup__wrapper__userBox
                    }
                  >
                    <CardUser user={user} jumpToUserPageByAnyClick />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
