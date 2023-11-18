import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useObjectsRead = () => {
  const objects = useSelector((state) => {
    return state.objectsReducer.objects;
  });

  const [headObject, setHeadObject] = useState(null);
  const [headObjectId, setHeadObjectId] = useState(null);
  useEffect(() => {
    if (objects && 0 < objects.length) {
      const headObj = objects[0];
      setHeadObject(headObj);
      if (headObj) {
        setHeadObjectId(headObj._id);
      }
    }
  }, [objects]);

  return { objects, headObject, headObjectId };
};
export default useObjectsRead;
