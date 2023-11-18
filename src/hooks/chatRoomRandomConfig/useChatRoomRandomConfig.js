import { useCallback, useEffect, useMemo, useState } from "react";
import useArrayState from "../Array/useArrayState";
import { chatRoomRandomConfigStatus_preparing } from "../../data/constants/chatRoomRandomConfigConstants";
import {
  createChatRoomRandomConfig,
  getChatRoomRandomConfig,
  updateChatRoomRandomConfig,
} from "../../api/apiChatRoomRandomConfig";
import { handleError, isGoodError } from "../../utils/utilsError";
import useMakeMinimumAsyncCall from "../Api/useMakeMinimumAsyncCall";
import { timeToMilliseconds } from "../../utils/utilsTime";
import useSubscriptions from "../commerceStripe/useSubscriptions";
import useInitialLoad from "../Api/useInitialLoad";
import { getSocket } from "../../socket";
import { socketEventName_renewChatRoomRandomConfig } from "../../data/constants/socketConstants";

const useChatRoomRandomConfig = () =>
  // chatLength
  {
    const [chatRoomRandomConfig, setChatRoomRandomConfig] = useState(null);
    const [active, setActive] = useState(null);

    // const [scope, setScope] = useState(null);
    const [status, setStatus] = useState(null);

    const [gender, setGender] = useState(null);
    const [ageMax, setAgeMax] = useState(null);
    const [ageMin, setAgeMin] = useState(null);
    const [countryOfResidence, setCountryOfResidence] = useState(null);
    const [placeOfResidence, setPlaceOfResidence] = useState(null);
    const [countryOfOrigin, setCountryOfOrigin] = useState(null);
    const [bio, setBio] = useState(null);

    const chatRoomRandomId = useMemo(() => {
      return chatRoomRandomConfig && chatRoomRandomConfig.chatRoom
        ? chatRoomRandomConfig.chatRoom
        : null;
    }, [chatRoomRandomConfig]);

    const { arr: wannaChat, overWriteArrayState: setWannaChat } = useArrayState(
      {
        compareBy: "keyAndValue",
        keyToCompare: "_id",
      }
    );

    const [haveErrorChatRoomRandomConfig, setHaveErrorChatRoomRandomConfig] =
      useState(false);

    const [gettingChatRoomRandomConfig, setGettingChatRoomRandomConfig] =
      useState(false);
    const [updatingChatRoomRandomConfig, setUpdatingChatRoomRandomConfig] =
      useState(false);
    const loadingChatRoomRandomConfig = useMemo(() => {
      return gettingChatRoomRandomConfig || updatingChatRoomRandomConfig;
    }, [gettingChatRoomRandomConfig, updatingChatRoomRandomConfig]);

    useEffect(() => {
      if (chatRoomRandomConfig) {
        // setActive(chatRoomRandomConfig.active);
        // activeを切り替えられると混乱のもとになる可能性があるのでtrueで統一
        setActive(true);

        // setScope(chatRoomRandomConfig.scope);
        setStatus(chatRoomRandomConfig.status);

        setGender(chatRoomRandomConfig.gender);
        setAgeMax(chatRoomRandomConfig.ageMax);
        setAgeMin(chatRoomRandomConfig.ageMin);
        setCountryOfResidence(chatRoomRandomConfig.countryOfResidence);
        setPlaceOfResidence(chatRoomRandomConfig.placeOfResidence);
        setCountryOfOrigin(chatRoomRandomConfig.countryOfOrigin);
        setBio(chatRoomRandomConfig.bio);

        setWannaChat(chatRoomRandomConfig.wannaChat);
      }
    }, [chatRoomRandomConfig, setWannaChat]);

    useEffect(() => {
      if (!active) {
        // メールで通知を送るので、アプリを離れてもchatRoomRandomConfigStatus_preparingには戻さない。
        // setStatus(chatRoomRandomConfigStatus_preparing);
      }
    }, [active]);

    const getOrCreateChatRoomRandomConfig = useCallback(
      async (signal = null) => {
        setGettingChatRoomRandomConfig(true);
        try {
          const res = await getChatRoomRandomConfig(
            // chatLength,
            signal
          );
          const chatRoomRandomConfigFetched = res?.data?.data?.data;

          if (!chatRoomRandomConfigFetched) {
            const res = await createChatRoomRandomConfig(
              // chatLength,
              signal
            );
            const chatRoomRandomConfigCreated = res?.data?.data?.data;

            setChatRoomRandomConfig(chatRoomRandomConfigCreated);
          } else {
            setChatRoomRandomConfig(chatRoomRandomConfigFetched);
          }
          setHaveErrorChatRoomRandomConfig(false);
        } catch (err) {
          handleError({ err });
          if (isGoodError(err)) {
            return;
          }
          // if (isBadError(err)) {
          //   console.log("err", err);
          //   setHaveErrorChatRoomRandomConfig(true);
          // }
          setHaveErrorChatRoomRandomConfig(true);
        }
        setGettingChatRoomRandomConfig(false);
      },
      [
        // chatLength
      ]
    );

    const updateDocumentChatRoomRandomConfig = useCallback(
      async (signal = null) => {
        setUpdatingChatRoomRandomConfig(true);
        try {
          await updateChatRoomRandomConfig(
            // chatLength,
            null,
            {
              active,
              // scope,
              status,
              wannaChat,
              gender,
              ageMax,
              ageMin,
              countryOfResidence,
              placeOfResidence,
              countryOfOrigin,
              bio,
            },
            signal
          );
          await getOrCreateChatRoomRandomConfig(signal);
          setHaveErrorChatRoomRandomConfig(false);
        } catch (err) {
          handleError({ err });
          if (isGoodError(err)) {
            return;
          }
          setHaveErrorChatRoomRandomConfig(true);
          // if (isBadError(err)) {
          //   console.log("err", err);
          //   setHaveErrorChatRoomRandomConfig(true);
          // }
        }
        setUpdatingChatRoomRandomConfig(false);
      },
      [
        active,
        ageMax,
        ageMin,
        bio,
        // chatLength,
        countryOfOrigin,
        countryOfResidence,
        gender,
        getOrCreateChatRoomRandomConfig,
        placeOfResidence,
        // scope,
        status,
        wannaChat,
      ]
    );

    const {
      callThisAsyncFuncMinimumAmount:
        callUpdateDocumentChatRoomRandomConfigMinimumAmount,
    } = useMakeMinimumAsyncCall(
      updateDocumentChatRoomRandomConfig,
      null,
      timeToMilliseconds(1, "second")
    );

    const resetChatRoomRandomConfig = useCallback(
      async (fieldsToReset, signal = null) => {
        if (
          !fieldsToReset ||
          !Array.isArray(fieldsToReset) ||
          fieldsToReset.length < 1
        ) {
          return;
        }
        setUpdatingChatRoomRandomConfig(true);

        const dataForResetting = {};
        const fieldsForResettingByAVacantArray = new Set([
          "wannaChat",
          "placeOfResidence",
          "placeOfOrigin",
        ]);
        for (const aField of fieldsToReset) {
          if (fieldsForResettingByAVacantArray.has(aField)) {
            dataForResetting[aField] = [];
          } else {
            dataForResetting[aField] = null;
          }
        }

        try {
          await updateChatRoomRandomConfig(
            // chatLength,
            null,
            dataForResetting,
            signal
          );
          await getOrCreateChatRoomRandomConfig(signal);
          setHaveErrorChatRoomRandomConfig(false);
        } catch (err) {
          handleError({ err });
          if (isGoodError(err)) {
            return;
          }
          setHaveErrorChatRoomRandomConfig(true);
        }
        setUpdatingChatRoomRandomConfig(false);
      },
      [
        // chatLength,
        getOrCreateChatRoomRandomConfig,
      ]
    );

    // プレミアム会員じゃなくなった際に、過去の設定が残ってしまうのを防ぐ
    const { notASubscriber } = useSubscriptions();
    const resetChatRoomRandomConfig_IfNotSubscribing = useCallback(() => {
      if (notASubscriber) {
        resetChatRoomRandomConfig([
          "gender",
          "ageMax",
          "ageMin",
          "countryOfResidence",
          "placeOfResidence",
          "countryOfOrigin",
          "placeOfOrigin",
          "bio",
          "regexFromBio",
        ]);
      }
    }, [notASubscriber, resetChatRoomRandomConfig]);

    const {
      callThisAsyncFuncMinimumAmount:
        callResetChatRoomRandomConfig_IfNotSubscribing_MinimumAmount,
    } = useMakeMinimumAsyncCall(
      resetChatRoomRandomConfig_IfNotSubscribing,
      null,
      timeToMilliseconds(1, "second")
    );

    const setUpReady = useMemo(() => {
      return (
        active !== null &&
        // scope !== null &&
        status !== null &&
        wannaChat !== null &&
        notASubscriber !== null
      );
    }, [
      active,
      //  scope,
      status,
      wannaChat,
      notASubscriber,
    ]);

    useEffect(() => {
      if (setUpReady) {
        callUpdateDocumentChatRoomRandomConfigMinimumAmount();

        callResetChatRoomRandomConfig_IfNotSubscribing_MinimumAmount();
      }
    }, [
      callUpdateDocumentChatRoomRandomConfigMinimumAmount,
      setUpReady,
      active,
      // scope,
      status,
      wannaChat,

      callResetChatRoomRandomConfig_IfNotSubscribing_MinimumAmount,
      notASubscriber,
    ]);

    const disabled_inputArea = useMemo(() => {
      return status !== chatRoomRandomConfigStatus_preparing;
    }, [status]);

    const disabled_all = useMemo(() => {
      return loadingChatRoomRandomConfig || haveErrorChatRoomRandomConfig;
    }, [haveErrorChatRoomRandomConfig, loadingChatRoomRandomConfig]);

    useInitialLoad(
      chatRoomRandomConfig,
      getOrCreateChatRoomRandomConfig,
      "useChatRoomRandomConfig"
    );

    useSocket_ChatRoomRandomConfig(getOrCreateChatRoomRandomConfig);

    return {
      chatRoomRandomConfig,
      active,
      setActive,
      // scope,
      // setScope,
      status,
      setStatus,

      gender,
      setGender,
      ageMax,
      setAgeMax,
      ageMin,
      setAgeMin,
      countryOfResidence,
      setCountryOfResidence,
      placeOfResidence,
      setPlaceOfResidence,
      countryOfOrigin,
      setCountryOfOrigin,
      bio,
      setBio,

      chatRoomRandomId,
      wannaChat,
      setWannaChat,
      updateDocumentChatRoomRandomConfig,
      getOrCreateChatRoomRandomConfig,
      callUpdateDocumentChatRoomRandomConfigMinimumAmount,
      loadingChatRoomRandomConfig,
      haveErrorChatRoomRandomConfig,
      setUpReady,
      disabled_inputArea,
      disabled_all,
    };
  };

export default useChatRoomRandomConfig;

const useSocket_ChatRoomRandomConfig = (getOrCreateChatRoomRandomConfig) => {
  const socket = getSocket();

  const {
    callThisAsyncFuncMinimumAmount:
      callGetOrCreateChatRoomRandomConfigMinimumAmount,
    finishedCalling,
  } = useMakeMinimumAsyncCall(
    getOrCreateChatRoomRandomConfig,
    null,
    timeToMilliseconds(1, "second")
  );

  const renewChatRoomRandomConfigAfterSocket = useCallback(async () => {
    if (finishedCalling) {
      return;
    }
    await callGetOrCreateChatRoomRandomConfigMinimumAmount();
  }, [callGetOrCreateChatRoomRandomConfigMinimumAmount, finishedCalling]);

  useEffect(() => {
    socket.on(
      socketEventName_renewChatRoomRandomConfig,
      renewChatRoomRandomConfigAfterSocket
    );

    return () => {
      socket.off(socketEventName_renewChatRoomRandomConfig);
    };
  }, [renewChatRoomRandomConfigAfterSocket, socket]);
};
