import { Fragment, useCallback, useMemo } from "react";
import useWindowDimensions from "../../hooks/util/windowDimensions/useWindowDimensions";
import { v4 as uuidv4 } from "uuid";
import classes from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import ModalBase from "../Modal/ModalBase/ModalBase";
import MenuSideBar from "../Menu/MenuSideBar/MenuSideBar";
import useModalBase from "../../hooks/Modal/useModalBase";

const aMenuObjToSiteMap = {
  funcBeforeJumpingToAnotherPage: () => {},
  label: "MENU",
  to: null,
  isIconToOpenMenu: true,
};

const Footer = ({ menuArray }) => {
  const { displaySidebar } = useWindowDimensions();

  const menuToDisplay = useMemo(() => {
    const isValidArray = Array.isArray(menuArray) && 0 < menuArray.length;

    if (!isValidArray) {
      return null;
    }

    return menuArray.filter((aMenuObj) => {
      const displayOnFooter = aMenuObj?.displayOnFooter;
      return displayOnFooter;
    });
  }, [menuArray]);

  return (
    <Fragment>
      {displaySidebar &&
      Array.isArray(menuToDisplay) &&
      0 < menuToDisplay.length ? null : (
        <div className={classes.Footer}>
          <FooterLeft />
          {menuToDisplay.map((aMenuObj) => {
            return <FooterItem key={uuidv4()} aMenuObj={aMenuObj} />;
          })}
          <FooterItem
            key={uuidv4()}
            aMenuObj={aMenuObjToSiteMap}
            menuArray={menuArray}
          />
          <FooterRight />
        </div>
      )}
    </Fragment>
  );
};
export default Footer;

// 端に変な空白が出来てしまうので、それを埋めるためのもの
// 右側は完全には埋めれてない
const FooterLeft = () => {
  return (
    <div
      className={`${classes.Footer__fringe} ${classes.Footer__fringe_Left}`}
    ></div>
  );
};
const FooterRight = () => {
  return (
    <div
      className={`${classes.Footer__fringe} ${classes.Footer__fringe_Right}`}
    ></div>
  );
};

const FooterItem = ({ aMenuObj, menuArray = null }) => {
  const label = useMemo(() => {
    return aMenuObj?.label;
  }, [aMenuObj]);
  const to = useMemo(() => {
    return aMenuObj?.to;
  }, [aMenuObj]);
  const funcBeforeJumpingToAnotherPage = useMemo(() => {
    return aMenuObj?.funcBeforeJumpingToAnotherPage;
  }, [aMenuObj]);

  const isIconToOpenMenu = useMemo(() => {
    return aMenuObj?.isIconToOpenMenu;
  }, [aMenuObj]);
  const colorFontCSS = useMemo(() => {
    const colorFont = aMenuObj?.colorFont;
    switch (colorFont) {
      case "black":
        return classes.FooterItem__font_black;
      case "yellow":
        return classes.FooterItem__font_yellow;
      default:
        return classes.FooterItem__font_white;
    }
  }, [aMenuObj]);
  // const colorBackGroundCSS = useMemo(() => {
  //   return aMenuObj?.colorBackGround;
  // }, [aMenuObj]);

  const navigate = useNavigate();
  const _onClickHandler = useCallback(() => {
    if (to) {
      if (funcBeforeJumpingToAnotherPage) {
        funcBeforeJumpingToAnotherPage();
      }
      navigate(to);
    }
  }, [funcBeforeJumpingToAnotherPage, navigate, to]);

  return (
    <Fragment>
      {aMenuObj ? (
        <Fragment>
          <div
            className={
              // classes.FooterItem
              `${classes.FooterItem} ${colorFontCSS}`
            }
            onClick={_onClickHandler}
          >
            {isIconToOpenMenu ? (
              <IconToOpenMenu menuArray={menuArray} />
            ) : (
              <p className={classes.FooterItem__content}>{label}</p>
            )}
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const IconToOpenMenu = ({ menuArray }) => {
  const { isOpen, openAreaModalBase, closeAreaModalBase } = useModalBase();

  return (
    <Fragment>
      {Array.isArray(menuArray) && 0 < menuArray.length ? (
        <div className={classes.FooterItem__content}>
          <ModalBase
            isOpen={isOpen}
            openAreaModalBase={openAreaModalBase}
            closeAreaModalBase={closeAreaModalBase}
          >
            <div className={classes.MenuBackGround}>
              <MenuSideBar menuArray={menuArray} />
            </div>
          </ModalBase>
        </div>
      ) : null}
    </Fragment>
  );
};
