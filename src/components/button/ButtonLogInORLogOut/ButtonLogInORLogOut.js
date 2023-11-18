import classes from "./ButtonLogInORLogOut.module.css";
import ButtonBasic from "../Basic/ButtonBasic";
import { useCallback } from "react";
import useMe from "../../../hooks/user/me/useMe";
import useAuth from "../../../hooks/Auth/useAuth";
import { handleError } from "../../../utils/utilsError";
import { useNavigate } from "react-router-dom";

const ButtonLogInORLogOut = () => {
  // const navigate = useNavigate();
  const { isUser } = useMe();

  const { logOutAfterDeleteMe } = useAuth();

  const logoutHandler = useCallback(async () => {
    try {
      await logOutAfterDeleteMe();

      // navigate("/login", { replace: true });
      // window.location.replace("/login");
    } catch (err) {
      handleError({ err });
    } finally {
      // logOutAfterDeleteMeがミスった場合も考え、ここでreplace
      window.location.replace("/login");
    }
  }, [logOutAfterDeleteMe]);

  const navigate = useNavigate();
  const jumpToLoginPage = useCallback(async () => {
    try {
      navigate("/login");
      // window.location.replace("/login");
    } catch (err) {
      handleError({ err });
    }
  }, [navigate]);

  return (
    <div className={classes.wrapper}>
      {isUser ? (
        <ButtonBasic onClick={logoutHandler}>
          {/* <h2>log out</h2> */}
          <ButtonText text={"ログアウト"} />
        </ButtonBasic>
      ) : (
        <ButtonBasic onClick={jumpToLoginPage}>
          {/* <h2>LOGIN</h2> */}
          <ButtonText text={"ログイン"} />
        </ButtonBasic>
      )}
    </div>
  );
};

export default ButtonLogInORLogOut;

const ButtonText = ({ text }) => {
  return (
    <div className={classes.ButtonText}>
      <p className={classes.text}>{text}</p>
    </div>
  );
};
