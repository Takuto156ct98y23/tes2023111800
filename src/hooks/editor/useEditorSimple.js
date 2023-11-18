import { useCallback, useEffect, useRef, useState } from "react";

const useEditorSimple = () => {
  const [textRealTime, setTextRealTime] = useState("");
  const [text, setText] = useState(null);
  const timeout = 200;

  const timeoutId = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setText(textRealTime);
    }, timeout);
  }, [textRealTime]);

  const resetTextArea = useCallback(() => {
    setTextRealTime("");
  }, []);

  return { text, textRealTime, setTextRealTime, resetTextArea };
};

export default useEditorSimple;
