import Select from "react-select";
import classes from "./DropDown.module.css";

// https://stackoverflow.com/questions/58801252/possible-to-change-font-color-on-react-select?rq=1
//   https://react-select.com/styles#overriding-the-theme
const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
  control: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  // dropdownのmenuが他の下に隠れてしまわないようにする
  menuPortal: (base) => ({ ...base, zIndex: 999999 }),
};

const DropDown = ({
  selectedOption,
  dropDownItems,
  initialOption,
  dropDownOnChangeHandler,
  labelDropDown = null,
  isDisabled = false,
  isMulti = false,
  placeholder = "選択して下さい。",
}) => {
  return (
    <div className={classes.DropDown}>
      {dropDownItems ? (
        <AreaDropDown
          selectedOption={selectedOption}
          dropDownItems={dropDownItems}
          initialOption={initialOption}
          dropDownOnChangeHandler={dropDownOnChangeHandler}
          labelDropDown={labelDropDown}
          isDisabled={isDisabled}
          isMulti={isMulti}
          placeholder={placeholder}
        />
      ) : null}
    </div>
  );
};

export default DropDown;

const AreaDropDown = ({
  selectedOption,
  dropDownItems,
  initialOption,
  dropDownOnChangeHandler,
  labelDropDown = null,
  isDisabled = false,
  isMulti = false,
  placeholder = "選ぶ",
}) => {
  return (
    <div>
      {labelDropDown}
      <Select
        value={selectedOption}
        options={dropDownItems}
        onChange={dropDownOnChangeHandler}
        styles={customStyles}
        defaultValue={initialOption}
        isDisabled={isDisabled}
        isMulti={isMulti}
        placeholder={placeholder}
        // customStylesのmenuPortalを効かせるのに必要
        menuPortalTarget={document.body}
      />
    </div>
  );
};
