import { useCallback, useState } from "react";
import { getSupporters } from "../../api/apiSupporters";
import { shuffleArray } from "../../utils/arrayUtils";
import {
  SUPPORTER_TYPE_RESTOREHP_L,
  SUPPORTER_TYPE_RESTOREHP_M,
  SUPPORTER_TYPE_RESTOREHP_XL,
  SUPPORTER_TYPE_SPECIALTHANKS,
} from "../../data/constants/supporterConstants";
import { handleError, isGoodError } from "../../utils/utilsError";
import useInitialLoad from "../Api/useInitialLoad";

const useSupporters = () => {
  // readOnlyなのでuseArrayStateは使わない
  const [supporters, setSupporters] = useState(null);
  const [supportersXL, setSupportersXL] = useState(null);
  const [supportersL, setSupportersL] = useState(null);
  const [supportersM, setSupportersM] = useState(null);
  const [supportersSpecialThanks, setSupportersSpecialThanks] = useState(null);

  const [loadingSupporters, setLoadingSupporters] = useState(false);
  const [errorLoadingSupporters, setErrorLoadingSupporters] = useState(false);
  const fetchSupporters = useCallback(async () => {
    setLoadingSupporters(true);
    try {
      const res = await getSupporters();
      const supportersFetched = res?.data?.data?.data;
      if (!Array.isArray(supportersFetched)) {
        return;
      }
      shuffleArray({ array: supportersFetched });
      setSupporters(supportersFetched);
      const supportersFetchedXL = [];
      const supportersFetchedL = [];
      const supportersFetchedM = [];
      const supportersFetchedSpecialThanks = [];
      for (const aSupporter of supportersFetched) {
        const typeOfThisSupporter = aSupporter?.type;
        switch (typeOfThisSupporter) {
          case SUPPORTER_TYPE_RESTOREHP_XL:
            supportersFetchedXL.push(aSupporter);
            break;
          case SUPPORTER_TYPE_RESTOREHP_L:
            supportersFetchedL.push(aSupporter);
            break;
          case SUPPORTER_TYPE_RESTOREHP_M:
            supportersFetchedM.push(aSupporter);
            break;
          case SUPPORTER_TYPE_SPECIALTHANKS:
            supportersFetchedSpecialThanks.push(aSupporter);
            break;
          default:
            return;
        }
      }

      setSupportersXL(supportersFetchedXL);
      setSupportersL(supportersFetchedL);
      setSupportersM(supportersFetchedM);
      setSupportersSpecialThanks(supportersFetchedSpecialThanks);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setErrorLoadingSupporters(true);
    } finally {
      setLoadingSupporters(false);
    }
  }, []);

  useInitialLoad(supporters, fetchSupporters, "useSupporters");

  return {
    supporters,
    supportersXL,
    supportersL,
    supportersM,
    supportersSpecialThanks,
    loadingSupporters,
    errorLoadingSupporters,
  };
};

export default useSupporters;
