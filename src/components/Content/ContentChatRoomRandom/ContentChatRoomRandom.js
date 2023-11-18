import classes from "./ContentChatRoomRandom.module.css";

import { useCallback, useEffect, useMemo, useState } from "react";
import useInitialLoad from "../../../hooks/Api/useInitialLoad";
import { getSocket } from "../../../socket";
import { socketEventName_compensation } from "../../../data/constants/socketConstants";
import { getRicePointsOfTheRicesAsCompensation } from "../../../api/apiRice";
import { handleError, isGoodError } from "../../../utils/utilsError";
import { Link } from "react-router-dom";
import useChatRoomRandomConfig from "../../../hooks/chatRoomRandomConfig/useChatRoomRandomConfig";
import ButtonChatRoomRandom from "../../button/ButtonChatRoomRandom/ButtonChatRoomRandom";
import useButtonChatRoomRandom from "../../../hooks/Button/chatRoom/random/useButtonChatRoomRandom";
import ButtonBasic from "../../button/Basic/ButtonBasic";
import ContentChatRoomRandomConfig from "../ContentChatRoomRandomConfig/ContentChatRoomRandomConfig";
import { chatRoomRandomConfigStatus_preparing } from "../../../data/constants/chatRoomRandomConfigConstants";

const ContentChatRoomRandom = () => {
  // http://localhost:3000/chatrooms-random/short/friends

  const {
    status,
    setStatus,
    chatRoomRandomId,
    //  setUpReady,

    chatRoomRandomConfig,
    active,
    wannaChat,
    setWannaChat,
    getOrCreateChatRoomRandomConfig,
    disabled_all,
    disabled_inputArea,
    loadingChatRoomRandomConfig,
  } = useChatRoomRandomConfig();

  const {
    messageMain,
    messageSub,
    // messageStatus,
    onClickHandlerButtonChatRoomRandom,
    isDisabledButtonChatRoomRandom,
  } = useButtonChatRoomRandom({
    status,
    setStatus,
    chatRoomRandomId,
    // waitingOtherChatRoomRandom,
    disabled_all,
    loadingChatRoomRandomConfig,
  });

  const {
    isOpen,
    toggleAreaButtonJumpToConfig,
    disabledAreaButtonJumpToConfig,
  } = useAreaButtonJumpToConfig({
    status,
  });

  return (
    <div className={classes.ContentChatRoomRandom}>
      {/* <PageTop /> */}

      <div className={classes.AreaButtonChatRoomRandom}>
        <ButtonChatRoomRandom
          messageMain={messageMain}
          messageSub={messageSub}
          // messageStatus={messageStatus}
          onClickHandlerButtonChatRoomRandom={
            onClickHandlerButtonChatRoomRandom
          }
          isDisabledButtonChatRoomRandom={isDisabledButtonChatRoomRandom}
          // waitingOtherChatRoomRandom={waitingOtherChatRoomRandom}
        />

        {/* <MessageBelowButtonChatRoomRandom
            status={status}
            waitingOtherChatRoomRandom={waitingOtherChatRoomRandom}
          /> */}
      </div>

      {false ? (
        // 強制非表示中
        <AreaCompensation />
      ) : null}

      <AreaButtonJumpToConfig
        // scope={scope}
        // chatLength={chatLength}
        // status={status}

        chatRoomRandomConfig={chatRoomRandomConfig}
        active={active}
        wannaChat={wannaChat}
        setWannaChat={setWannaChat}
        getOrCreateChatRoomRandomConfig={getOrCreateChatRoomRandomConfig}
        disabled_all={disabled_all}
        disabled_inputArea={disabled_inputArea}
        isOpen={isOpen}
        toggleAreaButtonJumpToConfig={toggleAreaButtonJumpToConfig}
        disabledAreaButtonJumpToConfig={disabledAreaButtonJumpToConfig}
      />

      {/* {isGuest ? <ContentLetsLogin /> : null} */}
    </div>
  );
};

export default ContentChatRoomRandom;

// const PageTop = () => {
//   const params = useParams();

//   const scope = useMemo(() => {
//     return params?.scope;
//   }, [params]);
//   const chatLength = useMemo(() => {
//     return params?.chatLength;
//   }, [params]);
//   // const [strTimeLength, setStrTimeLength] = useState("");

//   // useEffect(() => {
//   //   switch (chatLength) {
//   //     case chatRoomRandomConfigLength_Short:
//   //       setStrTimeLength("５分間");
//   //       break;
//   //     case chatRoomRandomConfigLength_long:
//   //       setStrTimeLength("２４時間");
//   //       break;
//   //     default:
//   //   }
//   // }, [chatLength]);

//   const strTimeLength = useMemo(() => {
//     switch (chatLength) {
//       case chatRoomRandomConfigLength_Short:
//         return "５分間";
//       case chatRoomRandomConfigLength_long:
//         return "２４時間";
//       default:
//     }
//   }, [chatLength]);

//   // const [titleStrScope, setTitleStrScope] = useState("");
//   // useEffect(() => {
//   //   switch (scope) {
//   //     case chatRoomRandomConfigScope_public:
//   //       setTitleStrScope("この世界の誰か");
//   //       break;
//   //     case chatRoomRandomConfigScope_friends:
//   //       setTitleStrScope("友達の誰か");
//   //       break;
//   //     case chatRoomRandomConfigScope_friendsOfMyFriends:
//   //       setTitleStrScope("友達の友達の誰か");
//   //       break;
//   //     default:
//   //   }
//   // }, [scope]);

//   const titleStrScope = useMemo(() => {
//     switch (scope) {
//       case chatRoomRandomConfigScope_public:
//         return "この世界の誰か";
//       case chatRoomRandomConfigScope_friends:
//         return "友達の誰か";
//       case chatRoomRandomConfigScope_friendsOfMyFriends:
//         return "友達の友達の誰か";
//       default:
//     }
//   }, [scope]);

//   // const [strScope, setStrScope] = useState("");
//   // useEffect(() => {
//   //   switch (scope) {
//   //     case chatRoomRandomConfigScope_public:
//   //       setStrScope("この世界の");
//   //       break;
//   //     case chatRoomRandomConfigScope_friends:
//   //       setStrScope("友達の");
//   //       break;
//   //     case chatRoomRandomConfigScope_friendsOfMyFriends:
//   //       setStrScope("友達の友達の");
//   //       break;
//   //     default:
//   //   }
//   // }, [scope]);

//   const strScope = useMemo(() => {
//     switch (scope) {
//       case chatRoomRandomConfigScope_public:
//         return "この世界の";
//       case chatRoomRandomConfigScope_friends:
//         return "友達の";
//       case chatRoomRandomConfigScope_friendsOfMyFriends:
//         return "友達の友達の";
//       default:
//     }
//   }, [scope]);

//   const messageMain = useMemo(() => {
//     return typeof titleStrScope === "string" ? `${titleStrScope}と会話` : "";
//   }, [titleStrScope]);
//   const messageSub = useMemo(() => {
//     return typeof strScope === "string" && typeof strTimeLength === "string"
//       ? `ランダムに${strScope}誰かと${strTimeLength}
//     会話しよう😊😆\n${strTimeLength}たったらチャットは消えちゃうよ👻`
//       : "";
//   }, [strScope, strTimeLength]);

//   return (
//     <div className={classes.PageTop}>
//       <h5 className={classes.PageTop__title}>
//         {/* {titleStrScope}と会話({strTimeLength}) */}
//         {/* {titleStrScope}と会話 */}
//         {messageMain}
//       </h5>

//       <div className={classes.PageTop__explanation}>
//         {/* <p>
//           ランダムに{strScope}誰かと{strTimeLength}
//           会話しよう😊😆
//         </p>
//         <p>{strTimeLength}たったらチャットは消えちゃうよ👻</p> */}
//         <p>{messageSub}</p>
//       </div>
//     </div>
//   );
// };

const useAreaCompensation = () => {
  const [objWithRicePoints, setObjWithRicePoints] = useState(null);
  const ricePointsOfTheRicesAsCompensation = useMemo(() => {
    if (objWithRicePoints) {
      return objWithRicePoints.data?.data?.data
        ?.ricePointsOfTheRicesAsCompensation;
    }
  }, [objWithRicePoints]);

  const [compensationWasNewlyMade, setCompensationWasNewlyMade] =
    useState(false);

  const messageSorryForNotMatched = "ごめんね🙇‍♂️マッチしなかったみたい😖";

  const messageAboutPoints = useMemo(() => {
    if (
      typeof ricePointsOfTheRicesAsCompensation === "number" &&
      0 < ricePointsOfTheRicesAsCompensation
    ) {
      return `AI会話の無料枠が${ricePointsOfTheRicesAsCompensation}ライス残っているよ！使ってみてね！🤗`;
    }
  }, [ricePointsOfTheRicesAsCompensation]);

  const messageAreaCompensation = useMemo(() => {
    return compensationWasNewlyMade
      ? [messageSorryForNotMatched, messageAboutPoints].join("\n")
      : messageAboutPoints;
  }, [compensationWasNewlyMade, messageAboutPoints]);

  const fetchRicePointsOfTheRicesAsCompensation = useCallback(
    async (signal = null) => {
      try {
        const _objWithRicePoints = await getRicePointsOfTheRicesAsCompensation(
          signal
        );
        if (_objWithRicePoints) {
          setObjWithRicePoints(_objWithRicePoints);
        }
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    []
  );

  useSocketAreaCompensation(
    fetchRicePointsOfTheRicesAsCompensation,
    setCompensationWasNewlyMade
  );

  useInitialLoad(
    objWithRicePoints,
    fetchRicePointsOfTheRicesAsCompensation,
    "useAreaCompensation"
  );

  return { messageAreaCompensation };
};

const useSocketAreaCompensation = (
  fetchRicePointsOfTheRicesAsCompensation,
  setCompensationWasNewlyMade
) => {
  const socket = getSocket();
  useEffect(() => {
    socket.on(socketEventName_compensation, async () => {
      await fetchRicePointsOfTheRicesAsCompensation();
      setCompensationWasNewlyMade(true);
    });
    return () => {
      socket.off(socketEventName_compensation);
    };
  });
};

const AreaCompensation = () => {
  const { messageAreaCompensation } = useAreaCompensation();
  return (
    <div className={classes.AreaCompensation}>
      <p className={classes.AreaCompensation__message}>
        {messageAreaCompensation}
      </p>
      <Link
        className={classes.AreaCompensation__linkMessage}
        to={"/chatroom/ai-enja"}
      >
        ＞＞AIと会話する
      </Link>
    </div>
  );
};

const useAreaButtonJumpToConfig = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);

  const disabledAreaButtonJumpToConfig = useMemo(() => {
    return status !== chatRoomRandomConfigStatus_preparing;
  }, [status]);

  useEffect(() => {
    if (disabledAreaButtonJumpToConfig) {
      setIsOpen(false);
    }
  }, [disabledAreaButtonJumpToConfig]);

  const toggleAreaButtonJumpToConfig = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    toggleAreaButtonJumpToConfig,
    disabledAreaButtonJumpToConfig,
  };
};

const AreaButtonJumpToConfig = ({
  chatRoomRandomConfig,
  active,
  wannaChat,
  setWannaChat,
  getOrCreateChatRoomRandomConfig,
  disabled_all,
  disabled_inputArea,

  isOpen,
  toggleAreaButtonJumpToConfig,
  disabledAreaButtonJumpToConfig,
}) => {
  return (
    <div className={classes.AreaButtonJumpToConfig}>
      <ButtonBasic
        onClick={toggleAreaButtonJumpToConfig}
        disabled={disabledAreaButtonJumpToConfig}
      >
        <p>{isOpen ? "閉じる" : "マッチ設定"}</p>
      </ButtonBasic>

      {isOpen ? (
        <ContentChatRoomRandomConfig
          chatRoomRandomConfig={chatRoomRandomConfig}
          active={active}
          wannaChat={wannaChat}
          setWannaChat={setWannaChat}
          getOrCreateChatRoomRandomConfig={getOrCreateChatRoomRandomConfig}
          disabled_all={disabled_all}
          disabled_inputArea={disabled_inputArea}
        />
      ) : null}
    </div>
  );
};
