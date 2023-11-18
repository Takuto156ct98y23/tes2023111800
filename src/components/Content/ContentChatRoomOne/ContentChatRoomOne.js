import classes from "./ContentChatRoomOne.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useChatRoom from "../../../hooks/chatRoom/useChatRoom";
import ButtonJump from "../../button/ButtonJump/ButtonJump";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import useMe from "../../../hooks/user/me/useMe";
import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";
import useSearchBox from "../../../hooks/UI/useSearchBox";
import { updateAUserGroup } from "../../../api/apiUserGroup";
import useButtonByBoolean from "../../../hooks/Button/useButtonByBoolean";
import useButtonDelete from "../../../hooks/useButtonDelete";
import useObjectsGet from "../../../hooks/useObjectsGet";
import useMakeMinimumAsyncCall from "../../../hooks/Api/useMakeMinimumAsyncCall";
import useObjectsRead from "../../../hooks/useObjectsRead";
import { getSocket } from "../../../socket";
import CardEditorKit from "../../Card/CardEditorKit/CardEditorKit";
import useSpecialString from "../../../hooks/hitPoint/useSpecialString";
import {
  dateXisFuture,
  formatDurationJapanese,
  getIntXTimeUnitsLaterFromADate,
} from "../../../utils/utilsTime";
import useLeaveAPage from "../../../hooks/page/useLeaveAPage";
import {
  chatRoomType_AI,
  chatRoomType_forEveryone,
  chatRoomType_normal,
  chatRoomType_single,
  chatRoomType_temporary,
} from "../../../data/constants/chatRoomConstants";
import useButtonModal from "../../../hooks/Button/useButtonModal";
import ButtonModal from "../../button/modal/ButtonModal/ButtonModal";
import { leaveChatRoomRandom } from "../../../api/apiChatRoom";
import { handleError, isGoodError } from "../../../utils/utilsError";
import ButtonBasic from "../../button/Basic/ButtonBasic";

import {
  SOCKET_EVENT_NAME_CHATROOM_JOINED,
  SOCKET_EVENT_NAME_CHATROOM_LEFT,
  SOCKET_EVENT_NAME_CHATROOM_RANDOM_JOINED,
  socketEventName_messageEnd,
  socketEventName_oneOfDataChatRoomRandom,
  socketEventName_renewChatRoomMessagesHeadward,
} from "../../../data/constants/socketConstants";
import { characterLimit_AIChat } from "../../../data/constants/messageConstants";
import { userRole_ai } from "../../../data/constants/userConstants";
import ModalSentenceData from "../../Modal/ModalSentenceData/ModalSentenceData";
import useModal from "../../../hooks/Modal/useModal";
import useRiceRead from "../../../hooks/rice/useRiceRead";
import HitPointMessage from "../../HitPoint/HitPointMessage/HitPointMessage";

// 未完成の機能なので非表示にするためのもの
const falseFalse = false;

const ContentChatRoomOne = () => {
  const socket = getSocket();

  const params = useParams();

  const chatRoomId = params.chatRoomId;

  const { chatRoom, fetchAndRenewChatRoom } = useChatRoom(chatRoomId);

  return (
    <div className={classes.ContentChatRoomOne}>
      {chatRoom ? (
        <Content
          chatRoom={chatRoom}
          fetchAndRenewChatRoom={fetchAndRenewChatRoom}
          socket={socket}
        />
      ) : (
        // <p>このチャットは存在しません。</p>
        <CardChatRoomDoesNotExist />
      )}
    </div>
  );
};

export default ContentChatRoomOne;

const CardChatRoomDoesNotExist = () => {
  return <p className={classes.CardChatRoomDoesNotExist}>loading...</p>;
};

const useChatRoomExistence = (chatRoom) => {
  const [chatRoomExists, setChatRoomExists] = useState(null);

  useEffect(() => {
    if (chatRoom) {
      setChatRoomExists(true);
    }
  }, [chatRoom]);

  const reportChatRoomDoesNotExist = useCallback(() => {
    setChatRoomExists(false);
  }, []);

  return { chatRoomExists, reportChatRoomDoesNotExist };
};

const Content = ({ chatRoom, fetchAndRenewChatRoom, socket }) => {
  // const chatRoomId = chatRoom?._id;
  const chatRoomType = chatRoom?.type;
  // const typeSub = chatRoom?.typeSub;

  const { chatRoomExists, reportChatRoomDoesNotExist } =
    useChatRoomExistence(chatRoom);

  const { displayMessageUpgrade, targetPath, freeMessageLimit } =
    useMessageUpgrade();

  const { voc, messageChatRoomRandom, funcBeforeLeavingPage } =
    useSocketChatRoom(socket, chatRoom);

  useLeaveAPage(funcBeforeLeavingPage);

  // const {
  //   // currentHitPoints,
  //   textToDisplay,
  //   fluctuateHitPointChunkByChunk,
  //   hpMessage,
  // } = useHitPointBar();

  const { messageAboutPartnerCondition } = useMessageAboutPartnerCondition({
    chatRoom,
  });

  return (
    <div className={classes.Content}>
      {chatRoom && fetchAndRenewChatRoom ? (
        <Fragment>
          {chatRoomExists ? (
            <div className={classes.Content_messages}>
              <div className={classes.Content_messages__top}>
                <ChatRoomExplanation chatRoomType={chatRoomType} />

                <div className={classes.AreaHitPointMessage}>
                  <HitPointMessage />
                </div>

                {/* <ChatRoomExplanation chatRoomType={chatRoomType} /> */}

                <ContentHeader chatRoom={chatRoom} />

                {chatRoomType === chatRoomType_temporary ? (
                  <MessageFromSocket
                    messageChatRoomRandom={messageChatRoomRandom}
                  />
                ) : null}

                {falseFalse && chatRoomType === chatRoomType_normal ? (
                  <Fragment>
                    {/* chatRoomRandomでメンバーを表示することに何の問題も無いが、backendの実装が完全にchatRoomType_normal向けになっており、書き直さなくてはいけないので、実務上の理由からchatRoomType_normal限定にしている */}
                    {/* <ButtonJump
                    label={"メンバー"}
                    path={`/usergroup/${chatRoom.userGroup}/${chatRoom.name}のメンバー/${chatRoomId}`}
                  /> */}

                    {/* <CardChat obj={chatRoom} /> */}
                  </Fragment>
                ) : null}

                {chatRoom && fetchAndRenewChatRoom && socket ? (
                  <AreaEdit
                    chatRoom={chatRoom}
                    fetchAndRenewChatRoom={fetchAndRenewChatRoom}
                    // socket={socket}
                    reportChatRoomDoesNotExist={reportChatRoomDoesNotExist}
                    // fluctuateHitPointChunkByChunk={
                    //   fluctuateHitPointChunkByChunk
                    // }
                    disabled={displayMessageUpgrade}
                  />
                ) : null}

                <MessageUpgrade
                  displayMessageUpgrade={displayMessageUpgrade}
                  targetPath={targetPath}
                  freeMessageLimit={freeMessageLimit}
                />

                <MessageAboutPartnerCondition
                  messageAboutPartnerCondition={messageAboutPartnerCondition}
                />
              </div>

              <div className={classes.Content_messages__main}>
                <div className={classes.wrapperInfiniteScroll}>
                  {chatRoom ? <AreaMessages chatRoom={chatRoom} /> : null}
                  {/* <div className={classes.dodai} /> */}
                  <div className={classes.AreaSticky}>
                    <div className={classes.AreaSticky__wrapper}>
                      {/* <h2 className={classes.test} style={{ color: "black" }}>
                        これはテスト
                      </h2> */}

                      {
                        // 現在非表示中
                        null && chatRoomType === chatRoomType_temporary ? (
                          <LetsUseThisVoc voc={voc} />
                        ) : null
                      }
                      {/* {chatRoom && fetchAndRenewChatRoom && socket ? (
                        <AreaEdit
                          chatRoom={chatRoom}
                          fetchAndRenewChatRoom={fetchAndRenewChatRoom}
                          // socket={socket}
                          reportChatRoomDoesNotExist={
                            reportChatRoomDoesNotExist
                          }
                          fluctuateHitPointChunkByChunk={
                            fluctuateHitPointChunkByChunk
                          }
                          disabled={displayMessageUpgrade}
                        />
                      ) : null} */}
                    </div>
                  </div>
                </div>
                {/* <div className={classes.wrapperAreaFixed}>
                  <h2 className={classes.areaFixed} style={{ color: "black" }}>
                    これはテスト
                  </h2>
                </div> */}
              </div>
            </div>
          ) : (
            <CardChatRoomDoesNotExist />
            // <p>チャットが存在しません。</p>
          )}
        </Fragment>
      ) : null}
    </div>
  );
};

// ランダムチャットで、相手が気づいていない等の理由で未コメントの時にメッセージを表示。
// １対１の２人でのチャットにしか対応していないので注意。まだ実務上３人以上のケースにわざわざ対応させる必要がないため。もしも３人以上に適用させたいならuserGroupの情報を取って来る等せよ。
const useMessageAboutPartnerCondition = ({ chatRoom }) => {
  const chatRoomType = chatRoom?.type;
  const { objects } = useObjectsRead();
  const { meId } = useMe();

  const partnerHasAlreadyCommented = useMemo(() => {
    if (chatRoomType !== chatRoomType_temporary) {
      return null;
    }
    if (!Array.isArray(objects)) {
      return null;
    }

    let otherUsersAlreadyCommented = objects.map((msgObj) => {
      const userId = msgObj?.userId?._id;
      return userId === meId ? null : userId;
    });
    otherUsersAlreadyCommented = otherUsersAlreadyCommented?.filter(
      (userId) => {
        if (!userId) {
          return false;
        }
        return true;
      }
    );

    otherUsersAlreadyCommented = new Set(otherUsersAlreadyCommented);
    const partnerHasCommented = 1 <= otherUsersAlreadyCommented?.size;
    return partnerHasCommented;
  }, [chatRoomType, objects, meId]);

  const messageAboutPartnerCondition = useMemo(() => {
    if (typeof partnerHasAlreadyCommented !== "boolean") {
      return null;
    }
    if (partnerHasAlreadyCommented) {
      return null;
    }
    return "お相手のログイン情報がまだ届かないね。チャットのお相手はまだマッチしたことに気づいてないみたい🤔";
  }, [partnerHasAlreadyCommented]);

  return { messageAboutPartnerCondition };
};

const MessageAboutPartnerCondition = ({ messageAboutPartnerCondition }) => {
  return (
    <Fragment>
      {typeof messageAboutPartnerCondition === "string" && (
        <div className={classes.MessageAboutPartnerCondition}>
          <p>{messageAboutPartnerCondition}</p>
        </div>
      )}
    </Fragment>
  );
};

const ContentHeader = ({ chatRoom }) => {
  const chatRoomId = useMemo(() => {
    return chatRoom?._id;
  }, [chatRoom]);
  const chatRoomType = useMemo(() => {
    return chatRoom?.type;
  }, [chatRoom]);
  const typeSub = useMemo(() => {
    return chatRoom?.typeSub;
  }, [chatRoom]);
  const typeSub01 = useMemo(() => {
    return chatRoom?.typeSub01;
  }, [chatRoom]);

  // const displayChatRoomExplanation = useMemo(() => {
  //   switch (chatRoomType) {
  //     case chatRoomType_forEveryone:
  //     case chatRoomType_AI:
  //     case chatRoomType_single:
  //       return true;
  //     default:
  //       return false;
  //   }
  // }, [chatRoomType]);

  const displayButtonToPreviousPage = useMemo(() => {
    return (
      chatRoomType !== chatRoomType_single &&
      chatRoomType !== chatRoomType_forEveryone &&
      chatRoomType !== chatRoomType_AI
    );
  }, [chatRoomType]);
  const displayButtonMember = useMemo(() => {
    // chatRoomRandomでメンバーを表示することに何の問題も無いが、backendの実装が完全にchatRoomType_normal向けになっており、書き直さなくてはいけないので、実務上の理由からchatRoomType_normal限定にしている
    return chatRoomType === chatRoomType_normal;
  }, [chatRoomType]);
  const displayButtonToLeaveChat = useMemo(() => {
    return chatRoomType === chatRoomType_temporary;
  }, [chatRoomType]);

  const displayContentHeader = useMemo(() => {
    return (
      displayButtonToPreviousPage ||
      displayButtonMember ||
      displayButtonToLeaveChat
    );
  }, [
    displayButtonToPreviousPage,
    displayButtonMember,
    displayButtonToLeaveChat,
  ]);

  return (
    <Fragment>
      {displayContentHeader ? (
        <div className={classes.ContentHeader}>
          {displayButtonToPreviousPage ? (
            <div className={classes.ContentHeaderItem}>
              <ButtonToPreviousPage chatRoom={chatRoom} />
            </div>
          ) : null}
          {displayButtonMember ? (
            <div className={classes.ContentHeaderItem}>
              <ButtonJump
                label={"メンバー"}
                path={`/usergroup/${chatRoom.userGroup?._id}/${chatRoom.name}のメンバー/${chatRoomId}`}
              />
            </div>
          ) : null}
          {displayButtonToLeaveChat ? (
            <div className={classes.ContentHeaderItem}>
              <ButtonToLeaveChat
                // chatRoomId={chatRoomId}
                typeSub={typeSub}
                typeSub01={typeSub01}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

const useTitleOfChatRoomExplanation = (chatRoomType) => {
  const titleOfChatRoomExplanation = useMemo(() => {
    switch (chatRoomType) {
      case chatRoomType_forEveryone:
        return "全員で会話";
      case chatRoomType_normal:
        return "友達とメッセージ";
      case chatRoomType_temporary:
        return "ランダムチャット";
      case chatRoomType_single:
        return "あなたのメッセージ一覧";
      default:
        return "チャット";
    }
  }, [chatRoomType]);

  return { titleOfChatRoomExplanation };
};

const ChatRoomExplanation = ({ chatRoomType }) => {
  const { titleOfChatRoomExplanation } =
    useTitleOfChatRoomExplanation(chatRoomType);

  return (
    <Fragment>
      {typeof titleOfChatRoomExplanation === "string" ? (
        <AreaChatRoomExplanation title={titleOfChatRoomExplanation} />
      ) : null}
      {/* {chatRoomType ? (
        <Fragment>
          {chatRoomType === chatRoomType_forEveryone ? (
            <AreaChatRoomExplanation title={"全員で会話"} />
          ) : null}
          {chatRoomType === chatRoomType_single ? (
            <AreaChatRoomExplanation title={"あなたのメッセージ一覧"} />
          ) : null}
        </Fragment>
      ) : null} */}
    </Fragment>
  );
};
const AreaChatRoomExplanation = ({ title }) => {
  return (
    <div className={classes.AreaChatRoomExplanation}>
      <p className={classes.AreaChatRoomExplanation__title}>{title}</p>
    </div>
  );
};

const ButtonToLeaveChat = ({
  //  chatRoomId,
  typeSub,
  typeSub01,
}) => {
  const navigate = useNavigate();
  const { modalIsOpen, stylesModal, openModal, closeModal } = useButtonModal();

  const [tryingToLeaveChat, setTryingToLeaveChat] = useState(false);
  const [errorWhenLeaveChat, setErrorWhenLeaveChat] = useState(false);
  const buttonToLeaveChatDisabled = useMemo(() => {
    return tryingToLeaveChat || errorWhenLeaveChat;
  }, [tryingToLeaveChat, errorWhenLeaveChat]);
  const leaveChat = useCallback(
    async (signal = null) => {
      setTryingToLeaveChat(true);
      try {
        await leaveChatRoomRandom(
          // chatRoomId,
          signal
        );
        setErrorWhenLeaveChat(false);
        closeModal();
        // navigate("/chatrooms-random-short");
        // navigate(`/chatrooms-random-${typeSub}`);

        navigate(
          `/chatrooms-random/${
            typeof typeSub01 === "string" ? typeSub01 : ""
          }/${typeof typeSub === "string" ? typeSub : ""}`
        );
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
        setErrorWhenLeaveChat(true);
      }
      setTryingToLeaveChat(false);
    },
    [
      // chatRoomId,
      closeModal,
      navigate,
      typeSub,
      typeSub01,
    ]
  );

  return (
    <div className={classes.ButtonToLeaveChat}>
      <ButtonModal
        // contentLabel="次のマッチへ"
        // disabled_Modal={buttonToLeaveChatDisabled}
        openButtonStr={"チャットから退出"}
        closeButtonStr={"キャンセル"}
        modalIsOpen={modalIsOpen}
        stylesModal={stylesModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        <span className={classes.ButtonToLeaveChat__ModalChildren}>
          <p className={classes.ButtonToLeaveChat__text}>
            このチャットを終了し、待機画面に戻ります。
          </p>
          <ConfirmLeaveChat
            leaveChat={leaveChat}
            confirmLeaveChatdisabled={buttonToLeaveChatDisabled}
          />
          {errorWhenLeaveChat ? (
            <p className={classes.ButtonToLeaveChat__text}>
              エラーが発生しました。
            </p>
          ) : null}
        </span>
      </ButtonModal>
    </div>
  );
};

const ConfirmLeaveChat = ({ leaveChat, confirmLeaveChatdisabled }) => {
  return (
    <div className={classes.ConfirmLeaveChat}>
      <ButtonBasic onClick={leaveChat} disabled={confirmLeaveChatdisabled}>
        <p>チャット終了</p>
      </ButtonBasic>
    </div>
  );
};

const ButtonToPreviousPage = ({ chatRoom }) => {
  const previousPagePath = useMemo(() => {
    if (!chatRoom) {
      return null;
    }
    let slug = "";
    const chatRoomType = chatRoom.type;

    switch (chatRoomType) {
      case chatRoomType_normal:
        slug = "/chatrooms-private";
        break;
      case chatRoomType_temporary:
        const typeSub = chatRoom.typeSub;
        const typeSub01 = chatRoom.typeSub01;
        // slug = `chatrooms-random-${chatRoom.typeSub}`;
        slug = `/chatrooms-random/${
          typeof typeSub01 === "string" ? typeSub01 : ""
        }/${typeof typeSub === "string" ? typeSub : ""}`;
        break;
      default:
        slug = "";
    }

    return slug;
  }, [chatRoom]);

  return <ButtonJump label={"戻る"} path={previousPagePath} />;
};

const AreaEdit = ({
  chatRoom,
  fetchAndRenewChatRoom,
  // socket,
  reportChatRoomDoesNotExist,
  // fluctuateHitPointChunkByChunk,
  disabled,
}) => {
  const [editingChatRoom, setEditingChatRoom] = useState(false);
  const editButtonHandler = useCallback(() => {
    setEditingChatRoom((prev) => !prev);
  }, []);

  const chatRoomType = useMemo(() => {
    return chatRoom ? chatRoom.type : null;
  }, [chatRoom]);

  const chatRoomTypeSub = useMemo(() => {
    return chatRoom ? chatRoom.typeSub : null;
  }, [chatRoom]);

  const pathPost = useMemo(() => {
    switch (chatRoomType) {
      case chatRoomType_forEveryone:
        return `messages/human/${chatRoom ? chatRoom._id : ""}`;
      case chatRoomType_AI:
        return `messages/ai/${chatRoomTypeSub}`;
      // return "messages/ai";
      default:
        return `messages/human/${chatRoom ? chatRoom._id : ""}`;
    }
  }, [chatRoom, chatRoomType, chatRoomTypeSub]);

  // const { hasRicePointsForAIConversation } = useMyRice();
  const { hasRicePointsForAIConversation } = useRiceRead();

  const canSendMessages = useMemo(() => {
    if (chatRoom.canSend) {
      return true;
    }
    // const chatRoomType = chatRoom.type;
    switch (chatRoomType) {
      case chatRoomType_forEveryone:
        return true;
      case chatRoomType_AI:
        return hasRicePointsForAIConversation ? true : false;
      default:
        return false;
    }
  }, [chatRoom, hasRicePointsForAIConversation, chatRoomType]);

  const numCharacterLimit = useMemo(() => {
    switch (chatRoomType) {
      case chatRoomType_forEveryone:
        return null;
      case chatRoomType_AI:
        return characterLimit_AIChat;
      default:
        return null;
    }
  }, [chatRoomType]);

  // const { headObject: headMessage } = useObjectsRead();
  // const headMessageIsMine = useMemo(() => {
  //   return getHeadMessageIsMine(headMessage);
  // }, [headMessage]);
  // const { failedToMakeReply } = useAIFailedToMakeReply(headMessage);
  const { headMessageIsMine, failedToMakeReply } = useAIReplyInfo();

  const _disabled = useMemo(() => {
    if (disabled) {
      return true;
    }

    // if (chatRoomType === chatRoomType_AI && !hasRicePointsForAIConversation) {
    if (chatRoomType === chatRoomType_AI) {
      // riceが無い場合disabled。
      if (!hasRicePointsForAIConversation) {
        return true;
      }
      // AIが返事を書くのに失敗した場合disabledにはしない。
      if (failedToMakeReply) {
        return false;
      }
      // AIが返事を書いている最中（headMessageIsMine）の場合disabled。
      if (headMessageIsMine) {
        return true;
      }
    }
    return false;
  }, [
    disabled,
    failedToMakeReply,
    hasRicePointsForAIConversation,
    chatRoomType,
    headMessageIsMine,
  ]);

  return (
    <Fragment>
      {falseFalse && canSendMessages ? (
        <AreaEditOnlyForSender
          reportChatRoomDoesNotExist={reportChatRoomDoesNotExist}
          chatRoom={chatRoom}
          editingChatRoom={editingChatRoom}
          fetchAndRenewChatRoom={fetchAndRenewChatRoom}
          editButtonHandler={editButtonHandler}
        />
      ) : null}

      {editingChatRoom ? null : (
        <CardEditorKit
          pathPost={pathPost}
          disabled={_disabled}
          displayHitPointBar={false}
          numCharacterLimit={numCharacterLimit}
          // callBackAfterCreate={fluctuateHitPointChunkByChunk}
        />
      )}

      {chatRoomType === chatRoomType_AI ? (
        <Fragment>
          {hasRicePointsForAIConversation === false ? (
            <MessageHasNoRicePoints />
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const MessageHasNoRicePoints = () => {
  return (
    <div>
      <p>Riceが足りないみたい！</p>
      <Link to={"/rice"}>＞＞Riceを手に入れる</Link>
    </div>
  );
};

const AreaEditOnlyForSender = ({
  reportChatRoomDoesNotExist,
  chatRoom,
  editingChatRoom,
  fetchAndRenewChatRoom,
  editButtonHandler,
}) => {
  const { me } = useMe();

  const isMyChatRoom = useMemo(() => {
    return chatRoom?.user?._id === me._id;
  }, [chatRoom, me]);

  const chatRoomId = useMemo(() => {
    return chatRoom?._id;
  }, [chatRoom]);

  const { ButtonByBoolean: ButtonEdit } = useButtonByBoolean({
    funcOnClickOfArgument: editButtonHandler,
    boolForButton: editingChatRoom,
    labelWhenTrue: "close",
    labelWhenFalse: "edit",
  });

  const deletePath = `chatRoom/${chatRoomId}`;
  const { objDeleted, AreaButtonDelete } = useButtonDelete(
    deletePath,
    chatRoomId
  );
  useEffect(() => {
    if (objDeleted) {
      reportChatRoomDoesNotExist();
    }
  }, [objDeleted, reportChatRoomDoesNotExist]);

  const readyAreaEditOnlyForSender = useMemo(() => {
    if (ButtonEdit && chatRoom && fetchAndRenewChatRoom) {
      return true;
    } else {
      return false;
    }
  }, [ButtonEdit, chatRoom, fetchAndRenewChatRoom]);

  return (
    <Fragment>
      {readyAreaEditOnlyForSender ? (
        <Fragment>
          {isMyChatRoom ? (
            <Fragment>
              {ButtonEdit}
              {editingChatRoom ? (
                <Fragment>
                  {
                    // arasuzyに付随するchatRoomはそれ単体では削除不可
                    chatRoom.arasuzy ? null : AreaButtonDelete
                  }
                  <AreaEditChatRoom
                    chatRoom={chatRoom}
                    fetchAndRenewChatRoom={fetchAndRenewChatRoom}
                  />
                </Fragment>
              ) : null}
            </Fragment>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const AreaMessages = ({ chatRoom }) => {
  const chatRoomId = useMemo(() => {
    return chatRoom ? chatRoom._id : null;
  }, [chatRoom]);
  const chatRoomType = useMemo(() => {
    return chatRoom ? chatRoom.type : null;
  }, [chatRoom]);

  const chatRoomTypeSub = useMemo(() => {
    return chatRoom ? chatRoom.typeSub : null;
  }, [chatRoom]);

  const pathGet = useMemo(() => {
    switch (chatRoomType) {
      case chatRoomType_forEveryone:
        return "messages/for-everyone";
      case chatRoomType_AI:
        return `messages/ai/${chatRoomTypeSub}`;
      case chatRoomType_single:
        return `messages/me`;
      default:
        return `messages/human/${chatRoomId}`;
    }
  }, [chatRoomType, chatRoomId, chatRoomTypeSub]);

  const cardType = "messages";

  const { objects: messages } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathGet,
  });

  return (
    <div className={classes.AreaMessages}>
      {chatRoomId ? (
        <Fragment>
          {chatRoomType === chatRoomType_AI ? <LoadingAIMessage /> : null}

          <ContentInfiniteScroll
            displayButtonToLoadOlderObject={false}
            pathGet={pathGet}
            cardType={cardType}
            objects={messages}
            hasMore={hasMore}
            getObjectsTailward={getObjectsTailward}
            getObjectsHeadward={getObjectsHeadward}
          />
        </Fragment>
      ) : null}
    </div>
  );
};

// かなり単純に、先頭のメッセージがaiのものでなければメッセージを表示。
const LoadingAIMessage = () => {
  // const { headObject: headMessage } = useObjectsRead();
  // const headMessageIsMine = useMemo(() => {
  //   return getHeadMessageIsMine(headMessage);
  // }, [headMessage]);
  // const { failedToMakeReply } = useAIFailedToMakeReply(headMessage);
  const { headMessageIsMine, failedToMakeReply } = useAIReplyInfo();

  return (
    <Fragment>
      {/* {headMessage && headMessage?.userId?.role !== userRole_ai ? ( */}
      {!failedToMakeReply && headMessageIsMine ? (
        <div className={classes.LoadingAIMessage}>
          <p className={classes.LoadingAIMessageText}>
            AIが返事を書いています...
          </p>
        </div>
      ) : null}
    </Fragment>
  );
};

const getHeadMessageIsMine = (headMessage) => {
  return headMessage && headMessage?.userId?.role !== userRole_ai;
};

const useAIReplyInfo = () => {
  const { headObject: headMessage } = useObjectsRead();
  const headMessageIsMine = useMemo(() => {
    return getHeadMessageIsMine(headMessage);
  }, [headMessage]);
  const { failedToMakeReply } = useAIFailedToMakeReply(headMessage);

  return { headMessageIsMine, failedToMakeReply };
};

// ユーザーにAIからの返答を待たせ過ぎていたらtrue
// 単純にminutesUserCantWaitAnyMore以上待たせていたらtrue
const useAIFailedToMakeReply = (headMessage) => {
  const [failedToMakeReply, setFailedToMakeReply] = useState(false);

  useEffect(() => {
    if (!headMessage) {
      return;
    }
    const createdAt = headMessage.createdAt;
    if (!createdAt) {
      return;
    }

    const minutesUserCantWaitAnyMore = 2;
    const standardTimeTooMuchWaiting = getIntXTimeUnitsLaterFromADate({
      intX: minutesUserCantWaitAnyMore,
      timeUnit: "minute",
      date: createdAt,
    });

    if (dateXisFuture(Date.now(), standardTimeTooMuchWaiting)) {
      setFailedToMakeReply(false);
    } else {
      setFailedToMakeReply(true);
    }
  }, [headMessage]);

  return { failedToMakeReply };
};

const useMessageUpgrade = (
  // 無料で送れるメッセージ数に上限を設けるならtrue
  limits = false
) => {
  const { meId } = useMe();

  const targetPath = "/upgrade";

  // 無料で送信できるメッセージ数の上限
  const freeMessageLimit = 1;

  const { objects: messages } = useObjectsRead();

  const displayMessageUpgrade = useMemo(() => {
    if (!messages) {
      return false;
    }
    let numMessageSent = 0;
    messages.forEach((aMessage) => {
      const userIdInTheMessage = aMessage.userId?._id;
      if (meId === userIdInTheMessage) {
        numMessageSent++;
      }
    });
    if (limits) {
      if (freeMessageLimit <= numMessageSent) {
        return true;
      }
    }

    return false;
  }, [messages, meId, limits]);

  return { displayMessageUpgrade, targetPath, freeMessageLimit };
};

const MessageUpgrade = ({
  displayMessageUpgrade,
  targetPath,
  freeMessageLimit,
}) => {
  return (
    <Fragment>
      {displayMessageUpgrade ? (
        <div>
          <Link
            className={classes.Link}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={targetPath}
          >
            <h2>{`${
              freeMessageLimit + 1
            }通目以降はプレミアム会員限定です。click!!`}</h2>
          </Link>
        </div>
      ) : null}
    </Fragment>
  );
};

const strAll_AreaEditChatRoom = "all";
const strOnlyMe_AreaEditChatRoom = "onlyMe";
const strCustom_AreaEditChatRoom = "custom";
const getSenderType = (userGroupSender, me) => {
  const ids = userGroupSender?.ids;
  if (!ids) {
    return null;
  }
  const idsLength = ids.length;
  if (0 === idsLength) {
    return strAll_AreaEditChatRoom;
  }
  if (1 === idsLength) {
    if (ids[0]._id === me._id) {
      return strOnlyMe_AreaEditChatRoom;
    }
  }
  if (1 < idsLength) {
    return strCustom_AreaEditChatRoom;
  }
  return null;
};

const AreaEditChatRoom = ({ chatRoom, fetchAndRenewChatRoom }) => {
  const { userGroupId, userGroupSender } = useChatRoomInfo(chatRoom);

  const { defaultArrayForSearchBox } = useDefaultArrayForSearchBox(
    chatRoom,
    userGroupSender
  );

  const {
    selectedOption: selectedOptionUsers,
    SearchBoxDropdown: SearchBoxDropdownUsers,
  } = useSearchBox({
    //                                                    userGroupSenderではなくuserGroupから選ぶ
    path: `userGroup/get-users-from-one-of-my-usergroups/${userGroupId}`,
    reqQuery: { withoutMe: true },
    defaultValueArraySearchBoxDropdown: defaultArrayForSearchBox,
    hasDefaultValueSearchBoxDropdown: true,
  });

  const [userIds, setUserIds] = useState([]);

  const { ButtonUpdateChatRoom } = useUpdateUserGroup({
    userIds: userIds,
    userGroup: userGroupSender,
    funcWhenUpdate: fetchAndRenewChatRoom,
  });

  const { me } = useMe();
  const { RadioInputSender, selectedSenderType } = useRadioInputSender(
    getSenderType(userGroupSender, me)
  );

  useEffect(() => {
    switch (selectedSenderType) {
      case strAll_AreaEditChatRoom:
        setUserIds(null);
        break;
      case strOnlyMe_AreaEditChatRoom:
        if (me) {
          setUserIds([me._id]);
        }
        break;
      default:
        if (selectedOptionUsers) {
          const userIdsSelected = selectedOptionUsers.map((aUser) => {
            return aUser._id;
          });
          setUserIds(userIdsSelected);
        }
    }
  }, [selectedOptionUsers, selectedSenderType, me]);

  return (
    <div>
      {ButtonUpdateChatRoom}
      {RadioInputSender}
      {selectedSenderType === strCustom_AreaEditChatRoom ? (
        <Fragment>
          <h2>あなた以外の送信可能者を選択</h2>
          {SearchBoxDropdownUsers}
        </Fragment>
      ) : null}
    </div>
  );
};

const useDefaultArrayForSearchBox = (chatRoom, userGroupSender) => {
  const chatRoomUserId = chatRoom?.user?._id;
  const userGroupSenders = userGroupSender?.ids;
  const [defaultArrayForSearchBox, setDefaultArrayForSearchBox] =
    useState(null);

  useEffect(() => {
    if (!chatRoomUserId) {
      return;
    }
    if (!userGroupSenders) {
      return;
    }

    const defaultArray = [];

    // chatRoomの管理人は除く
    for (const aUserObj of userGroupSenders) {
      if (aUserObj._id !== chatRoomUserId) {
        defaultArray.push(aUserObj);
      }
    }

    setDefaultArrayForSearchBox(defaultArray);
  }, [chatRoomUserId, userGroupSenders]);

  return { defaultArrayForSearchBox };
};

const useChatRoomInfo = (chatRoom) => {
  const userGroup = chatRoom?.userGroup;

  const userGroupId = userGroup?._id;

  const userGroupSender = chatRoom?.userGroupSender;
  const userGroupSenderId = userGroupSender?._id;

  return { userGroup, userGroupId, userGroupSender, userGroupSenderId };
};

const useRadioInputSender = (defaultSender = null) => {
  const [selectedSenderType, setSelectedSenderType] = useState(defaultSender);

  const onChangeValue = useCallback((e) => {
    setSelectedSenderType(e.target.value);
  }, []);

  const RadioInputSender = useMemo(() => {
    return (
      <div onChange={onChangeValue}>
        <label>メッセージを投稿できるユーザー</label>
        <div>
          <p>全員</p>
          <input
            type="radio"
            value={strAll_AreaEditChatRoom}
            name="sender"
            checked={selectedSenderType === strAll_AreaEditChatRoom}
            // onChangeを書かないとエラーが出るので書いているだけ
            onChange={() => {}}
          />
        </div>
        <div>
          <p>自分のみ</p>
          <input
            type="radio"
            value={strOnlyMe_AreaEditChatRoom}
            name="sender"
            checked={selectedSenderType === strOnlyMe_AreaEditChatRoom}
            onChange={() => {}}
          />
        </div>
        <div>
          <p>カスタム</p>
          <input
            type="radio"
            value={strCustom_AreaEditChatRoom}
            name="sender"
            checked={selectedSenderType === strCustom_AreaEditChatRoom}
            onChange={() => {}}
          />
        </div>
      </div>
    );
  }, [onChangeValue, selectedSenderType]);

  return { RadioInputSender, selectedSenderType };
};

const useUpdateUserGroup = ({ userIds, userGroup, funcWhenUpdate = null }) => {
  const userGroupId = userGroup?._id;

  const [updatingUserGroup, setUpdatingUserGroup] = useState(false);
  const [haveErrorUpdatingUserGroup, setHaveErrorUpdatingUserGroup] =
    useState(false);

  const ButtonUpdateChatRoom = useMemo(() => {
    return (
      <Fragment>
        {userGroupId ? (
          <AreaButtonUpdateChatRoom
            userGroupId={userGroupId}
            userIds={userIds}
            updatingUserGroup={updatingUserGroup}
            setUpdatingUserGroup={setUpdatingUserGroup}
            haveErrorUpdatingUserGroup={haveErrorUpdatingUserGroup}
            setHaveErrorUpdatingUserGroup={setHaveErrorUpdatingUserGroup}
            funcWhenUpdate={funcWhenUpdate}
          />
        ) : null}
      </Fragment>
    );
  }, [
    haveErrorUpdatingUserGroup,
    updatingUserGroup,
    userGroupId,
    userIds,
    funcWhenUpdate,
  ]);

  return { ButtonUpdateChatRoom };
};

const AreaButtonUpdateChatRoom = ({
  userGroupId,
  userIds,
  updatingUserGroup,
  setUpdatingUserGroup,
  haveErrorUpdatingUserGroup,
  setHaveErrorUpdatingUserGroup,
  funcWhenUpdate,
}) => {
  const funcWhenPush = useCallback(async () => {
    setUpdatingUserGroup(true);

    try {
      await updateAUserGroup({
        reqData: { ids: userIds },
        userGroupId: userGroupId,
      });

      setHaveErrorUpdatingUserGroup(false);
      if (funcWhenUpdate) {
        funcWhenUpdate();
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setHaveErrorUpdatingUserGroup(true);
    }

    setUpdatingUserGroup(false);
  }, [
    setHaveErrorUpdatingUserGroup,
    setUpdatingUserGroup,
    userGroupId,
    userIds,
    funcWhenUpdate,
  ]);

  const buttonDisabled = useMemo(() => {
    if (updatingUserGroup || haveErrorUpdatingUserGroup) {
      return true;
    } else {
      return false;
    }
    // 参考：空arrayを送ることも考えられるので、inputの有無はboolに関係しない
  }, [haveErrorUpdatingUserGroup, updatingUserGroup]);

  const { ButtonByBoolean: ButtonUpdate } = useButtonByBoolean({
    funcOnClickOfArgument: funcWhenPush,
    boolForButton: updatingUserGroup,
    errorboolForButton: haveErrorUpdatingUserGroup,
    labelWhenTrue: "更新中",
    labelWhenFalse: "更新",
    labelWhenChangeToFalse: "更新完了",
    labelWhenError: "エラー",
    disabledWhenTrue: true,
    disabled: buttonDisabled,
  });

  return <div>{ButtonUpdate}</div>;
};

const useSocketChatRoom = (socket, chatRoom) => {
  const { renewSpecialString } = useSpecialString();

  const navigate = useNavigate();

  const [goingBack, setGoingBack] = useState(false);
  const [voc, setVoc] = useState("");
  const [messageChatRoomRandom, setMessageChatRoomRandom] = useState("");

  const { meId } = useMe();

  const chatRoomId = useMemo(() => {
    return chatRoom ? chatRoom._id : null;
  }, [chatRoom]);
  const chatRoomType = useMemo(() => {
    return chatRoom ? chatRoom.type : null;
  }, [chatRoom]);

  const chatRoomTypeSub = useMemo(() => {
    return chatRoom ? chatRoom.typeSub : null;
  }, [chatRoom]);

  const pathGet = useMemo(() => {
    switch (chatRoomType) {
      case chatRoomType_forEveryone:
        return "messages/for-everyone";
      case chatRoomType_AI:
        return `messages/ai/${chatRoomTypeSub}`;
      case chatRoomType_single:
        return `messages/me`;
      default:
        return `messages/human/${chatRoomId}`;
    }
  }, [chatRoomType, chatRoomId, chatRoomTypeSub]);

  const searchObj = useMemo(() => {
    return { chatRoom: chatRoomId };
  }, [chatRoomId]);
  const { getObjectsHeadward } = useObjectsGet({
    path: pathGet,
    reqQuery: searchObj,
  });
  const {
    callThisAsyncFuncMinimumAmount: call_GetObjectsHeadward_MinimumAmount,
  } = useMakeMinimumAsyncCall(getObjectsHeadward);

  useEffect(() => {
    if (!socket) {
      return;
    }
    // if (!chatRoom) {
    //   return;
    // }
    if (!chatRoomType) {
      return;
    }
    if (!meId) {
      return;
    }
    // if (chatRoom.type !== "temporary") {
    //   return;
    // }

    socket.emit(SOCKET_EVENT_NAME_CHATROOM_JOINED, {
      // userId: meId,
      chatRoomId,
      // chatRoomType
    });

    if (chatRoomType === chatRoomType_temporary) {
      socket.emit(SOCKET_EVENT_NAME_CHATROOM_RANDOM_JOINED, {
        userId: meId,
        chatRoomId,
        // chatRoomType,
      });
    }

    // socket.emit("localReadyChatRoomRandom", { id: chatRoom._id });
  }, [chatRoomId, chatRoomType, meId, socket]);

  useEffect(() => {
    if (goingBack) {
      setMessageChatRoomRandom("間もなく移動します。");

      const typeSub = chatRoom?.typeSub;
      const typeSub01 = chatRoom?.typeSub01;
      const slug = `/chatrooms-random/${
        typeof typeSub01 === "string" ? typeSub01 : ""
      }/${typeof typeSub === "string" ? typeSub : ""}`;

      setTimeout(() => {
        // navigate("/chatrooms-random");
        navigate(
          // `/chatrooms-random-${chatRoom?.typeSub}`
          slug
        );
      }, 3000);
    }
  }, [goingBack, navigate, chatRoom]);
  const goBackToContentChatRoomRandom = useCallback(() => {
    setGoingBack(true);
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(socketEventName_oneOfDataChatRoomRandom, (data) => {
      if (data) {
        setMessageChatRoomRandom(
          `残り時間：${formatDurationJapanese(data.millisecondsLeftTillEnd)}`
        );
        const vocSent = data.voc;
        setVoc(vocSent);
        renewSpecialString(vocSent);
      }
    });

    socket.on(socketEventName_messageEnd, (messageEnd) => {
      setMessageChatRoomRandom(messageEnd);
      setTimeout(() => {
        goBackToContentChatRoomRandom();
      }, 2000);
    });

    socket.on(socketEventName_renewChatRoomMessagesHeadward, () => {
      if (call_GetObjectsHeadward_MinimumAmount) {
        call_GetObjectsHeadward_MinimumAmount();
      }
    });

    return () => {
      socket.off(socketEventName_oneOfDataChatRoomRandom);
      socket.off(socketEventName_messageEnd);
      socket.off(socketEventName_renewChatRoomMessagesHeadward);
    };
  }, [
    socket,
    goBackToContentChatRoomRandom,
    renewSpecialString,
    call_GetObjectsHeadward_MinimumAmount,
  ]);

  const funcBeforeLeavingPage = useCallback(() => {
    if (socket && chatRoomId) {
      socket.emit(SOCKET_EVENT_NAME_CHATROOM_LEFT, chatRoomId);
    }
  }, [socket, chatRoomId]);

  return { voc, messageChatRoomRandom, funcBeforeLeavingPage };
};

const MessageFromSocket = ({ messageChatRoomRandom }) => {
  return (
    <div className={classes.MessageFromSocket}>
      <p className={classes.MessageFromSocketText}>{messageChatRoomRandom}</p>
    </div>
  );
};

const LetsUseThisVoc = ({ voc }) => {
  const vocabularyString = voc ? voc.vocabularyString : null;

  const { modalIsOpen, openModal, closeModal } = useModal();

  return (
    <div className={classes.LetsUseThisVoc}>
      <div className={classes.LetsUseThisVoc__wrapper}>
        <div className={classes.LetsUseThisVoc__wrapper__left}>
          <p>この語彙を使って会話してみよう！：</p>
        </div>
        <div
          className={classes.LetsUseThisVoc__wrapper__right}
          onClick={() => {
            if (openModal) {
              openModal();
            }
          }}
        >
          <h6>{vocabularyString}</h6>
        </div>
      </div>
      <span className={classes.LetsUseThisVoc__modalLine}>
        <ModalSentenceData
          sentenceStr={vocabularyString}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </span>
    </div>
  );
};
