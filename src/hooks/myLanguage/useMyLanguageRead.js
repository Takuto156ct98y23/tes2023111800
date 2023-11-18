import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getObjectByKeyValuePairFromObjectArray } from "../../utils/arrayUtils";

const useMyLanguageRead = () => {
  const myLanguage = useSelector((state) => {
    return state.myLanguageReducer.myLanguage;
  });

  const isoCodeGoogle = useSelector((state) => {
    return state.myLanguageReducer.isoCodeGoogle;
  });
  const isoCodeGoogles = useSelector((state) => {
    return state.myLanguageReducer.isoCodeGoogles;
  });
  const nameEn = useSelector((state) => {
    return state.myLanguageReducer.nameEn;
  });
  const nameEnLowered = useSelector((state) => {
    return state.myLanguageReducer.nameEnLowered;
  });
  const nameNative = useSelector((state) => {
    return state.myLanguageReducer.nameNative;
  });

  // あるisoCodeGoogleに対応する言語について、その言語のmyLanguageでの名前を返す
  const getNameOfALanguageInMyLanguage = useCallback(
    (options = {}) => {
      const { code } = options;
      const objWithName = getObjectByKeyValuePairFromObjectArray(
        "code",
        code,
        isoCodeGoogles
      );
      return objWithName?.name;
    },
    [isoCodeGoogles]
  );

  return {
    myLanguage,
    isoCodeGoogle,
    isoCodeGoogles,
    nameEn,
    nameEnLowered,
    nameNative,
    getNameOfALanguageInMyLanguage,
  };
};

export default useMyLanguageRead;
