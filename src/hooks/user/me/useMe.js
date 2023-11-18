import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { meSliceActions } from "../../../store/me/me-slice";
import { getLoginInfo } from "../../../api/apiAuth";
import {
  statusLogin_loggedIn,
  statusLogin_loggedInAsAGuest,
} from "../../../data/constants/authConstants";
import { createGuestUser, getMe } from "../../../api/apiUser";
import { handleError, isGoodError } from "../../../utils/utilsError";
import useLanguageDefaultRead from "../../language/languageDefault/useLanguageDefaultRead";

// setupはuseMeSetUpで行う。
const useMe = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => {
    return state.meReducer.me;
  });
  const meId = useSelector((state) => {
    return state.meReducer.meId;
  });
  const meRole = useSelector((state) => {
    return state.meReducer.meRole;
  });
  const isUser = useSelector((state) => {
    return state.meReducer.isUser;
  });
  const isGuest = useSelector((state) => {
    return state.meReducer.isGuest;
  });
  const languagePlusAndMinusAreTheSame = useSelector((state) => {
    return state.meReducer.languagePlusAndMinusAreTheSame;
  });

  const { languageMinusCodeDefault, languagePlusCodeDefault } =
    useLanguageDefaultRead();

  const fetchAndRenewMe = useCallback(
    async (signal) => {
      // if (!loadMe) {
      //   return;
      // }
      try {
        let userMe;
        const loginInfo = await getLoginInfo();

        const loginStatus = loginInfo?.data?.status;

        if (
          loginStatus === statusLogin_loggedInAsAGuest ||
          loginStatus === statusLogin_loggedIn
        ) {
          const res = await getMe(signal);
          userMe = res?.data?.data?.data;
        } else {
          const res = await createGuestUser({
            data: {
              languageMinusCode: languageMinusCodeDefault,
              languagePlusCode: languagePlusCodeDefault,
            },
          });

          userMe = res?.data?.data?.user;
        }

        dispatch(meSliceActions.renewMe(userMe));
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    [
      // loadMe,
      dispatch,
      languageMinusCodeDefault,
      languagePlusCodeDefault,
    ]
  );

  const deleteMe = useCallback(() => {
    dispatch(meSliceActions.renewMe(null));
  }, [dispatch]);

  return {
    me,
    meId,
    meRole,
    fetchAndRenewMe,
    isUser,
    isGuest,
    deleteMe,
    languagePlusAndMinusAreTheSame,
  };
};
export default useMe;
