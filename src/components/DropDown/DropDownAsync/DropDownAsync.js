import classes from "./DropDownAsync.module.css";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const DropDownAsync = ({
  getOptionsDebounced,
  handleChange,
  initialOptionDropDownAsync = [],
  getDropDownCardObj,
  isDisabled = false,
}) => {
  return (
    <div className={classes.DropDownAsync}>
      <AsyncSelect
        loadOptions={getOptionsDebounced}
        formatOptionLabel={getDropDownCardObj}
        components={animatedComponents}
        isMulti
        onChange={handleChange}
        menuIsOpen={true}
        cacheOptions
        placeholder="入力"
        defaultValue={initialOptionDropDownAsync}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default DropDownAsync;
