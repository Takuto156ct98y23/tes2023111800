import ButtonBasic from "../Basic/ButtonBasic";
import classes from "./ButtonChatRoomRandom.module.css";

const ButtonChatRoomRandom = ({
  messageMain,
  messageSub,
  //   messageStatus,
  onClickHandlerButtonChatRoomRandom,
  isDisabledButtonChatRoomRandom,
}) => {
  return (
    <div className={classes.ButtonChatRoomRandom}>
      <div className={classes.circle_outer}>
        <ButtonBasic
          className={classes.ButtonChatRoomRandom__button}
          onClick={onClickHandlerButtonChatRoomRandom}
          disabled={isDisabledButtonChatRoomRandom}
        >
          <Content
            messageMain={messageMain}
            messageSub={messageSub}
            // messageStatus={messageStatus}
          />
        </ButtonBasic>
      </div>
    </div>
  );
};

export default ButtonChatRoomRandom;

const Content = ({ messageMain, messageSub }) => {
  return (
    <div className={classes.Content}>
      <Top></Top>

      <div className={classes.Content__areaMessageMain}>
        <p className={classes.messageMain}>{messageMain}</p>
      </div>
      <div className={classes.Content__areaMessageSub}>
        <p className={classes.messageSub}>{messageSub}</p>
      </div>
      {/* <div className={classes.Content__areaMessageStatus}>
        <p className={classes.messageStatus}>{messageStatus}</p>
      </div> */}
    </div>
  );
};

const Top = () => {
  return <div></div>;
};
