import { deleteData, getObjects, patchData, postData } from "./apiGeneral";

// typeが「onlyMe」または「custom」のuserGroupsを取って来る（逆に言うとSystem dataと言うべき処理用のuserGroupsは取ってこない）
export const getMyUserGroups = async (signal = null) => {
  // return getObjects({ getDocument: true }, "userGroup", signal);
  // return getObjects(null, "userGroup/getDocument", signal);
  return getObjects({ getMyUserGroups: true }, "userGroup/getDocument", signal);
};

export const createAUserGroup = async ({
  userIdsNew,
  nameNew,
  type = null,
  signal = null,
}) => {
  // const reqQuery = {
  //   createDocument: true,
  // };
  const reqBody = {
    ids: userIdsNew,
    name: nameNew,
    type: type,
  };

  // const res = await postData(reqQuery, reqBody, "userGroup", signal);
  const res = await postData(null, reqBody, "userGroup/createDocument", signal);
  const userGroupDoc = res.data.data.data;

  return userGroupDoc;
};

export const updateAUserGroup = async ({
  reqData,
  userGroupId,
  signal = null,
}) => {
  const res = await patchData(
    // null,
    // reqData,
    // `userGroup/${userGroupId}`,
    // signal

    {
      data: reqData,
      path: `userGroup/${userGroupId}`,
      signal: signal,
    }
  );

  return res?.data?.data?.data;
};
export const updateIdsInAUserGroupOfAChatRoom = async ({
  // reqData,
  howToRenew,
  userGroupId,
  signal = null,
}) => {
  const res = await patchData({
    data: {
      howToRenew: howToRenew,
    },
    path: `userGroup/chatroom/${userGroupId}`,
    signal: signal,
  });
  // const res = await patchData(
  //   null,
  //   // reqData,
  //   {
  //     howToRenew: howToRenew,
  //   },
  //   `userGroup/chatroom/${userGroupId}`,
  //   signal
  // );

  return res?.data?.data?.data;
};

export const deleteAUserGroup = (userGroupId, signal = null) => {
  // queryでidを受け取る場合とbodyでidを受け取る場合の両方に対応するため、「id: objectId」を二つ書いた。
  // const paramsObj = { deleteDocument: true, id: userGroupId };
  const paramsObj = { id: userGroupId };
  const data = { id: userGroupId };

  // return deleteData(paramsObj, data, "userGroup", signal);
  return deleteData(paramsObj, data, "userGroup/deleteDocument", signal);
};
