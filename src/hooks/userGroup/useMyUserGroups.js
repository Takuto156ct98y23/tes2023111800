import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUserGroups } from "../../api/apiUserGroup";
import { myUserGroupsSliceActions } from "../../store/myUserGroups/myUserGroups-slice";
import { getObjectByKeyValuePairFromObjectArray } from "../../utils/arrayUtils";
import { handleError, isGoodError } from "../../utils/utilsError";

import useInitialLoad from "../Api/useInitialLoad";

const useMyUserGroups = () => {
  const dispatch = useDispatch();
  const myUserGroups = useSelector((state) => {
    return state.myUserGroupsReducer.myUserGroups;
  });

  const fetchAndRenewMyUserGroups = useCallback(
    async (signal = null) => {
      try {
        const res = await getMyUserGroups(signal);
        const myUserGroupsFetched = res.data.data.data;

        dispatch(
          myUserGroupsSliceActions.renewMyUserGroups(myUserGroupsFetched)
        );
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    [dispatch]
  );

  useInitialLoad(myUserGroups, fetchAndRenewMyUserGroups, "useMyUserGroups");

  const getAUserGroupFromMyUserGroups = useCallback(
    (userGroupId) => {
      return getObjectByKeyValuePairFromObjectArray(
        "_id",
        userGroupId,
        myUserGroups
      );
    },
    [myUserGroups]
  );

  return {
    myUserGroups,
    fetchAndRenewMyUserGroups,
    getAUserGroupFromMyUserGroups,
  };
};

export default useMyUserGroups;
