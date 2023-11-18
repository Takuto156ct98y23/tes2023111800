import { useCallback } from "react";

import { logout } from "../../api/apiAuth";

import useMe from "../user/me/useMe";

const useAuth = () => {
  const { deleteMe } = useMe(false);

  const logOutAfterDeleteMe = useCallback(async () => {
    deleteMe();
    return await logout();
  }, [deleteMe]);

  return { logOutAfterDeleteMe };
};
export default useAuth;
