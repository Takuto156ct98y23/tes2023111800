import { useCallback, useEffect, useState } from "react";
import { getObjects } from "../api/apiGeneral";
import { getReqQuery } from "../utils/reqQuery";
import useObjectsEdit from "./useObjectsEdit";
import useObjectsRead from "./useObjectsRead";
import useInitialLoad from "./Api/useInitialLoad";
import { handleError } from "../utils/utilsError";

const useObjectsGet = ({ path, reqQuery }) => {
  const { objects } = useObjectsRead();
  const { addAndRenewObjects, deletePreviousObjects } = useObjectsEdit();

  useEffect(() => {
    deletePreviousObjects();
  }, [path, deletePreviousObjects]);

  const { hasError, hasMore, setHasError, setHasMore } =
    useFetchingState(objects);

  const getAndRenewObjects = useCallback(
    async ({
      searchObj,
      getTailward,
      // sortKey,
      // sortOrder = "descending",
      //   objType = null,
      signal = null,
    }) => {
      try {
        const reqQueryToGet = getReqQuery(objects, searchObj, getTailward);

        const res = await getObjects(reqQueryToGet, path, signal);
        if (!res) {
          return;
        }

        const ObjWithObjects_data = res.data;

        let objs = ObjWithObjects_data.data.data;

        // if (objType === "follow" || objType === "followedBy") {
        //   objs = objs[0]?.ids;
        // }

        if (objs && 0 < objs.length) {
          setHasMore(true);
        } else {
          // より古いものを得るには手動でページを押し下げる必要があり、「読み込み中」のような表示がずっと出続けることもないのでfalseにはしない
          if (getTailward) {
            setHasMore(false);
          }
          // setHasMore(false);
        }

        addAndRenewObjects({
          ObjsFetched: objs,
          doPush: getTailward ? true : false,
        });

        // if (getTailward) {
        //   addAndRenewObjects({ objs, doPush: true });
        // } else {
        //   addAndRenewObjects({ objs, doPush: false });
        // }

        setHasError(false);
      } catch (err) {
        handleError({ err });

        // if (err.message !== "canceled") {
        //   console.log("err!", err);
        //   setHasError(true);
        // }
      }
    },
    [addAndRenewObjects, objects, setHasError, setHasMore, path]
  );

  const _getObjectsPreset = useCallback(
    async ({ getTailward, signal = null }) => {
      await getAndRenewObjects({
        reqQuery,
        getTailward,
        signal,
      });
    },
    [reqQuery, getAndRenewObjects]
  );

  const getObjectsTailward = useCallback(
    async (signal = null) => {
      await _getObjectsPreset({ getTailward: true, signal });
    },
    [_getObjectsPreset]
  );
  const getObjectsHeadward = useCallback(
    async (signal = null) => {
      // const previousHeadObj = objects && 0 < objects.length ? objects[0] : null;

      await _getObjectsPreset({ getTailward: false, signal });

      // if (previousHeadObj) {
      //   // 以下のscroller.scrollToを利用するにはreact-scrollのElementを目標のcomponent内に「<ElementScrollTo name={`${anObj._id}`} />」のようにして仕込んでおく必要がある
      //   scroller.scrollTo(previousHeadObj._id);
      //   // scroller.scrollTo(previousHeadObj._id, { smooth: true });
      // }
    },
    [_getObjectsPreset]
  );

  useInitialLoad(objects, getObjectsTailward, "useObjectsGet");

  return {
    hasError,
    hasMore,
    getAndRenewObjects,
    getObjectsTailward,
    getObjectsHeadward,
  };
};

export default useObjectsGet;

const useFetchingState = (objects) => {
  const defaultStateHasError = false;
  const defaultStateHasMore = true;

  const [hasError, setHasError] = useState(defaultStateHasError);
  const [hasMore, setHasMore] = useState(defaultStateHasMore);

  useEffect(() => {
    if (!objects) {
      setHasError(defaultStateHasError);
      setHasMore(defaultStateHasMore);
    }
  }, [objects, defaultStateHasError, defaultStateHasMore]);

  return { hasError, hasMore, setHasError, setHasMore };
};

// const getIdHead = (objects) => {
//   if (objects && 0 < objects.length) {
//     // return objects[0];
//     const headObj = objects[0];
//     return headObj?._id;
//   }
// };

// const getLastId = (objects) => {
//   if (objects && 0 < objects.length) {
//     // return objects[objects.length - 1];
//     const lastObj = objects[objects.length - 1];
//     return lastObj?._id;
//   }
// };

// const getReqQuery = (objects, searchObj, getTailward) => {
//   const reqQueryObj = {
//     ...searchObj,
//     pageId: window.location.pathname,
//   };

//   if (getTailward) {
//     const criterionFromTail = getLastId(objects);
//     if (criterionFromTail) {
//       reqQueryObj.criterionFromTail = criterionFromTail;
//     } else {
//       // queryの場合nullが遅れないっぽいので
//       reqQueryObj.criterionFromTail = "";
//     }
//   } else {
//     const criterionFromHead = getIdHead(objects);
//     if (criterionFromHead) {
//       reqQueryObj.criterionFromHead = criterionFromHead;
//     } else {
//       // 全ての投稿を読み切ってしまった後ページを再読み込みしたりするとこうなる
//       reqQueryObj.criterionFromHead = "";
//     }
//   }

//   return reqQueryObj;
// };
