import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import useMyCommerceStripe from "../../hooks/commerceStripe/useMyCommerceStripe";
import useMe from "../../hooks/user/me/useMe";
import useMyUserGroups from "../../hooks/userGroup/useMyUserGroups";
import useSubscriptions from "../../hooks/commerceStripe/useSubscriptions";
import classes from "./SetUpInitial.module.css";
import { getSocket, initSocket } from "../../socket";
import useMakeMinimumCall from "../../hooks/function/useMakeMinimumCall";
import useUserGroupOnlyMe from "../../hooks/userGroup/useUserGroupOnlyMe";
import Header from "../Header/Header";
import {
  socketEventName_chatRoomRandomMatched,
  socketEventName_newMessage,
  socketEventName_socketReady,
} from "../../data/constants/socketConstants";
import useThemeColorAppSyncWithMe from "../../hooks/util/color/useThemeColorAppSyncWithMe";
import useEnvFromServer from "../../hooks/envFromServer/useEnvFromServer";
import useEnvFromServerSetUp from "../../hooks/envFromServer/useEnvFromServerSetUp";
import useMyHitPointSetUp from "../../hooks/hitPoint/useMyHitPointSetUp";
import useMyHitPointRead from "../../hooks/hitPoint/useMyHitPointRead";
import useNotificationToast from "../../hooks/NotificationToast/useNotificationToast";
import { timeToMilliseconds } from "../../utils/utilsTime";
import CardNotificationToast from "../Card/CardNotificationToast/CardNotificationToast";
import useRiceSetUp from "../../hooks/rice/useRiceSetUp";
import useMyLanguageSetup from "../../hooks/myLanguage/useMyLanguageSetup";
import useMyLanguageRead from "../../hooks/myLanguage/useMyLanguageRead";
import FooterMini from "../Footer/FooterMini/FooterMini";
import FooterBackGround from "../Footer/FooterBackGround/FooterBackGround";

const SetUpInitial = () => {
  const { isReady } = useSetUpInitial();

  return (
    <Fragment>
      {isReady ? (
        <Fragment>
          <SetUp00Parallel />
          <SetUp00UnParallel />
        </Fragment>
      ) : (
        <p>loading...</p>
      )}
    </Fragment>
  );
};
export default SetUpInitial;

const useSetUpInitial = () => {
  // アプリ全般で使うような項目はここで初期セットアップを行う。
  // ログインし直した時などに、me等を更新。
  // useMeSetUp();
  // meのsetupはAuth.jsで完了済み。
  const { me } = useMe();
  useThemeColorAppSyncWithMe();
  const { myUserGroups } = useMyUserGroups();
  // const { myUserView } = useMyUserView();
  // const { myHitPoint } = useMyHitPoint();

  useMyHitPointSetUp();
  const { myHitPoint } = useMyHitPointRead();

  const isReady = useMemo(() => {
    if (
      me &&
      myUserGroups &&
      //  && myUserView
      myHitPoint
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    me,
    myUserGroups,
    //  myUserView,
    myHitPoint,
  ]);

  return { isReady };
};

// renderingと平行で行う
const SetUp00Parallel = () => {
  const { me, isUser } = useMe();

  return (
    <Fragment>
      {/* {me && meRole !== userRole_guest ? <SetUpStripe /> : null} */}
      {me && isUser ? <SetUpStripe /> : null}
    </Fragment>
  );
};

// useSetUpでのsetupが完了した後やるべきsetupをここで実行
// renderingはこのsetupの後
const SetUp00UnParallel = () => {
  useEnvFromServerSetUp();
  const { envFromServer } = useEnvFromServer();

  const { socketReady } = useSetUpSocket();

  const { userGroupOnlyMe } = useUserGroupOnlyMe();

  useMyLanguageSetup();
  const { myLanguage } = useMyLanguageRead();

  const [ready, setReady] = useState(false);

  const {
    me,
    //  isUser
  } = useMe();

  useEffect(() => {
    if (socketReady && userGroupOnlyMe && envFromServer && myLanguage) {
      setReady(true);
    }
  }, [socketReady, userGroupOnlyMe, envFromServer, myLanguage]);

  return (
    <Fragment>
      {ready ? (
        <Fragment>
          {me ? (
            //  && isUser
            <SetUp00sub01Parallel />
          ) : null}
          <SetUp00sub01UnParallel />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

// socketでのuserIdのroomのセットアップ等が終わった後やる作業（で、待機はしないもの）はここでスタート
const SetUp00sub01Parallel = () => {
  // useMyRice();
  useRiceSetUp();

  useSocketApp();

  return null;
};

// // 横幅が変動するのを防ぐためだけの無意味なオブジェクト。CSSを実装する時間が無い。実務上の理由から使用している。
// const objForSideBarWidth = {
//   label: "　　　　　　　　　　　　",
//   colorFont: "yellow",
//   colorBackGround: "black",
// };

// socketでのuserIdのroomのセットアップ等が終わった後やる作業はここでスタート
const SetUp00sub01UnParallel = () => {
  const isReady_setUpUnParallel_1 = useMemo(() => {
    // 今のところ何の作業もしないのでそのままtrueを返している
    return true;
  }, []);

  // const { displaySidebar } = useWindowDimensions();

  // const funcBeforeJumpingToAnotherPage = useCallback(() => {
  //   // 必要だったら記入
  // }, []);

  // const menuArray = useMemo(() => {
  //   return [
  //     objForSideBarWidth,
  //     {
  //       label: "HP回復",
  //       to: "/restore-hp",
  //       funcBeforeJumpingToAnotherPage,
  //       // colorFont: "yellow",
  //       colorBackGround: "black",
  //       displayOnFooter: true,
  //     },
  //     {
  //       label: "皆で！",
  //       // to: "/",
  //       to: "chatroom/for-everyone",
  //       funcBeforeJumpingToAnotherPage,
  //       // colorFont: "yellow",
  //       colorBackGround: "black",
  //       displayOnFooter: false,
  //     },
  //     {
  //       label: "友達の\n誰かと会話",
  //       to: `/chatrooms-random/${chatRoomRandomConfigScope_friends}/${chatRoomRandomConfigLength_Short}`,
  //       funcBeforeJumpingToAnotherPage,
  //       colorFont: "yellow",
  //       colorBackGround: "black",
  //       displayOnFooter: true,
  //     },
  //     {
  //       label: "友達の友達の\n誰かと会話",
  //       to: `/chatrooms-random/${chatRoomRandomConfigScope_friendsOfMyFriends}/${chatRoomRandomConfigLength_Short}`,
  //       funcBeforeJumpingToAnotherPage,
  //       colorFont: "yellow",
  //       colorBackGround: "black",
  //       displayOnFooter: true,
  //     },
  //     {
  //       label: "誰かと会話",
  //       to: `/chatrooms-random/${chatRoomRandomConfigScope_public}/${chatRoomRandomConfigLength_Short}`,
  //       funcBeforeJumpingToAnotherPage,
  //       // colorFont: "yellow",
  //       colorBackGround: "black",
  //       displayOnFooter: true,
  //     },

  //     {
  //       label: "おもちゃ箱",
  //       // colorFont: "yellow",
  //       colorBackGround: "black",
  //       children: [
  //         // {
  //         //   label: "この世界の誰かと会話",
  //         //   to: `/chatrooms-random/${chatRoomRandomConfigScope_public}/${chatRoomRandomConfigLength_Short}`,
  //         //   funcBeforeJumpingToAnotherPage,
  //         // },
  //         // {
  //         //   label: "２４時間会話",
  //         //   to: "/chatrooms-random-long",
  //         //   funcBeforeJumpingToAnotherPage,
  //         // },
  //         {
  //           label: "チャット",
  //           to: "/chatrooms-private",
  //           colorBackGround: "gray",
  //           funcBeforeJumpingToAnotherPage,
  //         },
  //         {
  //           label: "自作例文集",
  //           to: "/chatroom-me",
  //           colorBackGround: "gray",
  //           funcBeforeJumpingToAnotherPage,
  //         },
  //         // {
  //         //   label: "HPを回復する",
  //         //   to: "/restore-hp",
  //         //   colorBackGround: "gray",
  //         //   colorFont: "yellow",
  //         //   funcBeforeJumpingToAnotherPage,
  //         // },
  //         // {
  //         //   label: "学習(coming soon!!)",
  //         //   to: null,
  //         //   funcBeforeJumpingToAnotherPage,
  //         //   colorBackGround: "gray",
  //         // },
  //       ],
  //     },

  //     // {
  //     //   label: "AIと会話",
  //     //   colorFont: "white",
  //     //   colorBackGround: "dark",
  //     //   children: [
  //     //     {
  //     //       label: "日本語と英語",
  //     //       to: "/chat-ai-enja",
  //     //       funcBeforeJumpingToAnotherPage,
  //     //     },
  //     //     {
  //     //       label: "英語で会話",
  //     //       to: "/chat-ai-en",
  //     //       funcBeforeJumpingToAnotherPage,
  //     //     },
  //     //   ],
  //     // },

  //     objForSideBarWidth,
  //   ];
  // }, [funcBeforeJumpingToAnotherPage]);

  return (
    <Fragment>
      {isReady_setUpUnParallel_1 ? (
        <div className={classes.main}>
          <Header />
          <div
            className={`${classes.LayoutContainer} ${
              classes.LayoutContainer_withoutSidebar

              // displaySidebar
              //   ? classes.LayoutContainer_withSidebar
              //   : classes.LayoutContainer_withoutSidebar
            }`}
          >
            {/* {displaySidebar ? (
              <div className={classes.sidebar}>
                <MenuSideBar menuArray={menuArray} />
              </div>
            ) : null} */}

            <div className={classes.LayoutContainer_right}>
              <div className={classes.OutletBox}>
                <Outlet />
              </div>
            </div>
          </div>
          {/* <FooterBackGround />
          <Footer menuArray={menuArray} /> */}
          <FooterBackGround />

          <FooterMini />
        </div>
      ) : null}
    </Fragment>
  );
};

const useSetUpSocket = () => {
  const { me, meId } = useMe();
  const [socketReady, setSocketReady] = useState(false);

  const callInitScoket = useCallback(() => {
    // initSocket(me);
    initSocket(meId);
  }, [meId]);

  const {
    callThisFuncMinimumAmount: callInitScoketMinimumAmount,
    finishedCalling,
  } = useMakeMinimumCall(callInitScoket);

  useEffect(() => {
    if (finishedCalling) {
      return;
    }
    if (socketReady) {
      return;
    }
    if (!me) {
      return;
    }
    callInitScoketMinimumAmount();
  }, [me, socketReady, callInitScoketMinimumAmount, finishedCalling]);

  const socket = getSocket();
  useEffect(() => {
    socket.on(socketEventName_socketReady, () => {
      setSocketReady(true);
    });
    return () => {
      socket.off(socketEventName_socketReady);
    };
  }, [socket]);

  return { socketReady };
};

// アプリのどこにいても作動させたいsocketはここでやる
const useSocketApp = () => {
  const socket = getSocket();
  const { meId } = useMe();
  const {
    displayNotificationPlain,
    // displayNotificationInfo,
    displayNotificationSuccess,
    // displayNotificationError,
  } = useNotificationToast();

  const socketHandlerWhenMatched = useCallback(
    async (chatRoomId) => {
      if (displayNotificationSuccess) {
        displayNotificationSuccess(
          // "チャットがマッチしました！😍"
          <CardNotificationToast
            text={"チャットがマッチしました！😍"}
            path={`/chatroom/${chatRoomId}`}
          />,
          {
            autoClose: timeToMilliseconds(5, "second"),
          }
        );
      }
    },
    [displayNotificationSuccess]
  );

  const socketHandlerNewMessage = useCallback(
    async (data) => {
      if (!data) {
        return;
      }
      const { senderOfThisNewMessage, chatRoomId } = data;
      if (senderOfThisNewMessage === meId) {
        return;
      }

      const currentPath = window.location.pathname;
      const targetPath = `/chatroom/${chatRoomId}`;
      const imInTheTargetPage = currentPath === targetPath;
      if (imInTheTargetPage) {
        return;
      }
      if (displayNotificationPlain) {
        displayNotificationPlain(
          <CardNotificationToast
            text={"新しいメッセージが届きました！🎉"}
            path={targetPath}
          />,
          {
            autoClose: timeToMilliseconds(3, "second"),
          }
        );
      }
    },
    [displayNotificationPlain, meId]
  );

  useEffect(() => {
    socket.on(socketEventName_chatRoomRandomMatched, socketHandlerWhenMatched);

    socket.on(socketEventName_newMessage, socketHandlerNewMessage);

    return () => {
      socket.off(socketEventName_chatRoomRandomMatched);
      socket.off(socketEventName_newMessage);
    };
  }, [socket, socketHandlerNewMessage, socketHandlerWhenMatched]);
};

const SetUpStripe = () => {
  useMyCommerceStripe();

  // これはやや時間がかかるので待たなくて良い
  useSubscriptions();

  return null;
};
