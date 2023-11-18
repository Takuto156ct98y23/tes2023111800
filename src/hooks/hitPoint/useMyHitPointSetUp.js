import useInitialLoad from "../Api/useInitialLoad";
import useMyHitPointRead from "./useMyHitPointRead";
import useMyHitPointUpdate from "./useMyHitPointUpdate";

const useMyHitPointSetUp = () => {
  const { myHitPoint } = useMyHitPointRead();
  const { getOrCreateMyHitPoint } = useMyHitPointUpdate();

  useInitialLoad(myHitPoint, getOrCreateMyHitPoint, "useMyHitPointSetUp");
};

export default useMyHitPointSetUp;
