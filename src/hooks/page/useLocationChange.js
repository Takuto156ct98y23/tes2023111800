import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

// locationのpathが変わった「後に」funcAfterLocationChangeを発動
const useLocationChange = ({ funcAfterLocationChange }) => {
  const location = useLocation();

  const pathname = useMemo(() => {
    return location?.pathname;
  }, [location]);

  const [pathNamePrev, setPathNamePrev] = useState(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (pathNamePrev && pathname !== pathNamePrev) {
      if (funcAfterLocationChange) {
        funcAfterLocationChange();
      }
    }

    setPathNamePrev(pathname);
  }, [funcAfterLocationChange, pathNamePrev, pathname]);
};

export default useLocationChange;
