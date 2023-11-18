import { useMemo } from "react";
import { useSelector } from "react-redux";

const useEnvFromServer = () => {
  const envFromServer = useSelector((state) => {
    return state.envFromServerSliceReducer.envFromServer;
  });

  const RICESPEAK_CLOUDFRONT_USERIMAGE_URL = useMemo(() => {
    switch (process.env.NODE_ENV) {
      case "development":
        return envFromServer
          ? envFromServer.RICESPEAK_CLOUDFRONT_USERIMAGE_URL
          : "";
      default:
        return "https://d3pt21sj34x4cu.cloudfront.net";
    }
  }, [envFromServer]);

  return { envFromServer, RICESPEAK_CLOUDFRONT_USERIMAGE_URL };
};

export default useEnvFromServer;
