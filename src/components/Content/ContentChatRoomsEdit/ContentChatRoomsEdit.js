import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreateChatRoom from "../../../hooks/chatRoom/useCreateChatRoom";
import useMe from "../../../hooks/user/me/useMe";
import ButtonJump from "../../button/ButtonJump/ButtonJump";
import ContentLetsLogin from "../ContentLetsLogin/ContentLetsLogin";
import classes from "./ContentChatRoomsEdit.module.css";
import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";
import useObjectsRead from "../../../hooks/useObjectsRead";
import useObjectsGet from "../../../hooks/useObjectsGet";
import FormElementInput from "../../Form/FormElementInput/FormElementInput";
import useFormElementInput from "../../../hooks/form/useFormElementInput";
import FormArea from "../../Form/FormArea/FormArea";

const ContentChatRoomsEdit = () => {
  const params = useParams();

  const chatRoomId = params.chatRoomId;

  const pathFrom = useMemo(() => {
    let tailOfPath = "";
    if (chatRoomId === "new") {
      tailOfPath = "chatrooms-private";
    } else {
      tailOfPath = `chatroom/${chatRoomId}`;
    }
    return `/${tailOfPath}`;
  }, [chatRoomId]);

  const { isGuest } = useMe();

  return (
    <div className={classes.ContentChatRoomsEdit}>
      <div className={classes.AreaButtonJump}>
        <ButtonJump label={"戻る"} path={pathFrom} />
      </div>

      {isGuest ? (
        <ContentLetsLogin />
      ) : (
        <AreaCreateChatRoom pathGoingBackAfterCreated={pathFrom} />
      )}
    </div>
  );
};

export default ContentChatRoomsEdit;

const AreaCreateChatRoom = ({ pathGoingBackAfterCreated }) => {
  const navigate = useNavigate();

  const {
    creatingNewChatRoom,
    haveErrorCreatingNewChatRoom,
    createNewChatRoom,
  } = useCreateChatRoom();

  const field_name = "チャットルーム名";
  const {
    value: name,
    // setValue: setName,
    onChange: onChange_name,
    // // singleInputHandler: singleInputHandler_name,
    // // loading: loading_name,
    // errorLoading: errorLoading_name,

    // updateAValueInDB: updateAValueInDB_name,

    // disabled: disabled_name,
    // loadingSuccessful: loadingSuccessful_name,
  } = useFormElementInput({
    field: field_name,
  });

  const { objects: friends } = useObjectsRead();
  const pathGet = "friendRequests/friends";
  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathGet,
  });

  const [userIds, setUserIds] = useState([]);

  // 友達をchatRoomに追加、または削除
  const onClickACard = useCallback(
    (user) => {
      if (!user) {
        return;
      }
      const userId = user._id;
      const userIdsNew = new Set([...userIds]);
      userIdsNew.has(userId)
        ? userIdsNew.delete(userId)
        : userIdsNew.add(userId);
      setUserIds(Array.from(userIdsNew));
    },
    [userIds]
  );

  const funcWhenPush = useCallback(async () => {
    await createNewChatRoom({
      userIds: userIds,
      name,
      callback: () => {
        navigate(pathGoingBackAfterCreated);
      },
    });
  }, [createNewChatRoom, name, navigate, pathGoingBackAfterCreated, userIds]);

  const buttonDisabled = useMemo(() => {
    if (creatingNewChatRoom || haveErrorCreatingNewChatRoom) {
      return true;
    }

    const hasInput = name && userIds && 0 < userIds.length;

    if (hasInput) {
      return false;
    } else {
      return true;
    }
  }, [creatingNewChatRoom, haveErrorCreatingNewChatRoom, name, userIds]);

  return (
    <div className={classes.AreaCreateChatRoom}>
      <div className={classes.AreaCreateChatRoom_chatRoomName}>
        <FormArea
          labelButton={"チャットを作成"}
          onSubmit={funcWhenPush}
          disabled={creatingNewChatRoom}
          disabledButton={buttonDisabled}
          displayAButton={true}
          displayAButtonAtTheTop={true}
          message={"チャットを作成しましょう。"}
          displayAMessageAtTheTop={true}
          errorLoading={haveErrorCreatingNewChatRoom}
          errorMessage={"エラーが発生しました。"}
          displayAMessageErrorAtTheTop={true}
        >
          <FormElementInput
            label={field_name}
            type={"chatName"}
            value={name}
            onChange={onChange_name}
            // onClick={updateDB_emailOrUsername}
            // loading={updating_emailOrUsername}
            // message={field_name}
            // errorLoading={errorUpdating_emailOrUsername}
            // errorMessage={"更新失敗：他のユーザーが既に使用しています。"}

            displayAButton={false}
            // placeholder={"example01"}
            maxLength={"30"}
            // autoComplete={"email"}
            required
          />

          <ContentInfiniteScroll
            pathGet={pathGet}
            cardType={"users"}
            objects={friends}
            hasMore={hasMore}
            getObjectsTailward={getObjectsTailward}
            getObjectsHeadward={getObjectsHeadward}
            displayButtonToLoadOlderObject={false}
            displayAreaClick={true}
            onClickACard={onClickACard}
            messageNoObject={
              "ユーザーが見つかりませんでした🤔友達を作るとチャットに追加できるよ！"
            }
          />
        </FormArea>
      </div>
    </div>
  );
};
