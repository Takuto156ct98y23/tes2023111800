import { useEffect, useRef } from "react";
import { getSocket } from "../../socket";
import useInitialLoad from "../Api/useInitialLoad";
import useRiceRead from "./useRiceRead";
import useRiceUpdate from "./useRiceUpdate";
import { socketEventName_fetchAndRenewMyRice } from "../../data/constants/socketConstants";
import { fillRicePointsToMinimumDeposit } from "../../api/apiRice";

const useRiceSetUp = () => {
  const { dataWithRice } = useRiceRead();
  const { fetchAndRenewMyRice } = useRiceUpdate();

  // myRiceはzero（falsy）になる可能性があるので直接入れてはならない
  useInitialLoad(dataWithRice, fetchAndRenewMyRice, "useMyRice");

  useSocketMyRice(fetchAndRenewMyRice);

  const calledFillRicePointsToMinimumDeposit = useRef(false);
  useEffect(() => {
    if (!dataWithRice) {
      return;
    }
    if (calledFillRicePointsToMinimumDeposit.current) {
      return;
    }
    calledFillRicePointsToMinimumDeposit.current = true;
    fillRicePointsToMinimumDeposit();
  }, [dataWithRice]);
};

export default useRiceSetUp;

const useSocketMyRice = (fetchAndRenewMyRice) => {
  const socket = getSocket();

  useEffect(() => {
    socket.on(socketEventName_fetchAndRenewMyRice, fetchAndRenewMyRice);

    return () => {
      socket.off(socketEventName_fetchAndRenewMyRice);
    };
  }, [fetchAndRenewMyRice, socket]);
};
