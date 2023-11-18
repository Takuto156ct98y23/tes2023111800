import { useCallback, useState } from "react";

const useTooltip = () => {
  const [displayTextTooltip, setDisplayTextTooltip] = useState(false);
  const onMouseEnterHandlerTooltip = useCallback(() => {
    setDisplayTextTooltip(true);
  }, []);
  const onMouseLeaveHandlerTooltip = useCallback(() => {
    setDisplayTextTooltip(false);
  }, []);
  return {
    displayTextTooltip,
    onMouseEnterHandlerTooltip,
    onMouseLeaveHandlerTooltip,
  };
};
export default useTooltip;
