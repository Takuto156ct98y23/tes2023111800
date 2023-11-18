import { useCallback, useEffect, useMemo, useRef } from "react";

import useMessageByBoolean from "../useMessageByBoolean";
import ButtonBasic from "../../components/button/Basic/ButtonBasic";

const useButtonByBoolean = ({
  boolForButton,
  errorboolForButton = null,
  labelWhenTrue = null,
  labelWhenFalse = null,
  labelWhenChangeToFalse = null,
  labelWhenError = null,
  disabledWhenTrue = false,
  funcOnClickOfArgument = null,
  // 諸々汎用的にdisableにするのに使う
  disabled = false,
}) => {
  const funcOnClickOfRef = useRef(null);

  const {
    messageByBoolean,
    // setMessageByBoolean,
    // boolForMessage,
    setBoolForMessage,
    // haveError,
    setHaveError,
  } = useMessageByBoolean(
    labelWhenTrue,
    labelWhenFalse,
    labelWhenChangeToFalse,
    labelWhenError
  );
  useEffect(() => {
    setBoolForMessage(boolForButton);
    setHaveError(errorboolForButton);
  }, [boolForButton, errorboolForButton, setBoolForMessage, setHaveError]);

  const onClickHandler = useCallback(() => {
    // useButtonByBooleanを呼び出す前から関数が用意できているならfuncOnClickOfArgument
    if (funcOnClickOfArgument) {
      funcOnClickOfArgument();
    }
    // useButtonByBooleanを呼び出した後に関数を入れたいならfuncOnClickOfRef.currentに。ただしこれはrefなので色々クセが強い。
    if (funcOnClickOfRef.current) {
      funcOnClickOfRef.current();
    }
  }, [funcOnClickOfArgument]);

  const ButtonByBoolean = useMemo(() => {
    return (
      <ButtonBasic
        onClick={onClickHandler}
        disabled={
          disabled || errorboolForButton || (disabledWhenTrue && boolForButton)
        }
      >
        {messageByBoolean}
      </ButtonBasic>
    );
  }, [
    boolForButton,
    disabledWhenTrue,
    errorboolForButton,
    messageByBoolean,
    onClickHandler,
    disabled,
  ]);

  return {
    funcOnClickOfRef,
    ButtonByBoolean,
  };
};

export default useButtonByBoolean;
