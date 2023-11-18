import { deleteData, patchData, postData } from "./apiGeneral";

export const createActionDoc = (path, signal = null) => {
  // const paramsObj = { createDocument: true };

  return postData(null, null, path + "/createDocument", signal);
};

export const updateActionDoc = (
  path,
  IdTargetObject,
  howToRenew,
  signal = null
) => {
  // const paramsObj = { updateDocument: true };
  const data = { id: IdTargetObject, howToRenew: howToRenew };
  // return patchData(paramsObj, data, path, signal);
  // return patchData(null, data, path + "/updateDocument", signal);
  return patchData({
    paramsObj: null,
    data: data,
    path: path + "/updateDocument",
    signal: signal,
  });
};

export const deleteActionDoc = (path, IdTargetObject, signal = null) => {
  // queryでidを受け取る場合とbodyでidを受け取る場合の両方に対応するため、「id: objectId」を二つ書いた。
  // const paramsObj = { deleteDocument: true, id: IdTargetObject };
  const paramsObj = { id: IdTargetObject };
  const data = { id: IdTargetObject };

  return deleteData(paramsObj, data, path, signal);
  // return deleteData(paramsObj, data, path + "/deleteDocument", signal);
};
