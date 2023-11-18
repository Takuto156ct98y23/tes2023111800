import classes from "./ResetEmailPage.module.css";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patchData } from "../../api/apiGeneral";
import { handleError, isGoodError } from "../../utils/utilsError";

const resetPassword = async (password, passwordConfirmation, token) => {
  const dataResetPassword = {
    password: password,
    passwordConfirm: passwordConfirmation,
  };
  const pathResetPassword = `users/resetPassword/${token}`;
  // return await patchData(null, dataResetPassword, pathResetPassword, null);
  return await patchData({
    data: dataResetPassword,
    path: pathResetPassword,
    signal: null,
  });
};

function ResetPasswordPage() {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  // const handleSubmit = async () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || !passwordConfirmation) {
      return;
    }
    if (password !== passwordConfirmation) {
      setError({
        message: "パスワードが一致しません。入力に間違いが無いかご確認下さい。",
      });
      return;
    }

    try {
      await resetPassword(password, passwordConfirmation, token);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setError(err);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <p>登録に成功しました！</p>
        <p>間もなくトップページに移動します。</p>
      </div>
    );
  }

  return (
    <form className={classes.ResetEmailPage} onSubmit={handleSubmit}>
      <h5>パスワードリセット</h5>
      <div>
        <p>新しいパスワードを入手して下さい:</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <p>確認のため再度同じパスワードを入手して下さい:</p>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
        />
      </div>
      {error && <p>{error.message}</p>}
      <button>パスワードをリセット</button>
    </form>
  );
}

export default ResetPasswordPage;
