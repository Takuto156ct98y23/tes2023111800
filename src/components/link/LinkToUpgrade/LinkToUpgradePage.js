import classes from "./LinkToUpgradePage.module.css";

import { Fragment, useCallback, useMemo } from "react";
import useModal from "../../../hooks/Modal/useModal";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ButtonBasic from "../../button/Basic/ButtonBasic";

const LinkToUpgradePage = ({
  // linkをactivateするならtrue
  on,
  // 例えばchildren中のボタンをクリック可能にしたいならtrue
  clickable = false,
  children,
}) => {
  const unclickable = useMemo(() => {
    if (clickable) {
      return clickable;
    }
    return on;
  }, [clickable, on]);

  const { modalIsOpen, stylesModal, openModal, closeModal } = useModal();

  const _onClickHandler = useCallback(() => {
    if (on) {
      openModal();
    }
  }, [on, openModal]);

  const navigate = useNavigate();
  const _buttonHandler = useCallback(() => {
    navigate("/upgrade");
  }, [navigate]);

  return (
    <Fragment>
      <div onClick={_onClickHandler}>
        <div className={unclickable ? classes.unclickable : null}>
          {children}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={stylesModal}
        // contentLabel={"AAAA4645165485161"}
        shouldCloseOnOverlayClick={true}
      >
        <span className={classes.Modal}>
          <p className={classes.Modal__text}>
            この機能はプレミアム会員限定です。
          </p>
          <ButtonBasic onClick={_buttonHandler}>
            <p>会員登録ページに移動</p>
          </ButtonBasic>
        </span>
      </Modal>
    </Fragment>
  );
};

export default LinkToUpgradePage;
