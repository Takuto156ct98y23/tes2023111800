import { useCallback, useMemo, useState } from "react";
import useLoadingSuccessful from "../Api/useLoadingSuccessful";
import { FIELDNAME_FOR_MULTER } from "../../data/constants/imageConstants";
import { handleError, isGoodError } from "../../utils/utilsError";

// const useFormElementInput = () => {
const useFormElementInput = (
  // field,
  // updateFunc,
  // initialValue,
  // uploadAFile = false
  options = {}
) => {
  const {
    field,
    updateFunc,
    initialValue,
    callbackAfterUpdate = null,
    uploadAFile = false,
  } = options;

  const [value, setValue] = useState(initialValue ? initialValue : "");

  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const onChange = useCallback(
    (event) => {
      if (uploadAFile) {
        const files = event.target?.files;

        if (files && 0 < files.length) {
          setValue(files[0]);
        }
      } else {
        setValue(event.target.value);
      }
    },
    [uploadAFile]
  );

  //   フォーム１つ１つに保存ボタンを設け、それぞれの更新を行うならこれを使う
  const updateAValueInDB = useCallback(async () => {
    if (!updateFunc) {
      return;
    }
    setLoading(true);
    try {
      // await updateFunc({ [field]: value });

      let optionsUpdateFunc;
      if (uploadAFile) {
        const formData = new FormData();

        // formData.append("photo", value);
        formData.append(FIELDNAME_FOR_MULTER, value);
        optionsUpdateFunc = {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      } else {
        optionsUpdateFunc = { data: { [field]: value } };
      }
      await updateFunc(optionsUpdateFunc);
      if (callbackAfterUpdate) {
        await callbackAfterUpdate();
      }

      setErrorLoading(false);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setErrorLoading(true);
    }
    setLoading(false);
  }, [callbackAfterUpdate, field, updateFunc, uploadAFile, value]);

  const disabled = useMemo(() => {
    return loading;
  }, [loading]);

  const { loadingSuccessful } = useLoadingSuccessful(loading, errorLoading);

  return {
    value,
    setValue,
    onChange,
    // singleInputHandler,
    loading,
    setLoading,
    errorLoading,

    updateAValueInDB,

    disabled,
    loadingSuccessful,
  };
};

export default useFormElementInput;
