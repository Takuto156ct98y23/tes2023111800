import { Fragment } from "react";
import useMe from "../../../hooks/user/me/useMe";
import ContentLetsLogin from "../ContentLetsLogin/ContentLetsLogin";
import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";
import classes from "./ContentChatRoomsJoined.module.css";
import useObjectsRead from "../../../hooks/useObjectsRead";
import useObjectsGet from "../../../hooks/useObjectsGet";

const ContentChatRoomsJoined = () => {
  const { isGuest } = useMe();

  return (
    <Fragment>
      {isGuest ? <ContentLetsLogin /> : <AreaChatRoomsJoined />}
    </Fragment>
  );
};

export default ContentChatRoomsJoined;

const AreaChatRoomsJoined = () => {
  const pathForContentObjects = "chatRoom/my-chatroom-join/arasuzy";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  return (
    <div className={classes.ContentChatRoomsJoined}>
      <h2>ContentChatRoomsJoined!!</h2>
      <h2>通知希望押したarasuzyのチャットが表示されるページ</h2>

      <ContentInfiniteScroll
        // pathGet={pathForContentObjects}
        // pathPost={pathForContentObjects}
        // cardType={"chatRoom"}

        pathGet={pathForContentObjects}
        cardType={"chatRoom"}
        objects={objects}
        hasMore={hasMore}
        getObjectsTailward={getObjectsTailward}
        getObjectsHeadward={getObjectsHeadward}
      />
    </div>
  );
};
