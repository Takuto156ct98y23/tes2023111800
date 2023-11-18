import { useSelector } from "react-redux";

const useLanguageDefaultRead = () => {
  const languageMinusCodeDefault = useSelector((state) => {
    return state.languageDefaultSliceReducer.languageMinusCodeDefault;
  });
  const languagePlusCodeDefault = useSelector((state) => {
    return state.languageDefaultSliceReducer.languagePlusCodeDefault;
  });

  return {
    languageMinusCodeDefault,
    languagePlusCodeDefault,
  };
};

export default useLanguageDefaultRead;
