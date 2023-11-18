import { useCallback, useMemo, useState } from "react";
import classes from "./Register.module.css";
import { register } from "../../../api/apiAuth";
import FormArea from "../../Form/FormArea/FormArea";
import FormElementInput from "../../Form/FormElementInput/FormElementInput";
import useFormElementInput from "../../../hooks/form/useFormElementInput";
import useLoadingSuccessful from "../../../hooks/Api/useLoadingSuccessful";
import {
  errorType_DB_ValidatorError_username,
  errorMessage_username_ValidatorError_message,
  userRole_user,
  USER_PASSWORD_LENGTH_MIN,
  ERRORMESSAGE_ERROR_MESSAGE_USER_ALREADY_EXISTS,
} from "../../../data/constants/userConstants";
// import useAuth from "../../../hooks/Auth/useAuth";
import { handleError } from "../../../utils/utilsError";
import { useNavigate } from "react-router-dom";
import useMe from "../../../hooks/user/me/useMe";
import { ERROR_MESSAGE_USER_ALREADY_EXISTS } from "../../../data/constants/errorConstants";

// const labelSub_username = `アカウント名は以下を満たす必要があります。
// １．「半角英数字のみ」
// ２．「空白なし」
// ３．「３文字以上５０文字以内」
// `;

const Register = () => {
  const {
    registering,
    errorRegistering,
    // name,
    // username,
    email,
    password,
    isValidPassword,
    // onChange_name,
    // onChange_username,
    onChange_email,
    onChange_password,
    handleSubmit,
    messageRegister,
    messageRegisterError,
  } = useRegister();

  // const {
  //   checked,
  //   highLightsAreaRegisterLaw,
  //   sethighLightsAreaRegisterLaw,
  //   onChangeAreaRegisterLaw,
  // } = useAreaRegisterLaw();

  const buttonIsDisabled = useMemo(() => {
    if (
      typeof email === "string" &&
      isValidPassword
      //  && checked
    ) {
      return false;
    }
    return true;
  }, [
    email,
    isValidPassword,
    // , checked
  ]);

  // const { invisiblePlateExists, onClickInvisiblePlate } = useInvisiblePlate({
  //   sethighLightsAreaRegisterLaw,
  // });

  return (
    <div className={classes.Register}>
      {/* <h5>新規登録</h5> */}

      <FormArea
        displayAButton={true}
        labelButton={"新規登録"}
        // onClick={handleSubmit}
        onSubmit={handleSubmit}
        disabled={registering}
        disabledButton={buttonIsDisabled}
        message={messageRegister}
        errorLoading={errorRegistering}
        errorMessage={messageRegisterError}
        displayAButtonAtTheBottom={true}
        displayAMessageAtTheBottom={true}
        displayAMessageErrorAtTheBottom={true}
        isAForm={true}
      >
        <FormElementInput
          label={"メールアドレス"}
          type={"email"}
          value={email}
          onChange={onChange_email}
          // onClick={updateDB_email}
          // loading={updating_email}
          // message={"メールアドレスを入力!"}
          // errorLoading={errorUpdating_email}
          // errorMessage={"更新失敗：他のユーザーが既に使用しています。"}
          displayAButton={false}
          placeholder={"you@example.com"}
          autoComplete={"email"}
          required={true}
        />
        <FormElementInput
          label={"パスワード"}
          // labelSub={"８文字以上"}
          labelSub={`${USER_PASSWORD_LENGTH_MIN}文字以上`}
          type={"password"}
          value={password}
          onChange={onChange_password}
          // onClick={updateDB_email}
          // loading={updating_email}
          // message={"メールアドレスを入力!"}
          // errorLoading={errorUpdating_email}
          // errorMessage={"更新失敗：他のユーザーが既に使用しています。"}
          displayAButton={false}
          placeholder={"••••••••"}
          autoComplete={"new-password"}
          required={true}
        />

        {/* <AreaRegisterLaw
          checked={checked}
          highLightsAreaRegisterLaw={highLightsAreaRegisterLaw}
          onChangeAreaRegisterLaw={onChangeAreaRegisterLaw}
        /> */}
      </FormArea>

      {/* <InvisiblePlate
        buttonIsDisabled={buttonIsDisabled}
        invisiblePlateExists={invisiblePlateExists}
        onClickInvisiblePlate={onClickInvisiblePlate}
      /> */}
    </div>
  );
};

export default Register;

// const InvisiblePlate = ({
//   buttonIsDisabled,
//   invisiblePlateExists,
//   onClickInvisiblePlate,
// }) => {
//   return (
//     <Fragment>
//       {buttonIsDisabled ? (
//         <Fragment>
//           {/* 一回でもクリックされたら以後二度と使わない */}
//           {invisiblePlateExists ? (
//             <div
//               onClick={onClickInvisiblePlate}
//               className={classes.invisiblePlate}
//             ></div>
//           ) : null}
//         </Fragment>
//       ) : null}
//     </Fragment>
//   );
// };

// // formのボタンがdisabledだと、AreaRegisterLawを強調するエフェクトがそのボタンをクリックしても発動しないため、代わりに使う透明のdiv
// const useInvisiblePlate = ({ sethighLightsAreaRegisterLaw }) => {
//   const [invisiblePlateExists, setInvisiblePlateExists] = useState(true);
//   const onClickInvisiblePlate = useCallback(() => {
//     sethighLightsAreaRegisterLaw(true);
//     setInvisiblePlateExists(false);
//   }, [sethighLightsAreaRegisterLaw]);
//   return {
//     invisiblePlateExists,
//     onClickInvisiblePlate,
//   };
// };

// const useAreaRegisterLaw = () => {
//   const [checked, setChecked] = useState(false);
//   const [highLightsAreaRegisterLaw, sethighLightsAreaRegisterLaw] =
//     useState(false);
//   const onChangeAreaRegisterLaw = useCallback(() => {
//     setChecked((prev) => !prev);
//   }, []);

//   return {
//     checked,
//     highLightsAreaRegisterLaw,
//     sethighLightsAreaRegisterLaw,
//     onChangeAreaRegisterLaw,
//   };
// };

// const AreaRegisterLaw = ({
//   checked,
//   highLightsAreaRegisterLaw,
//   onChangeAreaRegisterLaw,
// }) => {
//   return (
//     <div
//       className={`${classes.AreaRegisterLaw} ${
//         highLightsAreaRegisterLaw ? classes.highLightsAreaRegisterLaw : null
//       }`}
//     >
//       <input
//         className={classes.Checkbox__checkbox}
//         type="checkbox"
//         // name={}
//         checked={checked}
//         onChange={onChangeAreaRegisterLaw}
//       />
//       <CardLabelCheckBoxLaw />
//     </div>
//   );
// };

const useRegister = () => {
  const [registering, setRegistering] = useState(false);
  const [errorRegistering, setErrorRegistering] = useState(false);
  const [errMessagesFromServer, setErrMessagesFromServer] = useState(null);

  const { loadingSuccessful } = useLoadingSuccessful(
    registering,
    errorRegistering
  );

  // const dispatch = useDispatch();

  const messageRegister = useMemo(() => {
    if (loadingSuccessful) {
      // 新規登録欄にログイン情報を入力して新規登録じゃなくて実質ログインしてしまうケースもありえるので「登録に」は省く
      return "成功しました！間もなく移動します！";
      // return "登録に成功しました！間もなく移動します！";
    } else {
      return null;
    }
  }, [loadingSuccessful]);
  const messageRegisterError = useMemo(() => {
    if (!errorRegistering) {
      return;
    }
    if (
      !Array.isArray(errMessagesFromServer) ||
      errMessagesFromServer.length < 1
    ) {
      // return null;
      return "エラーが発生しました。";
    }
    const errorMessagesToDisplay = [];

    const _errMessagesFromServer = new Set(errMessagesFromServer);

    if (_errMessagesFromServer.has(errorType_DB_ValidatorError_username)) {
      errorMessagesToDisplay.push(errorMessage_username_ValidatorError_message);
    }

    if (_errMessagesFromServer.has(ERROR_MESSAGE_USER_ALREADY_EXISTS)) {
      errorMessagesToDisplay.push(
        ERRORMESSAGE_ERROR_MESSAGE_USER_ALREADY_EXISTS
      );
    }

    if (errorMessagesToDisplay.length < 1) {
      errorMessagesToDisplay.push(
        "登録できませんでした。入力内容をご確認ください。"
      );
    }
    return errorMessagesToDisplay.join("\n");
  }, [errMessagesFromServer, errorRegistering]);

  const {
    value: name,
    // setValue: setName,
    onChange: onChange_name,
    // singleInputHandler: singleInputHandler_name,
    // loading: loading_name,
    // errorLoading: errorLoading_name,
  } = useFormElementInput();

  const {
    value: username,
    // setValue: setUsername,
    onChange: onChange_username,
    // singleInputHandler: singleInputHandler_username,
    // loading: loading_username,
    // errorLoading: errorLoading_username,
  } = useFormElementInput();

  const {
    value: email,
    // setValue: setEmail,
    onChange: onChange_email,
    // singleInputHandler: singleInputHandler_email,
    // loading: loading_email,
    // errorLoading: errorLoading_email,
  } = useFormElementInput();

  const {
    value: password,
    // setValue: setPassword,
    onChange: onChange_password,
    // singleInputHandler: singleInputHandler_password,
    // loading: loading_password,
    // errorLoading: errorLoading_password,
  } = useFormElementInput();

  const isValidPassword = useMemo(() => {
    return (
      typeof password === "string" &&
      USER_PASSWORD_LENGTH_MIN <= password.length
    );
  }, [password]);

  // const { languageMinusCodeDefault, languagePlusCodeDefault } =
  //   useLanguageDefaultRead();

  const { me, meId } = useMe();

  const navigate = useNavigate();
  // const { logOutAfterDeleteMe } = useAuth();
  const handleSubmit = useCallback(async () => {
    setRegistering(true);
    try {
      const languageMinusId = me?.languageMinus?._id;
      const languagePlusId = me?.languagePlus?._id;

      // await logOutAfterDeleteMe();

      await register({
        data: {
          _id: meId,
          languageMinusId,
          languagePlusId,
          email,
          password,
          username,
          name,
          role: userRole_user,
        },
      });

      // dispatch(authActions.authenticate());
      setErrorRegistering(false);
      // navigate("/", { replace: true });
      // navigate("/");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err) {
      const errorMessagesFromServer =
        err?.response?.data?.data?.data?.errorMessages;

      setErrorRegistering(true);
      setErrMessagesFromServer(errorMessagesFromServer);
      handleError({ err });
    }

    setRegistering(false);
  }, [email, me, meId, name, navigate, password, username]);

  return {
    registering,
    errorRegistering,
    name,
    username,
    email,
    password,
    isValidPassword,
    onChange_name,
    onChange_username,
    onChange_email,
    onChange_password,
    handleSubmit,
    messageRegister,
    messageRegisterError,
  };
};
