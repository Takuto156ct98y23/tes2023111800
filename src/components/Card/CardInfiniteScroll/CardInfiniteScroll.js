import { Fragment } from "react";
import CardMessage from "../message/CardMessage/CardMessage";
import CardNotification from "../CardNotification/CardNotification";
import CardUser from "../CardUser/CardUser";
import CardUserGroup from "../CardUserGroup/CardUserGroup";
import classes from "./CardInfiniteScroll";
import CardChatRoom from "../CardChatRoom/CardChatRoom";
import CardFriendRequest from "../CardFriendRequest/CardFriendRequest";

const CardInfiniteScroll = ({
  cardType,
  obj,
  displayAreaClick,
  onClickACard,
}) => {
  return (
    <Fragment>
      {obj ? (
        <div key={obj._id} className={classes.CardInfiniteScroll}>
          <Card
            cardType={cardType}
            obj={obj}
            displayAreaClick={displayAreaClick}
            onClickACard={onClickACard}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default CardInfiniteScroll;

const Card = ({ cardType, obj, displayAreaClick, onClickACard }) => {
  switch (cardType) {
    case "users":
    case "follow":
    case "followedBy":
      return (
        <CardUser
          user={obj}
          displayAreaClick={displayAreaClick}
          onClickACard={onClickACard}
        />
      );
    case "notifications":
      return <CardNotification notification={obj} />;
    case "chatRoom":
      return <CardChatRoom chatRoom={obj} />;
    case "messages":
      return <CardMessage obj={obj} />;
    case "userGroup":
      return <CardUserGroup obj={obj} />;
    case "friendRequest":
      return <CardFriendRequest user={obj} />;

    // case "item":
    //   return <CardItem item={obj} />;
    default:
      // return <Arasuzy obj={obj} />;
      return <p>loading...</p>;
  }
};
