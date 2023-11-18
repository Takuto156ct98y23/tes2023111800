import { useCallback } from "react";
import classes from "./ButtonBasic.module.css";

const ButtonBasic = ({
  onClick,
  disabled,
  children,
  className,
  style,
  displaySyntheticBaseEvent = false,
}) => {
  // ButtonBasicのprops?.onClickを直にbuttonのonClickに入れてしまうと、syntheticBaseEventが強制でargumentとして入れられてしまうため、ワンクッション挟む必要がある
  const _buttonBasicHandler = useCallback(
    (syntheticBaseEvent) => {
      if (displaySyntheticBaseEvent) {
        console.log("syntheticBaseEvent", syntheticBaseEvent);
      }
      if (onClick) {
        onClick();
      }
    },
    [displaySyntheticBaseEvent, onClick]
  );

  return (
    <button
      className={[classes.ButtonBasic, className].join(" ")}
      onClick={_buttonBasicHandler}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};
export default ButtonBasic;

// SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: p, …}
