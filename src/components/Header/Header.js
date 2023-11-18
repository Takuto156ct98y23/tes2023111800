import IconKit from "../Icon/IconKit/IconKit";

import classes from "./Header.module.css";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";

import useTheNumberOfNotificationsUnread from "../../hooks/Notification/useTheNumberOfNotificationsUnread";
import HeaderIconMenu0 from "./HeaderIconMenu0/HeaderIconMenu0";

import useWindowDimensions from "../../hooks/util/windowDimensions/useWindowDimensions";
import AppLogo from "../Logo/AppLogo/AppLogo";
import useHitPointBar from "../../hooks/hitPoint/useHitPointBar";
import useMyHitPointRead from "../../hooks/hitPoint/useMyHitPointRead";
import HitPointBar from "../Bar/point/HitPointBar/HitPointBar";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import useModalBase from "../../hooks/Modal/useModalBase";
import MenuSideBar from "../Menu/MenuSideBar/MenuSideBar";
import ModalBase from "../Modal/ModalBase/ModalBase";

const Header = () => {
  const { displaySidebar } = useWindowDimensions();

  const { currentHitPoints } = useMyHitPointRead();
  const { textToDisplay, hitPointMessage } = useHitPointBar();

  const location = useLocation();

  const displayHitPointBar = useMemo(() => {
    const pathname = location.pathname;
    const isValidPathName =
      typeof pathname === "string" && pathname.startsWith("/");
    if (!isValidPathName) {
      return;
    }

    const strsInPathname = pathname.split("/");
    if (!Array.isArray(strsInPathname) || strsInPathname.length < 2) {
      return;
    }
    const frontStr = strsInPathname[1];
    switch (frontStr) {
      case "chatroom":
      case "restore-hp":
        return true;
      default:
        return false;
    }
  }, [location]);

  return (
    <header
      className={`${classes.Header} ${
        displaySidebar ? classes.Header_wide : classes.Header_narrow
      }`}
    >
      <AppLogo />

      {displayHitPointBar && (
        <HitPointBar
          currentHitPoints={currentHitPoints}
          textToDisplay={textToDisplay}
          hitPointMessage={hitPointMessage}
        />
      )}
      {/* <HitPointBar
        currentHitPoints={currentHitPoints}
        textToDisplay={textToDisplay}
        hitPointMessage={hitPointMessage}
      /> */}

      <HeaderRight />
    </header>
  );
};

export default Header;

const HeaderRight = () => {
  const { theNumberOfNotificationsUnread } =
    useTheNumberOfNotificationsUnread();
  return (
    <div className={classes.Icons}>
      <IconKit
        theNumberOfNotifications={theNumberOfNotificationsUnread}
        icon={faBell}
        link={"notification"}
      />
      <HeaderIconMenu0 />
      <IconToOpenMenu />
    </div>
  );
};

const IconToOpenMenu = () => {
  const { isOpen, openAreaModalBase, closeAreaModalBase } = useModalBase();

  return (
    <div className={classes.FooterItem__content}>
      <ModalBase
        isOpen={isOpen}
        openAreaModalBase={openAreaModalBase}
        closeAreaModalBase={closeAreaModalBase}
        customComponentToOpen={<IconKit icon={faBars} />}
      >
        <div className={classes.MenuBackGround}>
          <MenuSideBar />
        </div>
      </ModalBase>
    </div>
  );
};
