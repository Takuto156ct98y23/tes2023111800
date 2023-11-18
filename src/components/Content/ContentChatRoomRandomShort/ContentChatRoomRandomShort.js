import { chatRoomRandomConfigLength_Short } from "../../../data/constants/chatRoomRandomConfigConstants";
import ContentChatRoomRandom from "../ContentChatRoomRandom/ContentChatRoomRandom";
import classes from "./ContentChatRoomRandomShort.module.css";

const ContentChatRoomRandomShort = () => {
  return (
    <div className={classes.ContentChatRoomRandomShort}>
      <ContentChatRoomRandom chatLength={chatRoomRandomConfigLength_Short} />
    </div>
  );
};

export default ContentChatRoomRandomShort;
