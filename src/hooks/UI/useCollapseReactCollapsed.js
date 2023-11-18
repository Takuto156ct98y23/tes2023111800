import { useCallback, useState } from "react";
import { useCollapse } from "react-collapsed";

const useCollapseReactCollapsed = (options = {}) => {
  const {
    isExpandedDefault = false,
    //   animationを無効にするならtrue
    hasDisabledAnimation = false,
  } = options;
  const [isExpanded, setExpanded] = useState(isExpandedDefault);

  const { getCollapseProps, getToggleProps } = useCollapse({
    hasDisabledAnimation,
    isExpanded,
  });

  const toggleCollapse = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);
  const closeCollapse = useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  return {
    getCollapseProps,
    getToggleProps,
    isExpanded,
    toggleCollapse,
    closeCollapse,
  };
};
export default useCollapseReactCollapsed;
