import { useParams } from "react-router-dom";
import FriendRequestButton from "../../../button/FriendRequestButton/FriendRequestButton";
import classes from "./ContentOneUser.module.css";
import CardUser from "../../../Card/CardUser/CardUser";
import useUser from "../../../../hooks/user/useUser";
import ButtonBasic from "../../../button/Basic/ButtonBasic";
import { useCallback } from "react";
import useMe from "../../../../hooks/user/me/useMe";
import { openNewTab } from "../../../../utils/utilsWindow";

const ContentOneUser = () => {
  const params = useParams();
  const userId = params.userId;
  const { user } = useUser(userId);

  const { meId } = useMe();

  return (
    <div className={classes.ContentOneUser}>
      <div className={classes.wrapperPageTitle}>
        <h5 className={classes.pageTitle}>プロフィール</h5>
      </div>
      {userId && meId && userId !== meId ? (
        <span className={classes.ButtonMutualFriendsWrapper}>
          <ButtonMutualFriends userId={userId} />
        </span>
      ) : null}
      {user ? <CardUser user={user} displayBio={true} /> : null}
      {user ? <FriendRequestButton viewedUser={user} /> : null}
    </div>
  );
};

export default ContentOneUser;

const ButtonMutualFriends = ({ userId }) => {
  const jumpToMutualFriends = useCallback(() => {
    const path = `/friends/${userId}/mutual`;
    openNewTab(path);
  }, [userId]);
  return (
    <ButtonBasic onClick={jumpToMutualFriends}>共通の友達をみる</ButtonBasic>
  );
};
