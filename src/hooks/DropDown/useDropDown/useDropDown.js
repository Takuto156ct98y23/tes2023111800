import { useCallback, useEffect, useMemo, useState } from "react";
import { getObjectByKeyValuePairFromObjectArray } from "../../../utils/arrayUtils";

const useDropDown = (
  // { value: "63d226bc2ce470f66c268cd7", label: "Myfriends" }等
  valueInitial = null,
  // labelInitial = "public"
  options,
  deleteAllSelectedOptionsWhenNullIsSelected = true,
  removeNullOptionIfOtherOptionsExistWhenIsMulti = true
) => {
  // const initialOption = useMemo(() => {
  //   return { value: valueInitial, label: labelInitial };
  // }, [valueInitial, labelInitial]);

  const initialOption = getOptionWithThisValue(valueInitial, options);
  const [selectedOption, setSelectedOption] = useState(initialOption);

  // useEffect(() => {
  //   if (initialOption) {
  //     setSelectedOption(initialOption);
  //   }
  // }, [initialOption]);

  const [isDisabled, setIsDisabled] = useState(false);
  const enableDropDown = useCallback(() => {
    setIsDisabled(false);
  }, [setIsDisabled]);
  const disableDropDown = useCallback(() => {
    setIsDisabled(true);
  }, [setIsDisabled]);

  const resetSelectedOption = useCallback(() => {
    setSelectedOption(null);
  }, [setSelectedOption]);
  // const resetSelectedOption = useCallback(
  //   (isMulti = false) => {
  //     const nullOption = getObjectByKeyValuePairFromObjectArray(
  //       "value",
  //       null,
  //       options
  //     );
  //     if (nullOption) {
  //       setSelectedOption(isMulti ? [nullOption] : nullOption);
  //     } else {
  //       setSelectedOption(null);
  //     }
  //   },
  //   [options, setSelectedOption]
  // );

  const { selectedOptionPrevious } = useSelectedOptionPrevious(selectedOption);

  // selected: if isMunti -> an array , else -> an object
  const dropDownOnChangeHandler = useCallback(
    (selected) => {
      // isMultiの場合selectedがArrayになっている
      const isMulti = Array.isArray(selected);
      if (!isMulti) {
        return setSelectedOption(selected);
      }

      const isVacant = selected.length < 1;
      if (isVacant) {
        // nullにする
        return resetSelectedOption();
      }

      if (deleteAllSelectedOptionsWhenNullIsSelected) {
        // 今回nullを含む値が入った
        if (
          !null_Is_In_SelectedOption(selectedOptionPrevious) &&
          null_Is_In_SelectedOption(selected)
        ) {
          // nullにする
          return resetSelectedOption();
        }
      }

      if (!removeNullOptionIfOtherOptionsExistWhenIsMulti) {
        return setSelectedOption(selected);
      }

      const arrayOfSelectedObjects = [];
      for (const aSelectedObj of selected) {
        if (aSelectedObj && aSelectedObj.value !== null) {
          arrayOfSelectedObjects.push(aSelectedObj);
        }
      }
      setSelectedOption(arrayOfSelectedObjects);
    },
    [
      deleteAllSelectedOptionsWhenNullIsSelected,
      selectedOptionPrevious,
      removeNullOptionIfOtherOptionsExistWhenIsMulti,
      resetSelectedOption,
    ]
  );

  const selectedValue = useMemo(() => {
    if (selectedOption) {
      if (Array.isArray(selectedOption)) {
        const values = [];
        for (const anObj of selectedOption) {
          if (anObj) {
            values.push(anObj.value);
          }
        }
        return values;
      } else {
        return selectedOption.value;
      }
    } else {
      return null;
    }
  }, [selectedOption]);
  // const selectedLabel = useMemo(() => {
  //   if (selectedOption) {
  //     return selectedOption.label;
  //   }
  // }, [selectedOption]);

  return {
    initialOption,
    // initialOption,
    selectedOption,
    setSelectedOption,
    selectedValue,
    // selectedLabel,
    isDisabled,
    dropDownOnChangeHandler,
    enableDropDown,
    disableDropDown,
    setIsDisabled,

    resetSelectedOption,
  };
};
export default useDropDown;

const getOptionWithThisValue = (value, options) => {
  if (!options) {
    return null;
  }
  if (Array.isArray(value)) {
    const theOptionsWithThisValue = [];
    for (const aValue of value) {
      const anOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
        "value",
        aValue,
        options
      );
      theOptionsWithThisValue.push(anOptionWithThisValue);
    }
    return theOptionsWithThisValue && 0 < theOptionsWithThisValue.length
      ? theOptionsWithThisValue
      : null;
  } else {
    const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
      "value",
      value,
      options
    );

    return theOptionWithThisValue ? theOptionWithThisValue : null;
  }

  // return theOptionWithThisValue ? theOptionWithThisValue.label : null;
};

const useSelectedOptionPrevious = (selectedOption) => {
  const [selectedOptionPrevious, setSelectedOptionPrevious] = useState(null);
  useEffect(() => {
    if (selectedOption) {
      setSelectedOptionPrevious(selectedOption);
    }
  }, [selectedOption]);

  return { selectedOptionPrevious };
};

const null_Is_In_SelectedOption = (selectedOption) => {
  if (selectedOption === null) {
    return true;
  }
  if (Array.isArray(selectedOption)) {
    const nullOption = getObjectByKeyValuePairFromObjectArray(
      "value",
      null,
      selectedOption
    );
    if (nullOption) {
      return true;
    }
  } else {
    if (selectedOption.value === null) {
      return true;
    }
  }

  return false;
};
