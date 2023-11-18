import { useNavigate } from "react-router-dom";
import classes from "./UserImage.module.css";
import { Fragment, useCallback, useMemo } from "react";
import useEnvFromServer from "../../hooks/envFromServer/useEnvFromServer";

const UserImage = ({
  user,
  jumpToUserPageOnClick = true,
  // userオブジェクトではなくsrcを直に指定することもできる
  src = null,
}) => {
  const userId = useMemo(() => {
    return user ? user._id : "";
  }, [user]);
  const profilePic = useMemo(() => {
    return user ? user.profilePic : "";
  }, [user]);
  const username = useMemo(() => {
    return user ? user.username : "";
  }, [user]);

  const navigate = useNavigate();
  const onClick = useCallback(() => {
    if (jumpToUserPageOnClick && navigate) {
      navigate(`/user/${userId}`);
    }
  }, [jumpToUserPageOnClick, navigate, userId]);

  const { RICESPEAK_CLOUDFRONT_USERIMAGE_URL } = useEnvFromServer();

  return (
    <div
      className={
        // classes.UserImage
        `${classes.UserImage} ${
          jumpToUserPageOnClick ? classes.jumpToUserPageOnClick : ""
        }`
      }
    >
      {user ? (
        <img
          className={classes.image}
          onClick={onClick}
          // 以下の設定に合わせて、CloudFront側でCloudFrontからのresにCORS関連のHeaderを加える処理が必要。
          // 詳しくは：Google ドライブの会社用フォルダ　→　\CloudFront\distribute_s3_bucket_files.txt"
          crossOrigin={"anonymous"}
          src={`${RICESPEAK_CLOUDFRONT_USERIMAGE_URL}/${profilePic}`}
          alt={`pic ${username}`}
        />
      ) : (
        <Fragment>
          {src ? (
            <img
              className={classes.image}
              onClick={onClick}
              src={src}
              alt={`pic`}
            />
          ) : null}
        </Fragment>
      )}
    </div>
  );
};
export default UserImage;
