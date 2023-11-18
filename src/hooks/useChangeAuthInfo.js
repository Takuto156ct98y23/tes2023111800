import { useCallback, useState } from "react";
import { postData } from "../api/apiGeneral";
import { errorMessageEmailNotFound } from "../data/constants/errorConstants";
import {
  authInfoType_email,
  authInfoType_password,
} from "../data/constants/authConstants";
import { handleError, isGoodError } from "../utils/utilsError";

const sendPasswordResetEmail = async (email) => {
  const dataForgotPassword = { email: email };
  const pathForgotPassword = "users/forgotPassword";
  return await postData(null, dataForgotPassword, pathForgotPassword, null);
};

const sendEmailResetEmail = async (email) => {
  const dataEmailResetEmail = { email: email };
  const pathEmailResetEmail = "users/changeEmailAddress";
  return await postData(null, dataEmailResetEmail, pathEmailResetEmail, null);
};

function useChangeAuthInfo(
  defaultEmailAddress = "",
  /*
変更したいもの
authInfoType_password
authInfoType_email
*/
  typeToChange = authInfoType_password
) {
  const [forgotPasswordEmail, setForgotPasswordEmail] =
    useState(defaultEmailAddress);

  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);

  const [sendingPasswordResetEmail, setSendingPasswordResetEmail] =
    useState(false);

  const [sentResetEmail, setSentResetEmail] = useState(false);

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleForgotPasswordClick = useCallback(() => {
    setIsForgotPasswordModalVisible(true);
  }, []);

  const handleForgotPasswordModalClose = useCallback(() => {
    setIsForgotPasswordModalVisible(false);
  }, []);

  const handleForgotPasswordEmailChange = useCallback((event) => {
    setForgotPasswordEmail(event.target.value);
  }, []);

  const deleteAllMessages = useCallback(() => {
    setMessage(null);
    setErrorMessage(null);
  }, []);

  const handleForgotPasswordSubmit = useCallback(async () => {
    deleteAllMessages();
    setSendingPasswordResetEmail(true);
    try {
      setMessage("通信中...");

      switch (typeToChange) {
        case authInfoType_password:
          // Make an API call to the server to send a password reset email
          await sendPasswordResetEmail(forgotPasswordEmail);
          break;
        case authInfoType_email:
          await sendEmailResetEmail(forgotPasswordEmail);
          break;
        default:
          throw new Error();
      }

      setIsForgotPasswordModalVisible(false);
      setSentResetEmail(true);
      setErrorMessage(null);
      setMessage(
        "お客様のメールアドレスにリセットページへのリンクを送信しましたのでご確認ください。"
      );
      setIsForgotPasswordModalVisible(false);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }

      setMessage(null);
      const msg = err?.response?.data?.message;
      switch (msg) {
        case errorMessageEmailNotFound:
          setErrorMessage(
            "メールアドレスが見つかりませんでした。入力が正しいか再度ご確認ください。"
          );
          break;
        default:
          setErrorMessage(
            "エラーが発生しました。入力が正しいか再度ご確認ください。"
          );
      }
    }

    setSendingPasswordResetEmail(false);
  }, [forgotPasswordEmail, deleteAllMessages, typeToChange]);

  return {
    forgotPasswordEmail,
    setForgotPasswordEmail,
    isForgotPasswordModalVisible,
    setIsForgotPasswordModalVisible,
    sendingPasswordResetEmail,
    setSendingPasswordResetEmail,
    sentResetEmail,
    setSentResetEmail,
    handleForgotPasswordClick,
    handleForgotPasswordModalClose,
    handleForgotPasswordEmailChange,
    handleForgotPasswordSubmit,
    message,
    errorMessage,
  };
}

export default useChangeAuthInfo;
