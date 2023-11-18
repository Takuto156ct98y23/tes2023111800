import { Fragment, useCallback, useMemo } from "react";
import classes from "./MenuCollapse.module.css";
import { useNavigate } from "react-router-dom";
import CollapseReactCollapsed from "../../../Util/collapse/CollapseReactCollapsed/CollapseReactCollapsed";
import useCollapseReactCollapsed from "../../../../hooks/UI/useCollapseReactCollapsed";

/*
menuArrayは以下のようなフォーマット。

const menu = [
  {
    label: "me",
    to: meId ? `user/${meId}` : null,
  },
  {
    label: "友達",
    children: [
      {
        label: "友達リスト",
        to: "friends",
      },
      {
        label: "未承認の友達申請",
        to: "friendRequest-incoming",
      },
      {
        label: "送信済みの友達申請",
        to: "friendRequest-sent",
      },
    ],
  },
  {
    label: "設定",
    to: "settings",
  },
  {
    label: "購入",
    children: [
      {
        label: "アップロード",
        to: "upgrade",
      },
      {
        label: "ライス",
        to: "rice",
      },
    ],
  },
];

*/

const MenuCollapse = ({ menuSwitch, menuArray }) => {
  const {
    getCollapseProps,
    getToggleProps,
    isExpanded,
    toggleCollapse,
    closeCollapse,
  } = useCollapseReactCollapsed();

  return (
    <div className={classes.MenuCollapse}>
      {menuSwitch && getToggleProps && getCollapseProps ? (
        <CollapseReactCollapsed
          className={classes.menuWrapper}
          elementAsASwitch={menuSwitch}
          positionAbsolute={true}
          displayOverlayToCloseCollapse={true}
          getCollapseProps={getCollapseProps}
          getToggleProps={getToggleProps}
          isExpanded={isExpanded}
          toggleCollapse={toggleCollapse}
          closeCollapse={closeCollapse}
        >
          <Menu menuArray={menuArray} />
        </CollapseReactCollapsed>
      ) : (
        <div className={classes.menuWrapper}>
          <Menu menuArray={menuArray} />
        </div>
      )}
    </div>
  );
};

export default MenuCollapse;

const MenuItem = ({
  label,
  to,
  // 「{ element: <ButtonLogInORLogOut /> }」のようにして、任意のcomponentを入れることもできる
  element,
  // colorFont = "black",
  colorFont,
  colorBackGround = null,
  // left,center,rightの三種類から選べる。デフォルトはcenter。
  justify,
  // narrow,medium,wide,default（100％）から選べる。デフォルトはdefault
  width,
  // narrow,medium,wideから選べる。デフォルトはmedium
  padding,

  funcBeforeJumpingToAnotherPage = null,
  levelInTheHierarchy = 0,
}) => {
  const navigate = useNavigate();

  const classNameMenuItem = useMemo(() => {
    let style = `${classes.MenuItem}`;

    switch (colorBackGround) {
      case "dark":
        style += ` ${classes.MenuItem__colorBackGround_dark}`;
        break;
      case "gray":
        style += ` ${classes.MenuItem__colorBackGround_gray}`;
        break;
      case "black":
        style += ` ${classes.MenuItem__colorBackGround_black}`;
        break;
      default:
        style += ` ${classes.MenuItem__colorBackGround_light}`;
    }

    switch (levelInTheHierarchy) {
      case 0:
        style += ` ${classes.level00}`;
        break;
      case 1:
        style += ` ${classes.level01}`;
        break;
      case 2:
        style += ` ${classes.level02}`;
        break;
      default:
    }

    switch (justify) {
      case "right":
        style += ` ${classes.MenuItem__justify_right}`;
        break;
      case "left":
        style += ` ${classes.MenuItem__justify_left}`;
        break;
      default:
        style += ` ${classes.MenuItem__justify_center}`;
    }

    switch (width) {
      case "narrow":
        style += ` ${classes.MenuItem_width_narrow}`;
        break;
      case "medium":
        style += ` ${classes.MenuItem_width_medium}`;
        break;
      case "wide":
        style += ` ${classes.MenuItem_width_wide}`;
        break;
      default:
        style += ` ${classes.MenuItem_width_default}`;
    }

    switch (padding) {
      case "narrow":
        style += ` ${classes.MenuItem_padding_narrow}`;
        break;
      case "wide":
        style += ` ${classes.MenuItem_padding_wide}`;
        break;
      default:
        style += ` ${classes.MenuItem_padding_medium}`;
    }

    return style;
  }, [colorBackGround, levelInTheHierarchy, justify, padding, width]);

  const _onClickHandler = useCallback(() => {
    if (to) {
      if (funcBeforeJumpingToAnotherPage) {
        funcBeforeJumpingToAnotherPage();
      }
      navigate(to);
    }
  }, [funcBeforeJumpingToAnotherPage, navigate, to]);

  const linkFont = useMemo(() => {
    switch (colorFont) {
      case "black":
        return classes.MenuItem__link__font_black;
      case "yellow":
        return classes.MenuItem__link__font_yellow;
      case "main":
        return classes.MenuItem__link__font_colorMain;
      case "sub":
        return classes.MenuItem__link__font_colorSub;
      default:
        return classes.MenuItem__link__font_white;
    }
  }, [colorFont]);

  return (
    <div className={classNameMenuItem}>
      <div className={classes.menuItemContent}>
        {element ? (
          <Fragment>{element}</Fragment>
        ) : (
          <div
            onClick={_onClickHandler}
            className={`${classes.MenuItem__link} ${
              linkFont
              // colorFont === "black"
              //   ? classes.MenuItem__link__font_black
              //   : classes.MenuItem__link__font_white
            }`}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

const getItemsFromMenuData = (menuData) => {
  if (!menuData) {
    return {};
  }
  const {
    label,
    to,
    colorFont,
    colorBackGround,
    justify,
    width,
    padding,
    element,
    funcBeforeJumpingToAnotherPage,
    children,
  } = menuData;
  return {
    label,
    to,
    colorFont,
    colorBackGround,
    justify,
    width,
    padding,
    element,
    funcBeforeJumpingToAnotherPage,
    children,
  };
};

const AMenuLevel = ({ menuData, level }) => {
  const {
    label,
    to,
    colorFont,
    colorBackGround,
    justify,
    width,
    padding,
    element,
    funcBeforeJumpingToAnotherPage,
    children,
  } = getItemsFromMenuData(menuData);
  const componentKey = useMemo(() => {
    return `menuData_${level}_${label}`;
  }, [level, label]);

  const { getCollapseProps, getToggleProps, isExpanded, toggleCollapse } =
    useCollapseReactCollapsed();

  return (
    <Fragment>
      {menuData ? (
        <CollapseReactCollapsed
          elementAsASwitch={
            <MenuItem
              label={label}
              levelInTheHierarchy={level}
              key={componentKey}
              to={to}
              element={element}
              colorFont={colorFont}
              colorBackGround={colorBackGround}
              justify={justify}
              width={width}
              padding={padding}
              funcBeforeJumpingToAnotherPage={funcBeforeJumpingToAnotherPage}
            />
          }
          getCollapseProps={getCollapseProps}
          getToggleProps={getToggleProps}
          isExpanded={isExpanded}
          toggleCollapse={toggleCollapse}
        >
          {children
            ? children.map((menuDataInChildren, index) => {
                return (
                  <AMenuLevel
                    menuData={menuDataInChildren}
                    level={level + 1}
                    key={componentKey + index}
                  />
                );
              })
            : null}
        </CollapseReactCollapsed>
      ) : null}
    </Fragment>
  );
};

const Menu = ({ menuArray }) => {
  return (
    <div className={classes.Menu}>
      {menuArray
        ? menuArray.map((menuData, index) => {
            return (
              <AMenuLevel
                menuData={menuData}
                level={0}
                key={"MenuCollapseMenu" + index}
              />
            );
          })
        : null}
    </div>
  );
};
