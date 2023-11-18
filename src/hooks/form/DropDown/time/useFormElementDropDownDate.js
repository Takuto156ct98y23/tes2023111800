import { useCallback, useMemo, useState } from "react";
import {
  getDayOptions,
  getYearOptions,
  getmonthIndexesOptions,
} from "../../../../utils/utilsTime";
import useMe from "../../../user/me/useMe";
import useLoadingSuccessful from "../../../Api/useLoadingSuccessful";
import useDropDown from "../../../DropDown/useDropDown/useDropDown";
import { handleError, isGoodError } from "../../../../utils/utilsError";

const useFormElementDropDownDate = (updateFunc) => {
  const yearOptions = useMemo(() => {
    return getYearOptions(150);
  }, []);
  const monthIndexOptions = useMemo(() => {
    return getmonthIndexesOptions();
  }, []);

  const { me, fetchAndRenewMe } = useMe();

  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const { loadingSuccessful } = useLoadingSuccessful(loading, errorLoading);

  const valueInitial_year = useMemo(() => {
    if (me) {
      return me["birthYear"];
    } else {
      return null;
    }
  }, [me]);

  const valueInitial_monthIndex = useMemo(() => {
    if (me) {
      return me["birthMonthIndex"];
    } else {
      return null;
    }
  }, [me]);

  const valueInitial_day = useMemo(() => {
    if (me) {
      return me["birthDay"];
    } else {
      return null;
    }
  }, [me]);

  // const labelInitial_year = useMemo(() => {
  //   if (valueInitial_year) {
  //     const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
  //       "value",
  //       valueInitial_year,
  //       yearOptions
  //     );
  //     return theOptionWithThisValue ? theOptionWithThisValue.label : null;
  //   } else {
  //     return null;
  //   }
  // }, [valueInitial_year, yearOptions]);
  // const labelInitial_month = useMemo(() => {
  //   // if(valueInitial_monthIndex)という書き方だとvalueInitial_monthIndexが０の時にバグる
  //   if (typeof valueInitial_monthIndex === "number") {
  //     const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
  //       "value",
  //       valueInitial_monthIndex,
  //       monthIndexOptions
  //     );
  //     return theOptionWithThisValue ? theOptionWithThisValue.label : null;
  //   } else {
  //     return null;
  //   }
  // }, [valueInitial_monthIndex, monthIndexOptions]);
  // const labelInitial_day = useMemo(() => {
  //   const dayOptionsInitial = getDayOptions(
  //     valueInitial_year,
  //     valueInitial_monthIndex
  //   );
  //   if (valueInitial_day) {
  //     const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
  //       "value",
  //       valueInitial_day,
  //       dayOptionsInitial
  //     );
  //     return theOptionWithThisValue ? theOptionWithThisValue.label : null;
  //   } else {
  //     return null;
  //   }
  // }, [valueInitial_year, valueInitial_monthIndex, valueInitial_day]);

  const {
    initialOption: initialOption_year,
    selectedOption: selectedOption_year,
    // setSelectedOption: setSelectedOption_year,
    selectedValue: selectedValue_year,
    // selectedLabel: selectedLabel_year,
    isDisabled: isDisabled_year,
    dropDownOnChangeHandler: dropDownOnChangeHandler_year,
    // enableDropDown: enableDropDown_year,
    // disableDropDown: disableDropDown_year,
    // setIsDisabled: setIsDisabled_year,
  } = useDropDown(valueInitial_year, yearOptions);

  const {
    initialOption: initialOption_month,
    selectedOption: selectedOption_month,
    // setSelectedOption: setSelectedOption_month,
    selectedValue: selectedValue_monthIndex,
    // selectedLabel: selectedLabel_month,
    isDisabled: isDisabled_month,
    dropDownOnChangeHandler: dropDownOnChangeHandler_month,
    // enableDropDown: enableDropDown_month,
    // disableDropDown: disableDropDown_month,
    // setIsDisabled: setIsDisabled_month,
  } = useDropDown(valueInitial_monthIndex, monthIndexOptions);

  const dayOptions = useMemo(() => {
    return getDayOptions(selectedValue_year, selectedValue_monthIndex);
  }, [selectedValue_year, selectedValue_monthIndex]);

  const {
    initialOption: initialOption_day,
    selectedOption: selectedOption_day,
    // setSelectedOption: setSelectedOption_day,
    selectedValue: selectedValue_day,
    // selectedLabel: selectedLabel_day,
    isDisabled: isDisabled_day,
    dropDownOnChangeHandler: dropDownOnChangeHandler_day,
    // enableDropDown: enableDropDown_day,
    // disableDropDown: disableDropDown_day,
    // setIsDisabled: setIsDisabled_day,
  } = useDropDown(valueInitial_day, dayOptions);

  const updateDB_date = useCallback(
    async (doFetchAndRenewMe = true, signal = null) => {
      if (!updateFunc) {
        return;
      }
      setLoading(true);

      try {
        await updateFunc(
          // {
          //   birthYear: selectedValue_year,
          //   birthMonthIndex: selectedValue_monthIndex,
          //   birthDay: selectedValue_day,
          // },
          // signal

          {
            data: {
              birthYear: selectedValue_year,
              birthMonthIndex: selectedValue_monthIndex,
              birthDay: selectedValue_day,
            },
            signal,
          }
        );

        if (doFetchAndRenewMe) {
          fetchAndRenewMe();
        }
        setErrorLoading(false);
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
        setErrorLoading(true);
        // if (isBadError(err)) {
        //   setErrorLoading(true);
        // }
      }
      setLoading(false);
    },
    [
      fetchAndRenewMe,
      selectedValue_day,
      selectedValue_monthIndex,
      selectedValue_year,
      updateFunc,
    ]
  );

  const messageDropDownDate = useMemo(() => {
    if (loading) {
      return "通信中...";
    }
    if (loadingSuccessful) {
      return "更新に成功しました！";
    }
    return null;
  }, [loading, loadingSuccessful]);
  const errorMessageDate = useMemo(() => {
    if (errorLoading) {
      return "エラーが発生しました。";
    } else {
      return null;
    }
  }, [errorLoading]);

  const disabled = useMemo(() => {
    return loading || isDisabled_year || isDisabled_month || isDisabled_day
      ? true
      : false;
  }, [loading, isDisabled_year, isDisabled_month, isDisabled_day]);

  return {
    selectedOption_year,
    yearOptions,
    initialOption_year,
    dropDownOnChangeHandler_year,

    selectedOption_month,
    monthIndexOptions,
    initialOption_month,
    dropDownOnChangeHandler_month,

    selectedOption_day,
    dayOptions,
    initialOption_day,
    dropDownOnChangeHandler_day,

    messageDropDownDate,

    errorLoading,
    errorMessageDate,

    updateDB_date,

    disabled,
  };
};

export default useFormElementDropDownDate;
