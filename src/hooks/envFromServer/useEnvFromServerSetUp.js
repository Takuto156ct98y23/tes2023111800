import { useCallback } from "react";
import useInitialLoad from "../Api/useInitialLoad";
import { getObjects } from "../../api/apiGeneral";
import { useDispatch } from "react-redux";
import { envFromServerSliceActions } from "../../store/envFromServer/envFromServer-slice";
import useEnvFromServer from "./useEnvFromServer";
import { handleError, isGoodError } from "../../utils/utilsError";

const useEnvFromServerSetUp = () => {
  const dispatch = useDispatch();
  const { envFromServer } = useEnvFromServer();

  const getAndSetEnvFromServer = useCallback(async () => {
    try {
      const res = await getObjects(null, "data/getEnvFromServer", null);
      const envFromServer = res?.data?.data?.data;
      if (envFromServer) {
        dispatch(
          envFromServerSliceActions.overwriteTheWholeObject(envFromServer)
        );
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, [dispatch]);

  useInitialLoad(
    envFromServer,
    getAndSetEnvFromServer,
    "useEnvFromServerSetUp"
  );
};

export default useEnvFromServerSetUp;
