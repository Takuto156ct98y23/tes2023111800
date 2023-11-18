import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  chatRoomRandomConfigLength_Short,
  chatRoomRandomConfigLength_long,
  chatRoomRandomConfigScope_friends,
  chatRoomRandomConfigScope_friendsOfMyFriends,
  chatRoomRandomConfigScope_public,
  chatRoomRandomConfigStatus_chatting,
  chatRoomRandomConfigStatus_preparing,
  chatRoomRandomConfigStatus_waiting,
} from "../../../../data/constants/chatRoomRandomConfigConstants";
import { registerChatRoomRandom } from "../../../../api/apiChatRoom";
import { handleError } from "../../../../utils/utilsError";
import useMe from "../../../user/me/useMe";
import useMyLanguageRead from "../../../myLanguage/useMyLanguageRead";

const useButtonChatRoomRandom = ({
  status,
  setStatus,
  chatRoomRandomId,
  //   waitingOtherChatRoomRandom,
  disabled_all,
  loadingChatRoomRandomConfig,
}) => {
  const params = useParams();

  const chatLength = useMemo(() => {
    return params?.chatLength;
  }, [params]);
  const scope = useMemo(() => {
    return params?.scope;
  }, [params]);

  const startChatRoomRandom = useCallback(async () => {
    try {
      await registerChatRoomRandom(scope, chatLength);
    } catch (err) {
      handleError({ err });
    }
  }, [chatLength, scope]);

  const { isUser } = useMe();

  const navigate = useNavigate();
  const onClickHandlerButtonChatRoomRandom = useCallback(async () => {
    if (!isUser) {
      navigate("/login");
      return;
    }

    if (status === chatRoomRandomConfigStatus_chatting) {
      navigate(`/chatroom/${chatRoomRandomId}`);
      return;
    }

    if (status === chatRoomRandomConfigStatus_preparing) {
      setStatus(chatRoomRandomConfigStatus_waiting);
      await startChatRoomRandom();
    } else {
      setStatus(chatRoomRandomConfigStatus_preparing);
      // chatRoomRandomのmatchingのabort処理はserverのupdateChatRoomRandomConfigOfAUserで
    }
  }, [
    isUser,
    status,
    setStatus,
    startChatRoomRandom,
    chatRoomRandomId,
    navigate,
  ]);

  // const stateToWatch = useMemo(() => {
  //   return status && scope && chatLength
  //     ? `${status} ${scope} ${chatLength}`
  //     : null;
  // }, [status, scope, chatLength]);
  // const { chatRoomRandomWaitingQueueExists, typeSub, typeSub01 } =
  //   useChatRoomRandomWaitingQueue({ stateToWatch: stateToWatch });
  // const waitingOtherChatRoomRandom = useMemo(() => {
  //   if (!chatRoomRandomWaitingQueueExists) {
  //     return false;
  //   }
  //   if (typeSub === chatLength && typeSub01 === scope) {
  //     return false;
  //   }
  //   return true;
  // }, [chatRoomRandomWaitingQueueExists, scope, chatLength, typeSub, typeSub01]);

  const isDisabledButtonChatRoomRandom = useMemo(() => {
    return (
      // waitingOtherChatRoomRandom || disabled_all || loadingChatRoomRandomConfig
      disabled_all || loadingChatRoomRandomConfig
    );
  }, [disabled_all, loadingChatRoomRandomConfig]);

  const { messageMain, messageSub, messageStatus } =
    useButtonChatRoomRandomMessage({
      status,
      // waitingOtherChatRoomRandom,
      loadingChatRoomRandomConfig,
    });

  return {
    messageMain,
    messageSub,
    messageStatus,
    onClickHandlerButtonChatRoomRandom,
    isDisabledButtonChatRoomRandom,
  };
};
export default useButtonChatRoomRandom;

const useButtonChatRoomRandomMessage = ({
  status,
  // waitingOtherChatRoomRandom,
  loadingChatRoomRandomConfig,
}) => {
  const { me } = useMe();
  const { getNameOfALanguageInMyLanguage } = useMyLanguageRead();

  const nameOfLanguagePlusInMyLanguage = useMemo(() => {
    const isoCodeGoogleLanguagePlus = me?.languagePlus?.isoCodeGoogle;
    return (
      isoCodeGoogleLanguagePlus &&
      getNameOfALanguageInMyLanguage({
        code: isoCodeGoogleLanguagePlus,
      })
    );
  }, [getNameOfALanguageInMyLanguage, me]);

  const params = useParams();

  const scope = useMemo(() => {
    return params?.scope;
  }, [params]);
  const chatLength = useMemo(() => {
    return params?.chatLength;
  }, [params]);

  const strTimeLength = useMemo(() => {
    switch (chatLength) {
      case chatRoomRandomConfigLength_Short:
        return "５分間";
      case chatRoomRandomConfigLength_long:
        return "２４時間";
      default:
    }
  }, [chatLength]);

  const titleStrScope = useMemo(() => {
    switch (scope) {
      case chatRoomRandomConfigScope_public:
        return "日本の誰か";
      case chatRoomRandomConfigScope_friends:
        return "友達の誰か";
      case chatRoomRandomConfigScope_friendsOfMyFriends:
        return "友達の友達の誰か";
      default:
    }
  }, [scope]);

  const strScope = useMemo(() => {
    switch (scope) {
      case chatRoomRandomConfigScope_public:
        return "日本の";
      case chatRoomRandomConfigScope_friends:
        return "友達の";
      case chatRoomRandomConfigScope_friendsOfMyFriends:
        return "友達の友達の";
      default:
    }
  }, [scope]);

  const messageMain = useMemo(() => {
    if (loadingChatRoomRandomConfig) {
      return "";
    }
    switch (status) {
      case chatRoomRandomConfigStatus_chatting:
        return "チャットルームに行く";
      case chatRoomRandomConfigStatus_preparing:
        return typeof titleStrScope === "string"
          ? `${titleStrScope}と\n${nameOfLanguagePlusInMyLanguage}で会話する`
          : "";
      case chatRoomRandomConfigStatus_waiting:
        return "マッチング中...";
      default:

      // return typeof titleStrScope === "string"
      //   ? `${titleStrScope}と会話する`
      //   : "";
    }
  }, [
    status,
    titleStrScope,
    nameOfLanguagePlusInMyLanguage,
    loadingChatRoomRandomConfig,
  ]);

  const messageSub = useMemo(() => {
    if (loadingChatRoomRandomConfig) {
      return "";
    }
    // return "マッチしました！";
    switch (status) {
      case chatRoomRandomConfigStatus_chatting:
        return "マッチしました！";
      case chatRoomRandomConfigStatus_preparing:
        // const isoCodeGoogleLanguagePlus = me?.languagePlus?.isoCodeGoogle;
        // const nameOfLanguagePlusInMyLanguage = getNameOfALanguageInMyLanguage({
        //   code: isoCodeGoogleLanguagePlus,
        // });
        // return `${nameOfLanguagePlusInMyLanguage}で会話する`;
        return typeof strScope === "string" && typeof strTimeLength === "string"
          ? `ランダムに${strScope}誰かと${nameOfLanguagePlusInMyLanguage}で${strTimeLength}会話しよう😊😆${strTimeLength}たったらチャットは消えちゃうよ👻`
          : "";
      case chatRoomRandomConfigStatus_waiting:
        const receiveNotificationsEmailChatRoomRandomMatch =
          me?.receiveNotificationsEmailChatRoomRandomMatch;

        // return waitingOtherChatRoomRandom
        //   ? "他のチャットのマッチング中..."
        //   : `マッチしたら${
        //       receiveNotificationsEmailChatRoomRandomMatch
        //         ? "登録メールアドレス宛にメールを送るね✨"
        //         : "アプリ内通知を送るね✨"
        //     }${
        //       receiveNotificationsEmailChatRoomRandomMatch
        //         ? "このまま画面を閉じても"
        //         : "アプリ内の他の場所に行ってても"
        //     }大丈夫だよ😊`;
        return `マッチしたら${
          receiveNotificationsEmailChatRoomRandomMatch
            ? "登録メールアドレス宛にメールを送るね✨"
            : "アプリ内通知を送るね✨"
        }${
          receiveNotificationsEmailChatRoomRandomMatch
            ? "このまま画面を閉じても"
            : "アプリ内の他の場所に行ってても"
        }大丈夫だよ😊`;
      default:
        return "マッチングをキャンセル";
    }

    // return typeof strScope === "string" && typeof strTimeLength === "string"
    //   ? `ランダムに${strScope}誰かと${strTimeLength}会話しよう😊😆${strTimeLength}たったらチャットは消えちゃうよ👻`
    //   : "";
  }, [
    me,
    nameOfLanguagePlusInMyLanguage,
    status,
    strScope,
    strTimeLength,
    // waitingOtherChatRoomRandom,
    loadingChatRoomRandomConfig,
  ]);

  return {
    messageMain,
    messageSub,
  };
};
