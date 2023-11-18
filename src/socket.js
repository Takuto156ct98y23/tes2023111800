import io from "socket.io-client";
import { REACT_APP_BACKEND_URL } from "./data/constants/network";
import { SOCKET_EVENT_NAME_INIT } from "./data/constants/socketConstants";
let socket;

export const initSocket = (userId) => {
  socket = io(`${REACT_APP_BACKEND_URL}`);

  socket.emit(SOCKET_EVENT_NAME_INIT, userId);
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket.io not initialized!");
  }
  return socket;
};
