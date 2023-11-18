import { useCallback, useEffect, useMemo, useState } from "react";
import useLoadingSuccessful from "../../Api/useLoadingSuccessful";

import { handleError, isGoodError } from "../../../utils/utilsError";
import useDropDown from "../../DropDown/useDropDown/useDropDown";

// const useFormElementDropDown = ({ field, options }) => {
const useFormElementDropDown = ({
  field,
  updateFunc,
  valueInitial = null,
  options,
  callBack = null,
}) => {
  // const { me, fetchAndRenewMe } = useMe();

  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const { loadingSuccessful } = useLoadingSuccessful(loading, errorLoading);

  // const valueInitial = useMemo(() => {
  //   if (me) {
  //     return me[field];
  //   } else {
  //     return null;
  //   }
  // }, [field, me]);

  // const labelInitial = useMemo(() => {
  //   if (!options) {
  //     return null;
  //   }

  //   const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
  //     "value",
  //     valueInitial,
  //     options
  //   );

  //   return theOptionWithThisValue ? theOptionWithThisValue.label : null;
  //   // if (options && valueInitial) {
  //   //   const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
  //   //     "value",
  //   //     valueInitial,
  //   //     options
  //   //   );

  //   //   return theOptionWithThisValue ? theOptionWithThisValue.label : null;
  //   // } else {
  //   //   return null;
  //   // }
  // }, [options, valueInitial]);

  const {
    initialOption,
    // initialOption,
    selectedOption,
    // setSelectedOption,
    selectedValue,
    // selectedLabel,
    isDisabled,
    dropDownOnChangeHandler,
    enableDropDown,
    disableDropDown,
    setIsDisabled,
    resetSelectedOption,
  } = useDropDown(valueInitial, options);

  const updateAValueInDB = useCallback(
    // async (doFetchAndRenewMe = true, signal = null) => {
    async (signal = null) => {
      if (!updateFunc) {
        return;
      }
      setLoading(true);
      try {
        await updateFunc({ data: { [field]: selectedValue }, signal });
        // await updateMe({ [field]: selectedValue }, signal);
        // if (doFetchAndRenewMe) {
        //   fetchAndRenewMe();
        // }
        setErrorLoading(false);

        if (callBack) {
          callBack();
        }
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
    [field, selectedValue, updateFunc, callBack]
  );

  // const messageDropDown = useMemo(() => {
  //   if (loading) {
  //     return "通信中...";
  //   }
  //   if (loadingSuccessful) {
  //     return "更新に成功しました！";
  //   }
  //   return null;
  // }, [loading, loadingSuccessful]);

  const [messageDropDown, setMessageDropDown] = useState(null);
  useEffect(() => {
    setMessageDropDown(getMessageDropDown(loading, loadingSuccessful));
  }, [loading, loadingSuccessful]);

  const errorMessage = useMemo(() => {
    if (errorLoading) {
      return "エラーが発生しました。";
    } else {
      return null;
    }
  }, [errorLoading]);

  const disabled = useMemo(() => {
    return loading || isDisabled ? true : false;
  }, [loading, isDisabled]);

  return {
    initialOption,

    selectedOption,
    resetSelectedOption,
    selectedValue,

    dropDownOnChangeHandler,

    // isDisabled,
    enableDropDown,
    disableDropDown,
    setIsDisabled,

    updateAValueInDB,

    messageDropDown,
    setMessageDropDown,
    errorLoading,
    errorMessage,

    disabled,
  };
};
export default useFormElementDropDown;

// const useLabelInitial = () => {
//   const [labelInitial, setLabelInitial] = useState();
// };

// const getLabel = (options, value) => {
//   if (!options) {
//     return null;
//   }

//   const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
//     "value",
//     value,
//     options
//   );

//   return theOptionWithThisValue ? theOptionWithThisValue.label : null;
//   // if (options && valueInitial) {
//   //   const theOptionWithThisValue = getObjectByKeyValuePairFromObjectArray(
//   //     "value",
//   //     valueInitial,
//   //     options
//   //   );

//   //   return theOptionWithThisValue ? theOptionWithThisValue.label : null;
//   // } else {
//   //   return null;
//   // }
// };

const getMessageDropDown = (loading, loadingSuccessful) => {
  if (loading) {
    return "通信中...";
  }
  if (loadingSuccessful) {
    return "更新に成功しました！";
  }
  return null;
};
