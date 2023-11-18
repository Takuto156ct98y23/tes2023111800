import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getObjects, patchData } from "../../api/apiGeneral";
import { createAUserGroup } from "../../api/apiUserGroup";
import { handleError, isGoodError } from "../../utils/utilsError";
import useInitialLoad from "../Api/useInitialLoad";
import useButtonByBoolean from "../Button/useButtonByBoolean";
import useInputByKey from "../Input/useInputByKey/useInputByKey";
import useSearchBox from "../UI/useSearchBox";
import useButtonDelete from "../useButtonDelete";
import useKeyForResetting from "../util/useKeyForResetting";
import useMyUserGroups from "./useMyUserGroups";

const useUserGroup = ({ userGroupId = null, type = null }) => {
  const [userGroup, setUserGroup] = useState(null);
  const fetchAndRenewUserGroup = useCallback(
    async (signal) => {
      try {
        const reqQuery = {
          // getDocument: true,
          id: userGroupId,
          type: type,
        };

        const res = await getObjects(reqQuery, "userGroup/getDocument", signal);

        const userGroupArray = res?.data?.data?.data;

        const userGroupObj = userGroupArray ? userGroupArray[0] : null;

        if (userGroupObj) {
          setUserGroup(userGroupObj);
        }
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    [userGroupId, type]
  );

  const reloadUserGroup = useCallback(async () => {
    // userGroupをnullにすると useInitialLoad(userGroup, fetchAndRenewUserGroup);が再発動する
    setUserGroup(null);
  }, []);

  useInitialLoad(userGroup, fetchAndRenewUserGroup, "useUserGroup");

  const [usersInUserGroup, setUsersInUserGroup] = useState(null);

  useEffect(() => {
    if (userGroup) {
      setUsersInUserGroup(userGroup.ids);
    }
  }, [userGroup]);

  const {
    keyForResetting: keyForResettingUserGroup,
    resetAComponent: resetAComponentUserGroup,
  } = useKeyForResetting();

  const {
    valueInput: nameUserGroup,
    InputByKey: InputByKeyUserGroup,
    setInputDisabled: setInputDisabledUserGroup,
  } = useInputByKey({
    inputType: "text",
    labelInputByKey: "グループ名:\t",
    valueInitial: userGroup ? userGroup.name : "",
  });

  const {
    selectedOption: selectedOptionUsers,
    SearchBoxDropdown: SearchBoxDropdownUsers,
  } = useSearchBox({
    // path: "users",
    path: "users/search",
    defaultValueArraySearchBoxDropdown: usersInUserGroup,
    hasDefaultValueSearchBoxDropdown: true,
  });

  const { disabledBoolButtonSave } = useDisabledBoolButtonSave(
    nameUserGroup,
    selectedOptionUsers
  );

  const [editingUserGroup, setEditingUserGroup] = useState(false);

  const editButtonHandler = useCallback(() => {
    setEditingUserGroup((prev) => !prev);
  }, []);

  const { ButtonByBoolean: ButtonEdit } = useButtonByBoolean({
    funcOnClickOfArgument: editButtonHandler,
    boolForButton: editingUserGroup,
    labelWhenTrue: "close",
    labelWhenFalse: "edit",
  });

  const { creatingUserGroup, setCreatingUserGroup } = useCreateUserGroup(
    userGroupId,
    setUserGroup,
    setEditingUserGroup
  );

  const navigate = useNavigate();

  const [savingUserGroup, setSavingUserGroup] = useState(false);
  const [haveSavingError, setHaveSavingError] = useState(false);
  const { fetchAndRenewMyUserGroups } = useMyUserGroups();
  const createUserGroup = useCallback(
    async (userIdsNew, nameNew, signal = null) => {
      const userGroupDoc = await createAUserGroup({
        userIdsNew,
        nameNew,
        signal,
      });
      setCreatingUserGroup(false);
      if (userGroupDoc) {
        navigate(`/usergroup/${userGroupDoc.id}`, { replace: true });
      }

      // try {
      //   const userGroupDoc = await createAUserGroup({
      //     userIdsNew,
      //     nameNew,
      //     signal,
      //   });
      //   setCreatingUserGroup(false);
      //   if (userGroupDoc) {
      //     navigate(`/usergroup/${userGroupDoc.id}`, { replace: true });
      //   }
      // } catch (error) {
      //   if (isBadError(error)) {
      //     console.log("error", error);
      //   }
      // }
    },
    [navigate, setCreatingUserGroup]
  );
  const updateUserGroup = useCallback(
    async (userIdsNew, nameNew, signal = null) => {
      try {
        const reqQuery = {
          // updateDocument: true,
          id: userGroupId,
        };
        const reqBody = {
          overWriteIds: true,
          targetIds: userIdsNew,
          name: nameNew,
        };
        const res = await patchData(
          // reqQuery,
          // reqBody,
          // "userGroup/updateDocument",
          // signal

          {
            paramsObj: reqQuery,
            data: reqBody,
            path: "userGroup/updateDocument",
            signal: signal,
          }
        );
        // const res = await patchData(reqQuery, reqBody, "userGroup", signal);
        const userGroupDoc = res.data.data.data;
        setUserGroup(userGroupDoc);
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    [userGroupId]
  );
  const updateOrCreateUserGroupBySelectedOption = useCallback(async () => {
    setSavingUserGroup(true);
    try {
      if (!selectedOptionUsers) {
        return;
      }
      const userIdsNew = selectedOptionUsers.map((anObj) => {
        return anObj._id?.toString();
      });

      if (creatingUserGroup) {
        await createUserGroup(userIdsNew, nameUserGroup);
      } else {
        await updateUserGroup(userIdsNew, nameUserGroup);
      }

      setHaveSavingError(false);
      resetAComponentUserGroup();
      fetchAndRenewMyUserGroups();
      reloadUserGroup();
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setHaveSavingError(true);
      setInputDisabledUserGroup(true);
    }
    setEditingUserGroup(false);
    setSavingUserGroup(false);
  }, [
    nameUserGroup,
    selectedOptionUsers,
    updateUserGroup,
    setInputDisabledUserGroup,
    resetAComponentUserGroup,
    creatingUserGroup,
    createUserGroup,
    fetchAndRenewMyUserGroups,
    reloadUserGroup,
  ]);

  const { ButtonByBoolean: ButtonSave } = useButtonByBoolean({
    funcOnClickOfArgument: updateOrCreateUserGroupBySelectedOption,
    boolForButton: savingUserGroup,
    errorboolForButton: haveSavingError,
    labelWhenTrue: creatingUserGroup ? "作成中" : "保存中",
    labelWhenFalse: creatingUserGroup ? "作成" : "保存",
    labelWhenChangeToFalse: creatingUserGroup ? "作成完了" : "保存完了",
    labelWhenError: "エラー",
    disabledWhenTrue: true,
    disabled: disabledBoolButtonSave,
  });

  const {
    AreaButtonDelete: AreaButtonDeleteUserGroup,
    objDeleted: objDeletedUserGroup,
  } = useButtonDelete(
    // "userGroup",
    "userGroup/deleteDocument",
    userGroupId,
    fetchAndRenewMyUserGroups
  );

  return {
    // 全ての変数をここに列挙してはない
    userGroup,
    setUserGroup,
    setEditingUserGroup,
    ButtonEdit,
    editingUserGroup,
    ButtonSave,
    InputByKeyUserGroup,
    SearchBoxDropdownUsers,
    nameUserGroup,
    keyForResettingUserGroup,
    AreaButtonDeleteUserGroup,
    objDeletedUserGroup,
  };
};
export default useUserGroup;

const useCreateUserGroup = (userGroupId, setUserGroup, setEditingUserGroup) => {
  const [creatingUserGroup, setCreatingUserGroup] = useState(false);

  useEffect(() => {
    if (userGroupId === "new") {
      setUserGroup({ ids: [], name: "" });
      setEditingUserGroup(true);
      setCreatingUserGroup(true);
    }
  }, [setEditingUserGroup, setUserGroup, userGroupId]);

  return { creatingUserGroup, setCreatingUserGroup };
};

const useDisabledBoolButtonSave = (nameUserGroup, selectedOptionUsers) => {
  const [disabledBoolButtonSave, setDisabledBoolButtonSave] = useState(true);

  useEffect(() => {
    if (!nameUserGroup || nameUserGroup.length < 1) {
      return setDisabledBoolButtonSave(true);
    }
    const selectedAtLeastOneOption = 0 < selectedOptionUsers?.length;
    if (!selectedAtLeastOneOption) {
      return setDisabledBoolButtonSave(true);
    }
    setDisabledBoolButtonSave(false);
  }, [nameUserGroup, selectedOptionUsers]);

  return { disabledBoolButtonSave };
};
