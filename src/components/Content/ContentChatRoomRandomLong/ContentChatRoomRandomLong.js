import { chatRoomRandomConfigLength_long } from "../../../data/constants/chatRoomRandomConfigConstants";
import ContentChatRoomRandom from "../ContentChatRoomRandom/ContentChatRoomRandom";
import classes from "./ContentChatRoomRandomLong.module.css";

const ContentChatRoomRandomLong = () => {
  return (
    <div className={classes.ContentChatRoomRandomLong}>
      <ContentChatRoomRandom chatLength={chatRoomRandomConfigLength_long} />
    </div>
  );
};

export default ContentChatRoomRandomLong;
