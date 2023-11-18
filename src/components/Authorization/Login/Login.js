import { useCallback, useMemo, useState } from "react";
import classes from "./Login.module.css";
import { login } from "../../../api/apiAuth";
import FormArea from "../../Form/FormArea/FormArea";
import FormElementInput from "../../Form/FormElementInput/FormElementInput";
import useFormElementInput from "../../../hooks/form/useFormElementInput";
import useLoadingSuccessful from "../../../hooks/Api/useLoadingSuccessful";

import useAuth from "../../../hooks/Auth/useAuth";
import { handleError } from "../../../utils/utilsError";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    LogingIn,
    errorLogingin,

    emailOrUsername,

    password,

    onChange_emailOrUsername,

    onChange_password,
    handleSubmit,
    messageLogin,
    messageLoginError,
  } = useLogin();

  return (
    <div className={classes.Login}>
      {/* <h5>ログイン</h5> */}

      <FormArea
        displayAButton={true}
        labelButton={"ログイン"}
        // onClick={handleSubmit}
        onSubmit={handleSubmit}
        disabled={LogingIn}
        message={messageLogin}
        errorLoading={errorLogingin}
        errorMessage={messageLoginError}
        displayAButtonAtTheBottom={true}
        displayAMessageAtTheBottom={true}
        displayAMessageErrorAtTheBottom={true}
        isAForm={true}
      >
        <FormElementInput
          label={"アカウント名"}
          labelSub={"またはメールアドレス"}
          // type={"emailOrUsername"}
          type={"username"}
          value={emailOrUsername}
          onChange={onChange_emailOrUsername}
          // onClick={updateDB_emailOrUsername}
          // loading={updating_emailOrUsername}
          // message={"ユーザーネーム（またはメールアドレス）"}
          // errorLoading={errorUpdating_emailOrUsername}
          // errorMessage={"更新失敗：他のユーザーが既に使用しています。"}

          displayAButton={false}
          placeholder={"example01"}
          maxLength={"30"}
          autoComplete={"username"}
          required
        />

        <FormElementInput
          label={"パスワード"}
          type={"password"}
          value={password}
          onChange={onChange_password}
          // onClick={updateDB_email}
          // loading={updating_email}
          // message={"パスワードを入力!"}
          // errorLoading={errorUpdating_email}
          errorMessage={"エラー"}
          displayAButton={false}
          placeholder={"••••••••"}
          // autoComplete={"new-password"}
          autoComplete={"current-password"}
          required={true}
        />
      </FormArea>
    </div>
  );
};

export default Login;

const useLogin = () => {
  const [LogingIn, setLogingin] = useState(false);
  const [errorLogingin, setErrorLogingin] = useState(false);

  const { loadingSuccessful: LogingInSuccessful } = useLoadingSuccessful(
    LogingIn,
    errorLogingin
  );

  // const navigate = useNavigate();

  // const dispatch = useDispatch();

  const messageLogin = useMemo(() => {
    if (LogingInSuccessful) {
      return "ログインに成功しました！間もなく移動します！";
    } else {
      return null;
    }
  }, [LogingInSuccessful]);
  const messageLoginError = useMemo(() => {
    if (errorLogingin) {
      return "エラー";
    } else {
      return null;
    }
  }, [errorLogingin]);

  const {
    value: emailOrUsername,
    // setValue: setUsername,
    onChange: onChange_emailOrUsername,
    // singleInputHandler: singleInputHandler_emailOrUsername,
    // loading: loading_emailOrUsername,
    // errorLoading: errorLoading_emailOrUsername,
  } = useFormElementInput();

  const {
    value: password,
    // setValue: setPassword,
    onChange: onChange_password,
    // singleInputHandler: singleInputHandler_password,
    // loading: loading_password,
    // errorLoading: errorLoading_password,
  } = useFormElementInput();

  const navigate = useNavigate();
  const { logOutAfterDeleteMe } = useAuth();
  const handleSubmit = useCallback(async () => {
    setLogingin(true);
    try {
      await logOutAfterDeleteMe();

      await login({
        emailOrUsername,
        password,
      });

      // dispatch(authActions.authenticate());
      setErrorLogingin(false);
      // navigate("/", { replace: true });
      // navigate("/");
      setTimeout(() => {
        // navigate("/");
        // window.location.replace("/");
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err) {
      setErrorLogingin(true);
      handleError({ err });
    }

    setLogingin(false);
  }, [navigate, password, emailOrUsername, logOutAfterDeleteMe]);

  return {
    LogingIn,
    errorLogingin,

    emailOrUsername,

    password,

    onChange_emailOrUsername,

    onChange_password,
    handleSubmit,
    messageLogin,
    messageLoginError,
  };
};
