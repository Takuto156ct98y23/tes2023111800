import { useCallback, useState } from "react";
import {
  createACommerceStripe,
  getMyCommerceStripe,
} from "../../api/apiCommerceStripe";
import useInitialLoad from "../Api/useInitialLoad";
import { handleError, isGoodError } from "../../utils/utilsError";

const useMyCommerceStripe = () => {
  const [myCommerceStripe, setMyCommerceStripe] = useState(null);

  const getOrCreateMyCommerceStripe = useCallback(async () => {
    try {
      const res = await getMyCommerceStripe();
      const arrayWithCommerceStripe = res?.data?.data?.data;

      if (!arrayWithCommerceStripe || arrayWithCommerceStripe.length < 1) {
        const res = await createACommerceStripe();
        setMyCommerceStripe(res?.data?.data?.data);
      } else {
        setMyCommerceStripe(arrayWithCommerceStripe[0]);
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, []);

  useInitialLoad(
    myCommerceStripe,
    getOrCreateMyCommerceStripe,
    "useMyCommerceStripe"
  );

  return { myCommerceStripe };
};
export default useMyCommerceStripe;
