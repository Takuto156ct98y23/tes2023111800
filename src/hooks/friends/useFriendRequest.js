import { useCallback, useMemo, useState } from "react";
import { getObjects, postData, putData } from "../../api/apiGeneral";
import {
  friendRequestStatus_notSent,
  friendRequestStatus_pending,
  friendRequestStatus_pending_fromViewedUser,
  friendRequestStatus_pending_toViewedUser,
} from "../../data/constants/friendConstants";
import useInitialLoad from "../Api/useInitialLoad";
import { handleError, isGoodError } from "../../utils/utilsError";

const useFriendRequest = (viewedUser) => {
  const [loadingFriendRequest, setLoadingFriendRequest] = useState(false);

  const viewedUserId = useMemo(() => {
    return viewedUser?._id;
  }, [viewedUser]);

  const [
    friendRequestDataAboutViewedUser,
    setFriendRequestDataAboutViewedUser,
  ] = useState(null);

  const friendRequestFrom = useMemo(() => {
    const fromArray = friendRequestDataAboutViewedUser?.from;

    if (Array.isArray(fromArray) && 0 < fromArray.length) {
      return fromArray[0];
    }
  }, [friendRequestDataAboutViewedUser]);
  const friendRequestTo = useMemo(() => {
    const toArray = friendRequestDataAboutViewedUser?.to;
    if (Array.isArray(toArray) && 0 < toArray.length) {
      return toArray[0];
    }
  }, [friendRequestDataAboutViewedUser]);

  const friendRequestStatus = useMemo(() => {
    if (!friendRequestDataAboutViewedUser) {
      return null;
    }
    const statusFrom = friendRequestFrom?.status;
    const statusTo = friendRequestTo?.status;

    if (statusFrom) {
      if (statusFrom === friendRequestStatus_pending) {
        return friendRequestStatus_pending_fromViewedUser;
      } else {
        return statusFrom;
      }
    } else if (statusTo) {
      if (statusTo === friendRequestStatus_pending) {
        return friendRequestStatus_pending_toViewedUser;
      } else {
        return statusTo;
      }
    } else {
      return friendRequestStatus_notSent;
    }
  }, [friendRequestDataAboutViewedUser, friendRequestFrom, friendRequestTo]);

  const fetchAndRenewFriendRequestDataAboutViewedUser =
    useCallback(async () => {
      if (!viewedUserId) {
        return;
      }
      setLoadingFriendRequest(true);
      try {
        const response = await getObjects(
          { targetUserId: viewedUserId },
          `friendRequests/getFrindRequestsAboutAUser`,
          null
        );

        const data = response?.data?.data?.data;
        setFriendRequestDataAboutViewedUser(data);
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
      setLoadingFriendRequest(false);
    }, [viewedUserId]);

  useInitialLoad(
    friendRequestDataAboutViewedUser,
    fetchAndRenewFriendRequestDataAboutViewedUser,
    "useFriendRequest"
  );

  const sendFriendRequest = useCallback(async () => {
    if (!viewedUserId) {
      return;
    }
    setLoadingFriendRequest(true);
    try {
      await postData(
        null,
        {
          // from: meId,
          to: viewedUserId,
        },
        "friendRequests/postFriendRequest",
        null
      );

      fetchAndRenewFriendRequestDataAboutViewedUser();
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
    setLoadingFriendRequest(false);
  }, [viewedUserId, fetchAndRenewFriendRequestDataAboutViewedUser]);

  const acceptFriendRequest = useCallback(async () => {
    if (!friendRequestFrom) {
      return;
    }
    setLoadingFriendRequest(true);
    try {
      await putData(
        { targetUserId: viewedUserId },
        null,
        `friendRequests/accept`,
        null
      );

      fetchAndRenewFriendRequestDataAboutViewedUser();
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
    setLoadingFriendRequest(false);
  }, [
    viewedUserId,
    fetchAndRenewFriendRequestDataAboutViewedUser,
    friendRequestFrom,
  ]);

  const declineFriendRequest = useCallback(async () => {
    if (!friendRequestFrom) {
      return;
    }
    setLoadingFriendRequest(true);
    try {
      await putData(
        { targetUserId: viewedUserId },
        null,
        "friendRequests/decline",
        null
      );

      fetchAndRenewFriendRequestDataAboutViewedUser();
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
    setLoadingFriendRequest(false);
  }, [
    viewedUserId,
    fetchAndRenewFriendRequestDataAboutViewedUser,
    friendRequestFrom,
  ]);

  return {
    loadingFriendRequest,
    friendRequestStatus,
    sendFriendRequest,
    fetchAndRenewFriendRequestDataAboutViewedUser,
    acceptFriendRequest,
    declineFriendRequest,
  };
};

export default useFriendRequest;
