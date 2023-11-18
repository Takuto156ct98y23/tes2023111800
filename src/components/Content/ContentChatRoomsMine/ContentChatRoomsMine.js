import useMyChatRooms from "../../../hooks/chatRoom/useMyChatRooms";
import useObjectsGet from "../../../hooks/useObjectsGet";
import useObjectsRead from "../../../hooks/useObjectsRead";
import ButtonJump from "../../button/ButtonJump/ButtonJump";

import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";
import classes from "./ContentChatRoomsMine.module.css";

const ContentChatRoomsMine = () => {
  const { myChatRooms } = useMyChatRooms();

  const pathForContentObjects = "chatRoom/my-chatroom-join/private";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  return (
    <div className={classes.ContentChatRoomsMine}>
      <h2>ContentChatRoomsMine!!!</h2>
      <h2>chatRoomPrivateたちが表示される場所</h2>
      <ButtonJump label={"チャットを追加する"} path={"/edit-chatroom/new"} />

      {myChatRooms ? (
        <div>
          <ContentInfiniteScroll
            // pathGet={pathForContentObjects} cardType={"chatRoom"}

            pathGet={pathForContentObjects}
            cardType={"chatRoom"}
            objects={objects}
            hasMore={hasMore}
            getObjectsTailward={getObjectsTailward}
            getObjectsHeadward={getObjectsHeadward}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ContentChatRoomsMine;
