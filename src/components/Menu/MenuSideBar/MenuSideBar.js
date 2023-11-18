import classes from "./MenuSideBar.module.css";
import MenuCollapse from "../MenuCollapse/MenuCollapse/MenuCollapse";
import { Fragment, useCallback, useMemo } from "react";
import {
  chatRoomRandomConfigLength_Short,
  chatRoomRandomConfigScope_public,
} from "../../../data/constants/chatRoomRandomConfigConstants";

const MenuSideBar = () => {
  const { menuArray } = useMenuArray();

  return (
    <Fragment>
      {Array.isArray(menuArray) && 0 < menuArray.length ? (
        <div className={classes.MenuSideBar}>
          <MenuCollapse menuSwitch={null} menuArray={menuArray} />
        </div>
      ) : null}
    </Fragment>
  );
};

export default MenuSideBar;

// 横幅が変動するのを防ぐためだけの無意味なオブジェクト。CSSを実装する時間が無い。実務上の理由から使用している。
const objForSideBarWidth = {
  label: "　　　　　　　　　　　　",
  colorFont: "yellow",
  colorBackGround: "black",
};

const useMenuArray = () => {
  const funcBeforeJumpingToAnotherPage = useCallback(() => {
    // 必要だったら記入
  }, []);

  const menuArray = useMemo(() => {
    return [
      objForSideBarWidth,

      {
        label: "誰かと会話",
        to: `/chatrooms-random/${chatRoomRandomConfigScope_public}/${chatRoomRandomConfigLength_Short}`,
        funcBeforeJumpingToAnotherPage,
        // colorFont: "yellow",
        colorBackGround: "black",
        displayOnFooter: true,
      },

      {
        label: "HP回復",
        to: "/restore-hp",
        funcBeforeJumpingToAnotherPage,
        // colorFont: "yellow",
        colorBackGround: "black",
        displayOnFooter: true,
      },

      // {
      //   label: "全員で会話",
      //   // to: "/",
      //   to: "chatroom/for-everyone",
      //   funcBeforeJumpingToAnotherPage,
      //   // colorFont: "yellow",
      //   colorBackGround: "black",
      //   displayOnFooter: false,
      // },

      // {
      //   label: "友達の\n誰かと会話",
      //   to: `/chatrooms-random/${chatRoomRandomConfigScope_friends}/${chatRoomRandomConfigLength_Short}`,
      //   funcBeforeJumpingToAnotherPage,
      //   colorFont: "yellow",
      //   colorBackGround: "black",
      //   displayOnFooter: true,
      // },
      // {
      //   label: "友達の友達の\n誰かと会話",
      //   to: `/chatrooms-random/${chatRoomRandomConfigScope_friendsOfMyFriends}/${chatRoomRandomConfigLength_Short}`,
      //   funcBeforeJumpingToAnotherPage,
      //   colorFont: "yellow",
      //   colorBackGround: "black",
      //   displayOnFooter: true,
      // },
      // {
      //   label: "誰かと会話",
      //   to: `/chatrooms-random/${chatRoomRandomConfigScope_public}/${chatRoomRandomConfigLength_Short}`,
      //   funcBeforeJumpingToAnotherPage,
      //   // colorFont: "yellow",
      //   colorBackGround: "black",
      //   displayOnFooter: true,
      // },

      {
        label: "おもちゃ箱",
        // colorFont: "yellow",
        colorBackGround: "black",
        children: [
          // {
          //   label: "この世界の誰かと会話",
          //   to: `/chatrooms-random/${chatRoomRandomConfigScope_public}/${chatRoomRandomConfigLength_Short}`,
          //   funcBeforeJumpingToAnotherPage,
          // },
          // {
          //   label: "２４時間会話",
          //   to: "/chatrooms-random-long",
          //   funcBeforeJumpingToAnotherPage,
          // },
          {
            label: "チャット",
            to: "/chatrooms-private",
            colorBackGround: "gray",
            funcBeforeJumpingToAnotherPage,
          },
          {
            label: "独り言ルーム",
            to: "/chatroom-me",
            colorBackGround: "gray",
            funcBeforeJumpingToAnotherPage,
          },
          // {
          //   label: "HPを回復する",
          //   to: "/restore-hp",
          //   colorBackGround: "gray",
          //   colorFont: "yellow",
          //   funcBeforeJumpingToAnotherPage,
          // },
          // {
          //   label: "学習(coming soon!!)",
          //   to: null,
          //   funcBeforeJumpingToAnotherPage,
          //   colorBackGround: "gray",
          // },
        ],
      },

      // {
      //   label: "AIと会話",
      //   colorFont: "white",
      //   colorBackGround: "dark",
      //   children: [
      //     {
      //       label: "日本語と英語",
      //       to: "/chat-ai-enja",
      //       funcBeforeJumpingToAnotherPage,
      //     },
      //     {
      //       label: "英語で会話",
      //       to: "/chat-ai-en",
      //       funcBeforeJumpingToAnotherPage,
      //     },
      //   ],
      // },

      objForSideBarWidth,
    ];
  }, [funcBeforeJumpingToAnotherPage]);

  return { menuArray };
};
