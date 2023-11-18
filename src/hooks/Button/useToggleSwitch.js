import { useState } from "react";

const useToggleSwitch = (options = {}) => {
  const { defaultChecked = false } = options;
  const [checked, setChecked] = useState(defaultChecked);

  return { checked, setChecked };
};
export default useToggleSwitch;
