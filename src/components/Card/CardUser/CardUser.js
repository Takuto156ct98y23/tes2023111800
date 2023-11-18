import { useCallback, useMemo, useState } from "react";
import classes from "./CardUser.module.css";
import UserImage from "../../UserImage/UserImage";
import { useNavigate } from "react-router-dom";

const CardUser = ({
  user,
  displayAreaClick,
  onClickACard,
  displayBio = false,
  // displayBio = true,
  jumpToUserPageByAnyClick = false,

  jumpToUserPageByUserInfoClick = true,
}) => {
  const [clicked, setClicked] = useState(false);

  const className = useMemo(() => {
    return `${onClickACard && clicked ? classes.clicked : ""} ${
      classes.CardUser
    }`;
  }, [clicked, onClickACard]);

  const navigate = useNavigate();
  const jumpToUserPage = useCallback(() => {
    navigate(`/user/${user._id}`);
  }, [navigate, user._id]);

  const _onClickHandler = useCallback(() => {
    setClicked((prev) => !prev);
    if (onClickACard) {
      onClickACard(user);
    }
    if (jumpToUserPageByAnyClick) {
      jumpToUserPage();
    }
  }, [onClickACard, user, jumpToUserPageByAnyClick, jumpToUserPage]);

  const _onClickHandler_userInfo = useCallback(() => {
    if (jumpToUserPageByAnyClick) {
      return;
    }
    if (jumpToUserPageByUserInfoClick) {
      jumpToUserPage();
    }
  }, [jumpToUserPageByAnyClick, jumpToUserPageByUserInfoClick, jumpToUserPage]);

  return (
    <div className={className} onClick={_onClickHandler}>
      <div className={classes.CardUser__wrapper}>
        {displayAreaClick ? (
          <div
            className={`${classes.AreaSelect} ${
              clicked
                ? classes.AreaSelect_clicked
                : classes.AreaSelect_unClicked
            }`}
          >
            {onClickACard ? (
              <p
                className={`${classes.AreaSelect__Text} ${
                  clicked
                    ? classes.AreaSelect__Text_clicked
                    : classes.AreaSelect__Text_unClicked
                }`}
              >
                {clicked ? "選択中" : "選択"}
              </p>
            ) : null}
          </div>
        ) : null}
        <div
          // style={{ width: widthAreaUser }}
          className={classes.AreaUser}
        >
          <div className={classes.AreaUserWrapper}>
            <div className={classes.AreaUser__Boximage}>
              <div className={classes.AreaUser__Boximage__image}>
                <UserImage
                  jumpToUserPageOnClick={jumpToUserPageByUserInfoClick}
                  user={user}
                />
              </div>
            </div>
            <UserNames user={user} onClick={_onClickHandler_userInfo} />
          </div>

          {displayBio ? <UserBio user={user} /> : null}
        </div>
      </div>
    </div>
  );
};
export default CardUser;

const UserNames = ({ user, onClick }) => {
  return (
    <div className={classes.AreaUser__info}>
      <div className={classes.AreaUser__info__Areaname}>
        <p onClick={onClick} className={classes.AreaUser__info__Areaname__name}>
          {user.name}
        </p>
      </div>
      <div className={classes.AreaUser__info__Areausername}>
        <p
          onClick={onClick}
          className={classes.AreaUser__info__Areausername__username}
        >
          @{user.username}
        </p>
      </div>
    </div>
  );
};
const UserBio = ({ user }) => {
  return (
    <div className={classes.AreaUser__Areabio}>
      <p className={classes.AreaUser__bio}>{user.bio}</p>
    </div>
  );
};
