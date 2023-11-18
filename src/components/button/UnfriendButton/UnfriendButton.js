import classes from "./UnfriendButton.module.css";
import { useCallback } from "react";
import { deleteData } from "../../../api/apiGeneral";
import ButtonModal from "../modal/ButtonModal/ButtonModal";
import useButtonModal from "../../../hooks/Button/useButtonModal";
import ButtonBasic from "../Basic/ButtonBasic";
import { handleError } from "../../../utils/utilsError";

const UnfriendButton = ({ friend, funcAfterUnfriended = null }) => {
  const { modalIsOpen, stylesModal, openModal, closeModal } = useButtonModal();

  const handleUnfriend = useCallback(async () => {
    try {
      await deleteData(
        null,
        { friendId: friend._id },
        "friendRequests/unfriend",
        null
      );

      closeModal();
      if (funcAfterUnfriended) {
        funcAfterUnfriended();
      }
    } catch (err) {
      handleError({ err });
    }
  }, [friend, closeModal, funcAfterUnfriended]);

  return (
    <div>
      <ButtonModal
        openButtonStr={"友達から削除する"}
        closeButtonStr={"キャンセル"}
        modalIsOpen={modalIsOpen}
        stylesModal={stylesModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        {<AreaDeleteButton handleUnfriend={handleUnfriend} />}
      </ButtonModal>
    </div>
  );
};

export default UnfriendButton;

const AreaDeleteButton = ({ handleUnfriend }) => {
  return (
    <div className={classes.AreaDeleteButton}>
      <div className={classes.AreaDeleteButton_text}>
        <p className={classes.confirmationText}>本当に削除しますか？</p>
      </div>
      <div className={classes.AreaDeleteButton_button}>
        <ButtonBasic onClick={handleUnfriend}>友達から削除</ButtonBasic>
      </div>
    </div>
  );
};
