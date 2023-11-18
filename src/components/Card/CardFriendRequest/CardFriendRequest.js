import FriendRequestButton from "../../button/FriendRequestButton/FriendRequestButton";
import CardUser from "../CardUser/CardUser";
import classes from "./CardFriendRequest.module.css";

const CardFriendRequest = ({ user }) => {
  return (
    <div className={classes.CardFriendRequest}>
      <CardUser user={user} jumpToUserPageByAnyClick={true} />
      <FriendRequestButton viewedUser={user} />
      {/* CardFriendRequestとCardFriendRequestを分ける線 */}
      <span className={classes.line} />
    </div>
  );
};

export default CardFriendRequest;
