import classes from "./TextareaAutoGrowing.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

const TextareaAutoGrowing = ({
  // px。入力欄の高さの最低値。"auto"のようなstringまたは20のようなnumber
  // autoはsingle line height
  minHeight = "auto",
  // px。入力欄の高さの最大値。
  maxHeight,
  autoComplete = false,
  // https://stackoverflow.com/a/64837759
  // ここが空欄だと、autofillが出てしまう可能性がある。
  name = "TextareaAutoGrowing",
  disabled = false,

  textRealTime,
  setTextRealTime,

  onChange = null,
}) => {
  const textareaRef = useRef(null);

  const { height, resetHeight, updateHeight } = useHeight(
    textareaRef,
    minHeight,
    maxHeight
  );

  const _handleChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      }
      updateHeight();
      const text = textareaRef.current.value;
      if (setTextRealTime) {
        setTextRealTime(text);
      }
      // setTextRealTime(text);
      if (!text) {
        resetHeight();
      }
      // setTextRealTime(event.target.value);
    },
    [resetHeight, setTextRealTime, updateHeight, onChange]
  );
  return (
    <div className={classes.TextareaAutoGrowing}>
      <textarea
        className={classes.textarea}
        ref={textareaRef}
        rows="1"
        style={{ height: typeof height === "string" ? height : `${height}px` }}
        onChange={_handleChange}
        disabled={disabled}
        value={textRealTime}
        autoComplete={autoComplete ? "on" : "off"}
        name={name}
      />
    </div>
  );
};

export default TextareaAutoGrowing;

const useHeight = (textareaRef, minHeight, maxHeight) => {
  const [height, setHeight] = useState(minHeight);
  const initialHeight = useRef(null);

  const resetHeight = useCallback(() => {
    // Reset the textarea height to its minimum height (single line height)
    textareaRef.current.style.height = "auto";
    setHeight(initialHeight.current);
  }, [textareaRef]);

  const updateHeight = useCallback(() => {
    const scrollHeight = textareaRef.current.scrollHeight;
    if (initialHeight.current === null) {
      initialHeight.current = scrollHeight;
    }

    // Calculate the new height based on scrollHeight and maxHeight
    const newHeight = Math.min(scrollHeight, maxHeight);
    setHeight((prev) => {
      // prevがauto等の場合
      if (typeof prev === "string") {
        return newHeight;
      }

      if (!prev) {
        resetHeight();
      }

      // 文字入力は増えているのに入力欄が狭まる現象を防ぐ。
      if (prev <= newHeight) {
        return newHeight;
      } else {
        return prev;
      }
    });
  }, [maxHeight, resetHeight, textareaRef]);

  // 初期設定
  useEffect(() => {
    updateHeight();
  }, [updateHeight]);

  return { height, resetHeight, updateHeight };
};
