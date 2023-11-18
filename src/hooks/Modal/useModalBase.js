import { useCallback, useState } from "react";
import useLocationChange from "../page/useLocationChange";

const useModalBase = (options = {}) => {
  const {
    // ページのpathが変わった時にmodalを閉じるならtrue
    closeWhenPathChanges = true,
  } = options;
  const [isOpen, setIsOpen] = useState(false);

  const openAreaModalBase = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeAreaModalBase = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleAreaModalBase = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useLocationChange({
    funcAfterLocationChange: closeWhenPathChanges ? closeAreaModalBase : null,
  });

  return {
    isOpen,
    openAreaModalBase,
    closeAreaModalBase,
    toggleAreaModalBase,
  };
};

export default useModalBase;
