import classes from "./ResetEmailPage.module.css";

import { Fragment, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patchData } from "../../api/apiGeneral";
import { handleError, isGoodError } from "../../utils/utilsError";

const resetEmail = async (email, emailConfirmation, password, token) => {
  const dataResetEmail = {
    email: email,
    emailConfirm: emailConfirmation,
    password: password,
  };
  const pathResetEmail = token
    ? `users/resetEmail/${token}`
    : `users/resetEmailByPassword`;
  // return await patchData(null, dataResetEmail, pathResetEmail, null);
  return await patchData({
    data: dataResetEmail,
    path: pathResetEmail,
    signal: null,
  });
};

function ResetEmailPage({ needPassword = false }) {
  const navigate = useNavigate();
  const params = useParams();
  const token = params?.token;

  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleEmailConfirmationChange = useCallback((event) => {
    setEmailConfirmation(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!email || !emailConfirmation) {
        return;
      }
      if (email !== emailConfirmation) {
        setError({
          message:
            "メールアドレスが一致しません。入力に間違いが無いかご確認下さい。",
        });
        return;
      }

      try {
        await resetEmail(email, emailConfirmation, password, token);
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
    },
    [email, emailConfirmation, navigate, password, token]
  );

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
      <h5>メールアドレスリセット</h5>
      <div>
        <p>新しいメールアドレスを入手して下さい:</p>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <p>確認のため再度同じメールアドレスを入手して下さい:</p>
        <input
          type="email"
          value={emailConfirmation}
          onChange={handleEmailConfirmationChange}
        />
      </div>

      <div>
        {needPassword ? (
          <Fragment>
            <p>パスワードを入手して下さい:</p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Fragment>
        ) : null}
      </div>

      {error && <p>{error.message}</p>}
      <button>メールアドレスをリセット</button>
    </form>
  );
}

export default ResetEmailPage;
