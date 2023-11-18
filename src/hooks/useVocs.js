import { useCallback, useState } from "react";
import { handleError, isGoodError } from "../utils/utilsError";
import useInitialLoad from "./Api/useInitialLoad";
import { arrayOfObjectsSorted } from "../utils/arrayUtils";
import { getVocs } from "../api/apiVocabulary";

const useVocs = (words) => {
  const [vocs, setVocs] = useState(null);

  const fetchVocs = useCallback(async () => {
    if (!Array.isArray(words)) {
      return;
    }
    try {
      const res = await getVocs(words);
      const vocsInData = res?.data?.data?.data;
      if (Array.isArray(vocsInData)) {
        const vocsInDataSorted = arrayOfObjectsSorted(
          vocsInData,
          "vocabularyString"
        );
        setVocs(vocsInDataSorted);
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, [words]);

  useInitialLoad(vocs, fetchVocs, "useVocs");

  return { vocs };
};

export default useVocs;
