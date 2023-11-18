import classes from "./FriendRequestButton.module.css";
import {
  friendRequestStatus_accepted,
  friendRequestStatus_notSent,
  friendRequestStatus_pending_fromViewedUser,
  friendRequestStatus_pending_toViewedUser,
} from "../../../data/constants/friendConstants";
import useMe from "../../../hooks/user/me/useMe";
import UnfriendButton from "../UnfriendButton/UnfriendButton";
import FriendRequestStatus from "./FriendRequestStatus";
import ButtonBasic from "../Basic/ButtonBasic";
import useFriendRequest from "../../../hooks/friends/useFriendRequest";

const FriendRequestButton = ({ viewedUser }) => {
  const { me } = useMe();

  const {
    loadingFriendRequest,
    friendRequestStatus,
    sendFriendRequest,
    fetchAndRenewFriendRequestDataAboutViewedUser,
    acceptFriendRequest,
    declineFriendRequest,
  } = useFriendRequest(viewedUser);

  if (me._id === viewedUser._id) {
    return null;
  }

  return (
    <div className={classes.FriendRequestButton}>
      <AreaButton
        loadingFriendRequest={loadingFriendRequest}
        viewedUser={viewedUser}
        friendRequestStatus={friendRequestStatus}
        fetchAndRenewFriendRequestDataAboutViewedUser={
          fetchAndRenewFriendRequestDataAboutViewedUser
        }
        acceptFriendRequest={acceptFriendRequest}
        declineFriendRequest={declineFriendRequest}
        sendFriendRequest={sendFriendRequest}
      />
      <FriendRequestStatus
        status={friendRequestStatus}
        viewedUserName={viewedUser?.name}
      />
    </div>
  );
};

export default FriendRequestButton;

const AreaButton = ({
  loadingFriendRequest,
  viewedUser,
  friendRequestStatus,
  fetchAndRenewFriendRequestDataAboutViewedUser,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
}) => {
  return (
    <div className={classes.AreaButton}>
      {loadingFriendRequest ? (
        <ButtonBasic disabled={true}>{"通信中"}</ButtonBasic>
      ) : (
        <AreaButtonButton
          loadingFriendRequest={loadingFriendRequest}
          friendRequestStatus={friendRequestStatus}
          viewedUser={viewedUser}
          fetchAndRenewFriendRequestDataAboutViewedUser={
            fetchAndRenewFriendRequestDataAboutViewedUser
          }
          sendFriendRequest={sendFriendRequest}
          acceptFriendRequest={acceptFriendRequest}
          declineFriendRequest={declineFriendRequest}
        />
      )}
    </div>
  );
};

const AreaButtonButton = ({
  friendRequestStatus,
  viewedUser,
  fetchAndRenewFriendRequestDataAboutViewedUser,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
}) => {
  switch (friendRequestStatus) {
    case friendRequestStatus_accepted:
      return (
        <UnfriendButton
          friend={viewedUser}
          funcAfterUnfriended={fetchAndRenewFriendRequestDataAboutViewedUser}
        />
      );
    case friendRequestStatus_pending_fromViewedUser:
      return (
        <div className={classes.pendingFromViewedUser}>
          <ButtonBasic onClick={acceptFriendRequest} disabled={false}>
            {"友達申請を承認"}
          </ButtonBasic>
          <ButtonBasic onClick={declineFriendRequest} disabled={false}>
            {"友達申請を断る"}
          </ButtonBasic>
        </div>
      );
    case friendRequestStatus_pending_toViewedUser:
      return <ButtonBasic disabled={true}>{"送信済み"}</ButtonBasic>;
    case friendRequestStatus_notSent:
      return (
        <ButtonBasic onClick={sendFriendRequest} disabled={false}>
          {"友達申請を送る！"}
        </ButtonBasic>
      );
    default:
      return null;
  }
};
