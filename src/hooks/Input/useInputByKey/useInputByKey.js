import { useEffect, useState } from "react";

const useInputByKey = (options = {}) => {
  const {
    inputType = "text",
    labelInputByKey = "",
    valueInitial = null,
    inputRef = null,
    disabled = false,
  } = options;

  const [valueInputDetailed, setValueInputDetailed] = useState("");

  useEffect(() => {
    setValueInputDetailed(valueInitial);
  }, [valueInitial]);

  const [inputDisabled, setInputDisabled] = useState(false);
  useEffect(() => {
    setInputDisabled(disabled);
  }, [disabled]);

  const [valueInput, setValueInput] = useState(valueInputDetailed);
  function handleChangeInputByKey(event) {
    setValueInputDetailed(event.target.value);
  }

  // 一文字ごとの状態変化を管理する必要がないならこっち使う
  useEffect(() => {
    const timerId = setTimeout(() => {
      setValueInput(valueInputDetailed);
    }, 200);
    return () => {
      clearTimeout(timerId);
    };
  }, [valueInputDetailed]);

  const InputByKey = (
    <label>
      {labelInputByKey}
      {inputDisabled ? (
        valueInputDetailed
      ) : (
        <input
          type={inputType}
          // valueがnullだとエラーが出る
          value={valueInputDetailed ? valueInputDetailed : ""}
          onChange={handleChangeInputByKey}
          ref={inputRef}
          disabled={inputDisabled}
        />
      )}
    </label>
  );
  return {
    valueInputDetailed,
    // setValueInputDetailed,
    valueInput,
    // setValueInput,
    InputByKey,
    inputDisabled,
    setInputDisabled,
  };
};

export default useInputByKey;
