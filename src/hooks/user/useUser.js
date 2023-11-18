import { useCallback, useState } from "react";
import { handleError, isGoodError } from "../../utils/utilsError";
import { getAUser } from "../../api/apiUser";
import useInitialLoad from "../Api/useInitialLoad";

const useUser = (userId) => {
  const [user, setUser] = useState(null);

  const fetchAndRenewUser = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      const res = await getAUser(userId);
      const _user = res?.data?.data?.data;
      if (_user) {
        setUser(_user);
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, [userId]);

  useInitialLoad(user, fetchAndRenewUser, "useUser", userId);

  return { user };
};

export default useUser;
