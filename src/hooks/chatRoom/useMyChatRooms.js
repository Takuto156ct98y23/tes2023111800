import { useCallback, useState } from "react";
import { getMyChatRooms } from "../../api/apiChatRoom";
import useInitialLoad from "../Api/useInitialLoad";

const useMyChatRooms = () => {
  const [myChatRooms, setMyChatRooms] = useState(null);

  const fetchAndRenewMyChatRooms = useCallback(async (signal) => {
    const chatRooms = await getMyChatRooms();
    if (chatRooms && 0 < chatRooms.length) {
      setMyChatRooms(chatRooms);
    }
  }, []);

  useInitialLoad(myChatRooms, fetchAndRenewMyChatRooms, "useMyChatRooms");

  return { myChatRooms };
};
export default useMyChatRooms;
