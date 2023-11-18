import { Fragment, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CardLink from "../Card/CardLink/CardLink";
import UserImage from "../UserImage/UserImage";
import classes from "./UserInfo.module.css";

// const UserInfo = (props) => {
const UserInfo = ({ userObj, displayBio = false }) => {
  if (!userObj) {
    userObj = {
      _id: "",
      name: "",
      username: "",
      image: "",
    };
  }

  const targetPath = useMemo(() => {
    return `/user/${userObj._id}`;
  }, [userObj._id]);

  const scrollInsideTheSamePage = useCallback((initialPosition) => {
    const scrollOptions = { left: 0 };
    scrollOptions.top = initialPosition;
    window.scrollTo(scrollOptions);
  }, []);

  const messagePagePathFragment = "message";
  const getInitialPosition = (targetPath) => {
    const targetPathLowered = targetPath.toLowerCase();

    if (targetPathLowered.includes(messagePagePathFragment)) {
      return document.body.scrollHeight;
    } else {
      return 0;
    }
  };

  const navigate = useNavigate();

  function handleClick() {
    const pathPagePresent = window.location.pathname;

    const isSamePage = targetPath === pathPagePresent;

    if (isSamePage) {
      const initialPosition = getInitialPosition(targetPath);
      scrollInsideTheSamePage(initialPosition);
    } else {
      // navigate(targetPath, { replace: true });
      navigate(targetPath, { replace: false });
    }
  }

  const bio = useMemo(() => {
    const _bio = userObj?.bio;
    return _bio ? _bio : "";
  }, [userObj]);

  return (
    <Fragment>
      <UserImage user={userObj} />

      <div onClick={handleClick}>
        <div className={classes.UserInfo}>
          <div>
            <p>@{userObj.username}</p>
          </div>
          <div>
            <p>{userObj.name}</p>
          </div>

          {displayBio ? (
            <div>
              <p>{bio}</p>
            </div>
          ) : null}
        </div>
      </div>
      <CardLink targetPath={targetPath} />
    </Fragment>
  );
};
export default UserInfo;
