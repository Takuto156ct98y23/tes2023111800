import { useEffect, useState } from "react";

const useLoadingSuccessful = (loading, errorLoading) => {
  const [watchingLoading, setWatchingLoading] = useState(false);
  const [loadingSuccessful, setLoadingSuccessful] = useState(null);

  useEffect(() => {
    if (loading) {
      setWatchingLoading(true);
    } else {
      if (watchingLoading) {
        if (!errorLoading) {
          setLoadingSuccessful(true);
          setTimeout(() => {
            setLoadingSuccessful(null);
          }, 5000);
        }
        setWatchingLoading(false);
      }
    }
  }, [loading, watchingLoading, errorLoading]);

  return { loadingSuccessful };
};

export default useLoadingSuccessful;
