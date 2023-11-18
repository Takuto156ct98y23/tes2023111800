import { useCallback, useState } from "react";
import { createAChatRoom } from "../../api/apiChatRoom";
import { handleError, isGoodError } from "../../utils/utilsError";

const useCreateChatRoom = () => {
  const [creatingNewChatRoom, setCreatingNewChatRoom] = useState(false);
  const [haveErrorCreatingNewChatRoom, setHaveErrorCreatingNewChatRoom] =
    useState(false);

  const createNewChatRoom = useCallback(
    async ({ userIds, name, isPrivate = true, callback }) => {
      setCreatingNewChatRoom(true);

      try {
        // await createAChatRoom({

        const reqBody = {
          userIds: userIds,
          name: name,
          isPrivate: isPrivate,
        };

        // if (isPrivate) {
        //   reqBody.isPrivate = isPrivate;
        // }

        const chatRoomCreated = await createAChatRoom({ reqBody });
        // const chatRoomCreated = await createAChatRoom({
        //   userIds: userIds,
        //   name: name,
        // });

        setHaveErrorCreatingNewChatRoom(false);

        if (callback) {
          // callback();
          callback(chatRoomCreated);
        }
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
        // if (error.name !== "CanceledError") {
        //   console.log("error", error);
        //   setHaveErrorCreatingNewChatRoom(true);
        // }
        setHaveErrorCreatingNewChatRoom(true);
      }

      setCreatingNewChatRoom(false);
    },
    []
  );

  return {
    creatingNewChatRoom,
    haveErrorCreatingNewChatRoom,
    setCreatingNewChatRoom,
    setHaveErrorCreatingNewChatRoom,
    createNewChatRoom,
  };
};

export default useCreateChatRoom;
