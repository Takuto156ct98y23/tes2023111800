import { optionsDropDown_countries } from "../../../../data/constants/form/dropDownConstants";
import useFormElementDropDown from "../useFormElementDropDown";

const useFormElementDropDown_country = ({
  fieldCountry,
  initialValue_country,
  updateFunc,
}) => {
  const {
    initialOption: initialOption_country,
    selectedOption: selectedOption_country,
    selectedValue: selectedValue_country,
    // selectedLabel,
    // isDisabled: isDisabled_country,
    dropDownOnChangeHandler: dropDownOnChangeHandler_country,
    // enableDropDown,
    // disableDropDown,
    // setIsDisabled,
    updateAValueInDB: updateAValueInDB_country,
    messageDropDown: messageDropDown_country,
    errorLoading: errorLoading_country,
    errorMessage: errorMessage_country,

    disabled: disabled_country,
  } = useFormElementDropDown({
    // field: "country",
    // options: optionsDropDown_country,

    field: fieldCountry,
    updateFunc,
    valueInitial: initialValue_country,
    // options: optionsDropDown_country,
    options: optionsDropDown_countries,
  });

  return {
    initialOption_country,
    selectedOption_country,
    selectedValue_country,

    dropDownOnChangeHandler_country,
    updateAValueInDB_country,
    messageDropDown_country,
    errorLoading_country,
    errorMessage_country,
    disabled_country,
  };
};
export default useFormElementDropDown_country;
