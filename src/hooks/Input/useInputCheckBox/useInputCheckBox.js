import { useState } from "react";

const useInputCheckBox = (options = {}) => {
  const {
    labelCheckBox = "",
    checkStatusInitial = false,
    inputRef = null,
  } = options;

  const [checkStatus, setCheckStatus] = useState(checkStatusInitial);
  function handleChangeCheckBox(event) {
    setCheckStatus(event.target.checked);
  }

  const InputCheckBox = (
    <label>
      {labelCheckBox}
      <input
        type="checkbox"
        checked={checkStatus}
        onChange={handleChangeCheckBox}
        ref={inputRef}
      />
    </label>
  );

  return { checkStatus, setCheckStatus, InputCheckBox };
};

export default useInputCheckBox;
