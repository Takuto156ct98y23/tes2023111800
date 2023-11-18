import { useCallback, useState } from "react";
import { createAUserGroup, deleteAUserGroup } from "../../api/apiUserGroup";
import { handleError, isGoodError } from "../../utils/utilsError";
import useInitialLoad from "../Api/useInitialLoad";
import useMe from "../user/me/useMe";
import useMyUserGroups from "./useMyUserGroups";

// 諸々の処理で使う特殊なuserGroup。自分だけが入ってる。存在していない場合は新規作成する必要があるのでチェック。
const useUserGroupOnlyMe = () => {
  const { myUserGroups, fetchAndRenewMyUserGroups } = useMyUserGroups();

  const typeOnlyMe = "onlyMe";

  const { meId } = useMe();

  const [userGroupOnlyMe, setUserGroupOnlyMe] = useState(null);

  const setterUserGroupOnlyMe = useCallback(() => {
    let userGroupOnlyMeExists = false;

    for (const userGroupObj of myUserGroups) {
      if (!userGroupObj) {
        return;
      }
      const typeInObj = userGroupObj.type;

      if (typeInObj === typeOnlyMe) {
        if (userGroupOnlyMeExists === true) {
          // 既にsetUserGroupOnlyMeを設定済みということは、myUserGroupsの中に"onlyMe"のuserGroupが２つ以上あるということ。過剰分なので削除する。
          deleteAUserGroup(userGroupObj._id);
        }

        setUserGroupOnlyMe(userGroupObj);
        userGroupOnlyMeExists = true;
      }
    }
    return userGroupOnlyMeExists;
  }, [myUserGroups]);

  const createOnlyMe = useCallback(
    async (signal = null) => {
      if (!meId) {
        return;
      }

      try {
        const userIdsNew = [meId];
        const nameNew = "自分のみ";
        await createAUserGroup({
          userIdsNew,
          nameNew,
          type: typeOnlyMe,
          signal,
        });

        await fetchAndRenewMyUserGroups();
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    [meId, fetchAndRenewMyUserGroups]
  );

  const getUserGroupOnlyMe = useCallback(async () => {
    if (!myUserGroups) {
      return;
    }
    const onlyMeExists = setterUserGroupOnlyMe();

    if (!onlyMeExists) {
      await createOnlyMe();
    }
  }, [createOnlyMe, setterUserGroupOnlyMe, myUserGroups]);

  useInitialLoad(userGroupOnlyMe, getUserGroupOnlyMe, "useUserGroupOnlyMe");

  return { userGroupOnlyMe };
};

export default useUserGroupOnlyMe;
