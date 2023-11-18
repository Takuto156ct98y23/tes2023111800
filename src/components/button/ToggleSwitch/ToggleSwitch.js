import { useCallback, useMemo } from "react";
import classes from "./ToggleSwitch.module.css";

// useToggleSwitchとセットで使う
const ToggleSwitch = ({
  backgroundColorChecked,
  backgroundColorUnChecked,

  funcOnChange = null,
  funcWhenChangeFromCheckedToUnchecked = null,
  funcWhenChangeFromUnCheckedToChecked = null,
  disabled = false,

  //   useToggleSwitchからそのまま持ってくる
  checked,
  setChecked,
}) => {
  const classNameChecked = useMemo(() => {
    switch (backgroundColorChecked) {
      case "white":
        return classes.backgroundColor_white;
      case "paleOrange":
        return classes.backgroundColor_paleOrange;
      case "darkBlue":
        return classes.backgroundColor_darkBlue;
      default:
        return classes.backgroundColor_blue;
    }
  }, [backgroundColorChecked]);
  const classNameUnChecked = useMemo(() => {
    switch (backgroundColorUnChecked) {
      case "blue":
        return classes.backgroundColor_blue;
      case "paleOrange":
        return classes.backgroundColor_paleOrange;
      case "darkBlue":
        return classes.backgroundColor_darkBlue;
      default:
        return classes.backgroundColor_white;
    }
  }, [backgroundColorUnChecked]);

  const sliderStyle = useMemo(() => {
    if (disabled) {
      return classes.backgroundColor_darkGray;
    }
    return checked ? classNameChecked : classNameUnChecked;
  }, [checked, classNameChecked, classNameUnChecked, disabled]);
  // const sliderStyle = useMemo(() => {
  //   return checked
  //     ? { backgroundColor: backgroundColorChecked }
  //     : { backgroundColor: backgroundColorUnChecked };
  // }, [backgroundColorChecked, backgroundColorUnChecked, checked]);

  const _toggleHandler = useCallback(() => {
    setChecked((prev) => !prev);

    const checkedTo = !checked;

    if (funcOnChange) {
      funcOnChange(checkedTo);
    }
    if (funcWhenChangeFromCheckedToUnchecked) {
      if (checkedTo === false) {
        funcWhenChangeFromCheckedToUnchecked();
      }
    }
    if (funcWhenChangeFromUnCheckedToChecked) {
      if (checkedTo === true) {
        funcWhenChangeFromUnCheckedToChecked();
      }
    }
  }, [
    checked,
    funcOnChange,
    funcWhenChangeFromCheckedToUnchecked,
    funcWhenChangeFromUnCheckedToChecked,
    setChecked,
  ]);

  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={_toggleHandler}
        className={classes.checkbox}
        disabled={disabled}
      />
      <span
        className={
          // classes.slider
          `${classes.slider} ${sliderStyle}`
        }
        // style={sliderStyle}
      />
    </label>
  );
};
export default ToggleSwitch;
