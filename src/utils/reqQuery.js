const getIdTail = (objects) => {
  if (objects && 0 < objects.length) {
    // return objects[objects.length - 1];
    const lastObj = objects[objects.length - 1];
    return lastObj?._id;
  }
};
const getIdHead = (objects) => {
  if (objects && 0 < objects.length) {
    // return objects[0];
    const headObj = objects[0];
    return headObj?._id;
  }
};

export const getReqQuery = (objects, queryObj, getTailward) => {
  const reqQueryObj = {
    ...queryObj,
    pageId: window.location.pathname,
  };

  if (getTailward) {
    const criterionFromTail = getIdTail(objects);
    if (criterionFromTail) {
      reqQueryObj.criterionFromTail = criterionFromTail;
    } else {
      // queryの場合nullが遅れないっぽいので
      reqQueryObj.criterionFromTail = "";
    }
  } else {
    const criterionFromHead = getIdHead(objects);
    if (criterionFromHead) {
      reqQueryObj.criterionFromHead = criterionFromHead;
    } else {
      // 全ての投稿を読み切ってしまった後ページを再読み込みしたりするとこうなる
      reqQueryObj.criterionFromHead = "";
    }
  }

  return reqQueryObj;
};
