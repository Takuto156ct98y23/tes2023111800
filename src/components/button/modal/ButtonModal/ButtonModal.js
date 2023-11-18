import classes from "./ButtonModal.module.css";

import Modal from "react-modal";

import { Fragment, useCallback, useMemo } from "react";
import ButtonBasic from "../../Basic/ButtonBasic";
Modal.setAppElement("#modal-root");

const ButtonModal = (props) => {
  const {
    contentLabel = "",
    // disabled_Modal = null,
    openButtonStr = "open",
    closeButtonStr = "close",

    modalIsOpen,
    stylesModal,
    openModal,
    closeModal,

    disabled = null,

    // 画面上のどこを押してもmodalが閉じるようにしたいならtrue
    closeByAnyClick = false,
  } = props;

  const _isOpen = useMemo(() => {
    if (disabled) {
      return false;
    } else {
      return modalIsOpen;
    }
  }, [modalIsOpen, disabled]);

  const handleAnyClick = useCallback(() => {
    if (closeByAnyClick) {
      if (closeByAnyClick && _isOpen) {
        closeModal();
      }
    }
  }, [_isOpen, closeByAnyClick, closeModal]);

  return (
    <div onClick={handleAnyClick} className={classes.ButtonModal}>
      <Modal
        isOpen={_isOpen}
        // isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={stylesModal}
        contentLabel={contentLabel}
        shouldCloseOnOverlayClick={disabled === null ? true : !disabled}
      >
        <Fragment>
          <ButtonToCloseModal
            closeModal={closeModal}
            disabled={disabled}
            closeButtonStr={closeButtonStr}
          />
          {props.children}
        </Fragment>
      </Modal>

      <ButtonToOpenModal
        openButtonStr={openButtonStr}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        disabled={disabled}
      />
      {/* {modalIsOpen ? null : (
        <ButtonToOpenModal
          openButtonStr={openButtonStr}
          openModal={openModal}
        />
      )} */}
    </div>
  );
};

export default ButtonModal;

const ButtonToCloseModal = ({ closeModal, disabled, closeButtonStr }) => {
  return (
    <button
      className={classes.ButtonToCloseModal}
      onClick={closeModal}
      disabled={disabled}
    >
      {closeButtonStr}
    </button>
  );
};
const ButtonToOpenModal = ({
  openButtonStr,
  openModal,
  modalIsOpen,
  disabled,
}) => {
  return (
    // <ButtonBasic onClick={openModal} disabled={modalIsOpen}>
    <ButtonBasic onClick={openModal} disabled={modalIsOpen || disabled}>
      {openButtonStr}
    </ButtonBasic>
  );
};
