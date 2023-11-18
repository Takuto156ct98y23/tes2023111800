import { useEffect } from "react";
import { getSocket } from "../../socket";

// 書きかけ

// アプリ内のあるページに去るのではなく、アプリ外に去る（全くよそのウェブサイトに行ったりブラウザを閉じたりする）場合に発動。

// socket.ioについてはサーバー側で「socket.on("disconnect"」が自動的に発動するからこれを使う必要はない

const useLeaveApp = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useLeaveApp;

function handleBeforeUnload(event) {
  event.preventDefault();
  const socket = getSocket();
  socket.emit("leftApp");

  // Call your function here

  //   console.log("User is leaving the page");
}
