import { useEffect, useRef, useState } from "react";

const useMessageByBoolean = (
  messageWhenTrue = null,
  messageWhenFalse = null,
  messageWhenChangeToFalse = null,
  messageWhenError = null
) => {
  const [messageByBoolean, setMessageByBoolean] = useState("");
  const [boolForMessage, setBoolForMessage] = useState(null);
  const [haveError, setHaveError] = useState(false);

  const trueOnce = useRef(false);
  useEffect(() => {
    if (boolForMessage) {
      trueOnce.current = true;
    }
  }, [boolForMessage]);

  useEffect(() => {
    if (haveError) {
      setMessageByBoolean(messageWhenError);
    } else {
      if (boolForMessage) {
        setMessageByBoolean(messageWhenTrue);
      } else {
        if (messageWhenChangeToFalse && trueOnce.current) {
          setMessageByBoolean(messageWhenChangeToFalse);
          setTimeout(() => {
            setMessageByBoolean(messageWhenFalse);
          }, 2000);
        } else {
          setMessageByBoolean(messageWhenFalse);
        }
      }
    }
  }, [
    boolForMessage,
    haveError,
    messageWhenChangeToFalse,
    messageWhenError,
    messageWhenFalse,
    messageWhenTrue,
  ]);

  return {
    messageByBoolean,
    setMessageByBoolean,
    boolForMessage,
    setBoolForMessage,
    haveError,
    setHaveError,
  };
};

export default useMessageByBoolean;
