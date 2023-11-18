import { Fragment } from "react";
import { authInfoType_password } from "../../../../data/constants/authConstants";
import useChangeAuthInfo from "../../../../hooks/useChangeAuthInfo";
import classes from "./CardChangeAuthInfo.module.css";
import { Link } from "react-router-dom";
import ButtonBasic from "../../../button/Basic/ButtonBasic";

const CardChangeAuthInfo = ({
  defaultEmailAddress = "",
  // メールアドレス入力欄をいきなり表示したいならfalse
  displayButtonToOpenInputArea = true,
  typeToChange = authInfoType_password,
}) => {
  const {
    forgotPasswordEmail,
    isForgotPasswordModalVisible,
    sendingPasswordResetEmail,
    sentResetEmail,
    handleForgotPasswordClick,
    // handleForgotPasswordModalClose,
    handleForgotPasswordEmailChange,
    handleForgotPasswordSubmit,
    message,
    errorMessage,
  } = useChangeAuthInfo(defaultEmailAddress, typeToChange);

  return (
    <div className={classes.CardChangeAuthInfo}>
      {sentResetEmail ? null : (
        <Fragment>
          {isForgotPasswordModalVisible || !displayButtonToOpenInputArea ? (
            <AreaEmailChangeAuthInfo
              typeToChange={typeToChange}
              forgotPasswordEmail={forgotPasswordEmail}
              handleForgotPasswordEmailChange={handleForgotPasswordEmailChange}
              handleForgotPasswordSubmit={handleForgotPasswordSubmit}
              sendingPasswordResetEmail={sendingPasswordResetEmail}
              // handleForgotPasswordModalClose={handleForgotPasswordModalClose}
            />
          ) : (
            <ButtonBasic
              className={classes.CardChangeAuthInfo_button}
              onClick={handleForgotPasswordClick}
            >
              パスワードが分からない
            </ButtonBasic>
          )}
        </Fragment>
      )}

      {message ? <p className={classes.message}>{message}</p> : null}

      {errorMessage ? (
        <p className={classes.errorMessage}>{errorMessage}</p>
      ) : null}
    </div>
  );
};
export default CardChangeAuthInfo;

const AreaEmailChangeAuthInfo = ({
  typeToChange,
  forgotPasswordEmail,
  handleForgotPasswordEmailChange,
  handleForgotPasswordSubmit,
  sendingPasswordResetEmail,
  // handleForgotPasswordModalClose,
}) => {
  return (
    <div className={classes.AreaEmailChangeAuthInfo}>
      {typeToChange === authInfoType_password ? (
        <AreaInputEmail
          forgotPasswordEmail={forgotPasswordEmail}
          handleForgotPasswordEmailChange={handleForgotPasswordEmailChange}
        />
      ) : (
        <AreaTextConfirm />
      )}

      <SendButton
        handleForgotPasswordSubmit={handleForgotPasswordSubmit}
        sendingPasswordResetEmail={sendingPasswordResetEmail}
      />

      <div>
        <Link className={classes.link} to={"/resetEmailByPassword"}>
          メールアドレスが分からない＞＞
        </Link>
      </div>
    </div>
  );
};

const AreaInputEmail = ({
  forgotPasswordEmail,
  handleForgotPasswordEmailChange,
}) => {
  return (
    <div className={classes.AreaInputEmail}>
      {/* Enter your email address to receive a password reset link: */}
      <p
        className={classes.AreaInputEmail__text}
      >{`ご自分のメールアドレスを入力して下さい。`}</p>
      <p className={classes.AreaInputEmail__text_forgetEmailAddress}>
        （※メールアドレスが不明の場合、下記「メールアドレスが分からない」よりメールアドレスをリセットの上、再度手続きをお願いします。）
      </p>
      <input
        className={classes.AreaInputEmail__input}
        type="email"
        value={forgotPasswordEmail}
        onChange={handleForgotPasswordEmailChange}
      />
    </div>
  );
};

const AreaTextConfirm = () => {
  return (
    <div className={classes.AreaTextConfirm}>
      <p className={classes.AreaTextConfirm__text}>
        {
          "登録のメールアドレス宛にリセットページへのリンクを送信します。よろしいですか？"
        }
      </p>
    </div>
  );
};

const SendButton = ({
  handleForgotPasswordSubmit,
  sendingPasswordResetEmail,
}) => {
  return (
    <ButtonBasic onClick={handleForgotPasswordSubmit}>
      {sendingPasswordResetEmail ? "送信中" : "送信"}
    </ButtonBasic>
  );
};
