import useInitialLoad from "../Api/useInitialLoad";
import useMyLanguageUpdate from "./useMyLanguageUpdate";
import useMyLanguageRead from "./useMyLanguageRead";

const useMyLanguageSetup = () => {
  const { myLanguage } = useMyLanguageRead();
  const { fetchMyLanguage } = useMyLanguageUpdate();

  useInitialLoad(myLanguage, fetchMyLanguage, "useMyLanguageSetup");
};

export default useMyLanguageSetup;
