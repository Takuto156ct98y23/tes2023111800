import { Fragment } from "react";
import useMe from "../../../hooks/user/me/useMe";
import ButtonJump from "../../button/ButtonJump/ButtonJump";
import ContentLetsLogin from "../ContentLetsLogin/ContentLetsLogin";

import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";
import classes from "./ContentChatRoomsPrivate.module.css";
import useObjectsRead from "../../../hooks/useObjectsRead";
import useObjectsGet from "../../../hooks/useObjectsGet";

const ContentChatRoomsPrivate = () => {
  const { isGuest } = useMe();

  return (
    <Fragment>
      {isGuest ? <ContentLetsLogin /> : <AreaChatRoomsPrivate />}
    </Fragment>
  );
};

export default ContentChatRoomsPrivate;

const AreaChatRoomsPrivate = () => {
  const pathForContentObjects = "chatRoom/my-chatroom-join/private";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
    // reqQuery: searchObj,
  });

  return (
    <div className={classes.ContentChatRoomsPrivate}>
      <div className={classes.ContentChatRoomsPrivate__head}>
        <ButtonJump
          label={"チャットを新規作成する"}
          path={"/edit-chatroom/new"}
        />
      </div>

      <div className={classes.ContentChatRoomsPrivate__main}>
        <ContentInfiniteScroll
          // pathGet={pathForContentObjects} cardType={"chatRoom"}

          pathGet={pathForContentObjects}
          cardType={"chatRoom"}
          objects={objects}
          hasMore={hasMore}
          getObjectsTailward={getObjectsTailward}
          getObjectsHeadward={getObjectsHeadward}
          displayButtonToLoadOlderObject={false}
          messageNoObject={"作成済みのチャットはまだ無いみたい🤔"}
        />
      </div>
    </div>
  );
};
