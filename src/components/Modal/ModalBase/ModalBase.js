import { createPortal } from "react-dom";
import classes from "./ModalBase.module.css";
import { Fragment, useCallback, useMemo } from "react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import IconKit from "../../Icon/IconKit/IconKit";

const element_ModalBase = document.getElementById("ModalBase-root");

// ButtonToOpenをクリックするとmodalが開く。これは外部パッケージを使用していない自作のmodal。
// useModalBase()とセットで使う。
const ModalBase = ({
  // modalを開くためのコンポーネント。特に指定が無ければデフォルトのアイコン（ハンバーガー）が使用される。
  customComponentToOpen = null,
  // modalを閉じるためのコンポーネント。特に指定が無ければデフォルトのアイコン（×）が使用される。
  customComponentToClose = null,

  // childrenをscrollableにするならtrue
  scrollableChildren = false,

  isOpen,
  openAreaModalBase,
  closeAreaModalBase,
  children,
}) => {
  return (
    <div className={classes.ModalBase}>
      <ButtonToOpen
        customComponentToOpen={customComponentToOpen}
        openAreaModalBase={openAreaModalBase}
      />
      {createPortal(
        <AreaModalBase
          scrollable={scrollableChildren}
          customComponentToClose={customComponentToClose}
          isOpen={isOpen}
          openAreaModalBase={openAreaModalBase}
          closeAreaModalBase={closeAreaModalBase}
        >
          {children}
        </AreaModalBase>,
        element_ModalBase
      )}
    </div>
  );
};

export default ModalBase;

const AreaModalBase = ({
  scrollable,
  customComponentToClose,

  isOpen,
  // openAreaModalBase,
  closeAreaModalBase,
  children,
}) => {
  return (
    <div className={classes.AreaModalBase}>
      <div className={classes.ModalBaseWrapper}>
        <ModalKit
          scrollable={scrollable}
          backgroundColor={null}
          closeByOverlayClick={true}
          isOpen={isOpen}
          closeAreaModalBase={closeAreaModalBase}
        >
          <div className={classes.modalContentWrapper}>
            <ButtonToClose
              customComponentToClose={customComponentToClose}
              closeAreaModalBase={closeAreaModalBase}
            />
            <div className={classes.children}>{children}</div>
          </div>
        </ModalKit>
      </div>
    </div>
  );
};

const ModalKit = ({
  scrollable,

  backgroundColor = null,
  // 画面上のどこをクリックしてもmodalを閉じるようにするならtrue
  closeByAnyClick = false,
  // overlayをクリックするとmodalを閉じるようにするならtrue
  closeByOverlayClick = true,

  isOpen,
  closeAreaModalBase,
  children,
}) => {
  return (
    <Fragment>
      {isOpen ? (
        <ModalKitOpen
          scrollable={scrollable}
          backgroundColor={backgroundColor}
          closeByAnyClick={closeByAnyClick}
          closeByOverlayClick={closeByOverlayClick}
          closeAreaModalBase={closeAreaModalBase}
        >
          {children}
        </ModalKitOpen>
      ) : null}
    </Fragment>
  );
};

const ModalKitOpen = ({
  scrollable,
  backgroundColor,
  closeByAnyClick,
  closeByOverlayClick,
  closeAreaModalBase,
  children,
}) => {
  const classNameModalContent = useMemo(() => {
    let name = `${classes.ModalContent}`;

    if (scrollable) {
      name += ` ${classes.ModalContent_scrollable}`;
    } else {
      name += ` ${classes.ModalContent_unScrollable}`;
    }

    switch (backgroundColor) {
      case "light":
        name += ` ${classes.ModalContent_backgroundColor_light}`;
        break;
      case "dark":
        name += ` ${classes.ModalContent_backgroundColor_dark}`;
        break;
      default:
    }

    return name;
  }, [backgroundColor, scrollable]);

  const onClickHandlerModalKitOpen = useCallback(() => {
    if (closeByAnyClick) {
      closeAreaModalBase();
    }
  }, [closeAreaModalBase, closeByAnyClick]);
  const onClickHandlerOverlay = useCallback(() => {
    if (closeByOverlayClick) {
      closeAreaModalBase();
    }
  }, [closeAreaModalBase, closeByOverlayClick]);
  return (
    <div onClick={onClickHandlerModalKitOpen} className={classes.ModalKit}>
      {/* 背景（overlay） */}
      <div onClick={onClickHandlerOverlay} className={classes.ModalOverlay} />
      {/* 全面のcontent */}
      <div className={classNameModalContent}>
        <div className={classes.ModalContentChildren}>{children}</div>
      </div>
    </div>
  );
};

const ButtonToOpen = ({ customComponentToOpen, openAreaModalBase }) => {
  return (
    <div className={classes.AreaModalBaseButton}>
      {customComponentToOpen ? (
        <div
          className={classes.customComponentToOpen}
          onClick={openAreaModalBase}
        >
          {customComponentToOpen}
        </div>
      ) : (
        <IconKit
          onClick={openAreaModalBase}
          icon={faBars}
          shape={"square"}
          backgroundColor={"dark"}
          color={"light"}
        />
      )}
      {/* <IconKit
        onClick={openAreaModalBase}
        icon={faBars}
        shape={"square"}
        backgroundColor={"dark"}
        color={"light"}
      /> */}
    </div>
  );
};
const ButtonToClose = ({ customComponentToClose, closeAreaModalBase }) => {
  return (
    <div className={classes.AreaModalBaseButton}>
      {customComponentToClose ? (
        <div onClick={closeAreaModalBase}>{customComponentToClose}</div>
      ) : (
        <IconKit
          onClick={closeAreaModalBase}
          icon={faTimes}
          shape={"square"}
          backgroundColor={"dark"}
          color={"light"}
        />
      )}

      {/* <IconKit
        onClick={closeAreaModalBase}
        icon={faTimes}
        shape={"square"}
        backgroundColor={"dark"}
        color={"light"}
      /> */}
    </div>
  );
};
