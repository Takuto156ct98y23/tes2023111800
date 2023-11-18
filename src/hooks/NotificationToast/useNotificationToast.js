import classes from "./useNotificationToast.module.css";
import { useCallback, useEffect, useMemo } from "react";

import { toast } from "react-toastify";
import { themeNotificationToast } from "../../data/constants/notificationToastConstants";

const useNotificationToast = () => {
  const basicConfigs = useMemo(() => {
    return {
      // position: "top-center",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      // rtl: false,
      draggable: true,
      progress: undefined,
      theme: themeNotificationToast,
      // style: { width: "80%" },
    };
  }, []);

  // https://fkhadra.github.io/react-toastify/how-to-style/
  // classes.useNotificationToastを:rootに組み入れて効かせる
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(classes.useNotificationToast);
    root.classList.add(classes.useNotificationToast);
  }, []);

  const displayNotificationPlain = useCallback(
    (message, additionalConfigs = {}) => {
      toast(message, { ...basicConfigs, ...additionalConfigs });
    },
    [basicConfigs]
  );

  const displayNotificationInfo = useCallback(
    (message, additionalConfigs = {}) => {
      toast.info(message, { ...basicConfigs, ...additionalConfigs });
    },
    [basicConfigs]
  );

  const displayNotificationSuccess = useCallback(
    (message, additionalConfigs = {}) => {
      toast.success(message, { ...basicConfigs, ...additionalConfigs });
    },
    [basicConfigs]
  );

  const displayNotificationError = useCallback(
    (message, additionalConfigs = {}) => {
      toast.error(message, { ...basicConfigs, ...additionalConfigs });
    },
    [basicConfigs]
  );

  return {
    displayNotificationPlain,
    displayNotificationInfo,
    displayNotificationSuccess,
    displayNotificationError,
  };
};

export default useNotificationToast;
