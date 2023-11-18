import { useMemo } from "react";
import useMe from "../../../hooks/user/me/useMe";
import classes from "./HeaderIconMenu0.module.css";
import MenuCollapse from "../../Menu/MenuCollapse/MenuCollapse/MenuCollapse";
import IconKit from "../../Icon/IconKit/IconKit";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ButtonLogInORLogOut from "../../button/ButtonLogInORLogOut/ButtonLogInORLogOut";
import SwitchToggleThemeColor from "../../Content/UI/SwitchToggleThemeColor/SwitchToggleThemeColor";
import { openNewTab } from "../../../utils/utilsWindow";

const getMenu = ({ meId, width, padding }) => {
  return [
    {
      label: "me",
      to: meId ? `user/${meId}` : null,
      width,
      padding,
      colorFont: "sub",
    },
    {
      label: "友達",
      width,
      padding,
      colorFont: "sub",
      children: [
        {
          label: "友達リスト",
          to: "friends",
          padding,
          colorFont: "sub",
        },
        {
          label: "未承認の友達申請",
          to: "friendRequest-incoming",
          padding,
          colorFont: "sub",
        },
        {
          label: "送信済みの友達申請",
          to: "friendRequest-sent",
          padding,
          colorFont: "sub",
        },
      ],
    },
    {
      label: "検索",
      to: "search",
      width,
      padding,
      colorFont: "sub",
    },
    {
      label: "設定",
      to: "settings",
      width,
      padding,
      colorFont: "sub",
    },
    {
      label: "アップグレード",
      to: "upgrade",
      // label: "購入",
      width,
      padding,
      colorFont: "sub",
      // children: [
      //   {
      //     label: "アップグレード",
      //     to: "upgrade",
      //     padding,
      //     colorFont: "sub",
      //   },
      //   {
      //     label: "ライス",
      //     to: "rice",
      //     padding,
      //   },
      //   {
      //     label: "無敵モード",
      //     to: "invincible",
      //     padding,
      //     colorFont: "sub",
      //   },
      // ],
    },
    { element: <SwitchToggleThemeColor />, width, padding },
    { element: <ButtonLogInORLogOut />, width, padding },
    { element: <Laws />, width, padding },
  ];
};

const HeaderIconMenu0 = () => {
  const { me } = useMe();

  const menu = useMemo(() => {
    return me
      ? getMenu({ meId: me._id, width: "medium", padding: "narrow" })
      : null;
  }, [me]);

  return (
    <div className={classes.HeaderIconMenu0}>
      {menu ? (
        <MenuCollapse
          menuSwitch={
            <IconKit
              theNumberOfNotifications={null}
              icon={faGear}
              // link={"settings"}
            />
          }
          menuArray={menu}
        />
      ) : null}
    </div>
  );
};

export default HeaderIconMenu0;

const Laws = () => {
  return (
    <div className={classes.Laws}>
      <span
        className={`${classes.link} ${classes.link_normal}`}
        onClick={() => {
          openNewTab("/terms-of-service");
        }}
      >
        利用規約
      </span>
      <span
        className={`${classes.link} ${classes.link_normal}`}
        onClick={() => {
          openNewTab("/privacy-policy");
        }}
      >
        プライバシーポリシー
      </span>
      <span
        className={`${classes.link} ${classes.link_normal}`}
        onClick={() => {
          openNewTab("/specified-commercial-transactions-act");
        }}
      >
        特定商取引法に基づく表示
      </span>

      <span
        className={`${classes.link} ${classes.link_highlighted}`}
        onClick={() => {
          openNewTab("/supporters-list");
        }}
      >
        SUPPORTERS
      </span>

      <span
        className={`${classes.link} ${classes.link_normal}`}
        onClick={() => {
          openNewTab("https://www.languagerd.com/");
        }}
      >
        運営企業
      </span>
      <span
        className={`${classes.link} ${classes.link_normal}`}
        onClick={() => {
          openNewTab("/patent");
        }}
      >
        特許関連情報
      </span>
    </div>
  );
};
