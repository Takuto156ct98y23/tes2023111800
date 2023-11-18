import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { objectsSliceActions } from "../store/objects/objects-slice";
import {
  getNewArrayFromFetchedAndPrevious,
  getObjectDataFromArray,
} from "../utils/arrayUtils";
import useObjectsRead from "./useObjectsRead";

const useObjectsEdit = () => {
  const { objects } = useObjectsRead();

  const dispatch = useDispatch();

  const deletePreviousObjects = useCallback(() => {
    dispatch(objectsSliceActions.renewObjects(null));
  }, [dispatch]);

  const renewObjects = useCallback(
    (objs) => {
      dispatch(objectsSliceActions.renewObjects(objs));
    },
    [dispatch]
  );

  const renewAnObj = useCallback(
    (newObj) => {
      if (!newObj) {
        return;
      }
      const objId = newObj._id;
      const previousObjData = getObjectDataFromArray("_id", objId, objects);

      if (previousObjData) {
        const index = previousObjData.index;
        dispatch(objectsSliceActions.renewAnObject({ index, newObj }));
      }
    },
    [objects, dispatch]
  );

  const addAndRenewObjects = useCallback(
    ({ ObjsFetched, doPush = true }) => {
      const newObjectArray = getNewArrayFromFetchedAndPrevious({
        ObjsPrevious: objects,
        ObjsFetched: ObjsFetched,

        doPush: doPush,
      });

      renewObjects(newObjectArray);
    },
    [objects, renewObjects]
  );

  return {
    renewObjects,
    addAndRenewObjects,
    deletePreviousObjects,
    renewAnObj,
  };
};

export default useObjectsEdit;

// const modifyObjects = (objects, sortKey, sortOrder) => {
// const modifyObjects = (objects, doPush) => {
//   const arrayLengthLimitToDeduplicate = 500;
//   let objectsModified = objectArraydeduplicated(
//     objects,
//     arrayLengthLimitToDeduplicate,
//     doPush
//   );

//   // if (sortKey) {
//   //   objectsModified = arrayOfObjectsSorted(objectsModified, sortKey, sortOrder);
//   // }

//   return objectsModified;
// };
