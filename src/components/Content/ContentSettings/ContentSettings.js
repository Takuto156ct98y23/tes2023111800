import classes from "./ContentSettings.module.css";
import { useCallback, useMemo, useState } from "react";

import useFormElementInput from "../../../hooks/form/useFormElementInput";
import FormArea from "../../Form/FormArea/FormArea";
import FormElementInput from "../../Form/FormElementInput/FormElementInput";
import FormElementButton from "../../Form/FormElementButton/FormElementButton";
import useMe from "../../../hooks/user/me/useMe";
import { updateMe } from "../../../api/apiUser";

import CardChangeAuthInfo from "../../Card/Auth/CardChangeAuthInfo/CardChangeAuthInfo";
import {
  authInfoType_email,
  authInfoType_password,
} from "../../../data/constants/authConstants";
import FormElementDropDown from "../../Form/FormElementDropDown/FormElementDropDown";
import FormElementTemplate from "../../Form/Template/FormElementTemplate/FormElementTemplate";
import FormButtonTemplate from "../../Form/Template/FormButtonTemplate/FormButtonTemplate";
import DropDown from "../../DropDown/DropDown/DropDown";
import FormMessageTemplate from "../../Form/Template/FormMessage/FormMessageTemplate/FormMessageTemplate";
import FormMessageErrorTemplate from "../../Form/Template/FormMessage/FormMessageErrorTemplate/FormMessageErrorTemplate";
import useFormElementDropDown from "../../../hooks/form/DropDown/useFormElementDropDown";

import {
  optionsDropDown_countries,
  optionsDropDown_gender,
} from "../../../data/constants/form/dropDownConstants";

import useFormElementDropDown_country from "../../../hooks/form/DropDown/geo/useFormElementDropDown_country";
import useFormElementDropDownGeo from "../../../hooks/form/DropDown/geo/useFormElementDropDownGeo";
import useFormElementDropDownDate from "../../../hooks/form/DropDown/time/useFormElementDropDownDate";
import ContentLetsLogin from "../ContentLetsLogin/ContentLetsLogin";
import useModalBase from "../../../hooks/Modal/useModalBase";
import FormElementProfilePic from "../../Form/specific/FormElementProfilePic/FormElementProfilePic";
import ToggleSwitch from "../../button/ToggleSwitch/ToggleSwitch";
import useToggleSwitch from "../../../hooks/Button/useToggleSwitch";
import { handleError, isGoodError } from "../../../utils/utilsError";

import FormElementDifficulty from "../../Form/specific/FormElementDifficulty/FormElementDifficulty";
import FormElementLanguagePlus from "../../Form/specific/language/specific/FormElementLanguagePlus/FormElementLanguagePlus";
import FormElementLanguageMinus from "../../Form/specific/language/specific/FormElementLanguageMinus/FormElementLanguageMinus";

const ContentSettings = () => {
  const { isGuest } = useMe();

  return <div>{isGuest ? <ContentLetsLogin /> : <AreaContentSettings />}</div>;
};

export default ContentSettings;

// const ContentSettings = () => {
const AreaContentSettings = () => {
  const { me } = useMe();

  const field_name = "name";
  const initialValue_name = me && me[field_name] ? me[field_name] : null;

  const {
    value: name,
    // setValue: setName,
    onChange: onChange_name,
    // singleInputHandler: singleInputHandler_name,
    // loading: loading_name,
    errorLoading: errorLoading_name,

    updateAValueInDB: updateAValueInDB_name,

    disabled: disabled_name,
    loadingSuccessful: loadingSuccessful_name,
  } = useFormElementInput(
    // field_name, updateMe, initialValue_name
    {
      field: field_name,
      updateFunc: updateMe,
      initialValue: initialValue_name,
    }
  );

  const field_username = "username";
  const initialValue_username =
    me && me[field_username] ? me[field_username] : null;
  const {
    value: username,
    // setValue: setUsername,
    onChange: onChange_username,
    // singleInputHandler: singleInputHandler_username,
    // loading: loading_username,
    errorLoading: errorLoading_username,

    updateAValueInDB: updateAValueInDB_username,

    disabled: disabled_username,
    loadingSuccessful: loadingSuccessful_username,
  } = useFormElementInput(
    // field_username, updateMe, initialValue_username

    {
      field: field_username,
      updateFunc: updateMe,
      initialValue: initialValue_username,
    }
  );

  const field_bio = "bio";
  const initialValue_bio = me && me[field_bio] ? me[field_bio] : null;
  const {
    value: bio,
    // setValue: setBio,
    onChange: onChange_bio,
    // singleInputHandler: singleInputHandler_bio,
    // loading: loading_bio,
    errorLoading: errorLoading_bio,

    updateAValueInDB: updateAValueInDB_bio,

    disabled: disabled_bio,
    loadingSuccessful: loadingSuccessful_bio,
  } = useFormElementInput(
    // field_bio, updateMe, initialValue_bio

    {
      field: field_bio,
      updateFunc: updateMe,
      initialValue: initialValue_bio,
    }
  );

  const {
    isOpen: isOpen_email,
    openAreaModalBase: openAreaModalBase_email,
    closeAreaModalBase: closeAreaModalBase_email,
  } = useModalBase();

  // const {
  //   modalIsOpen: modalIsOpen_email,
  //   stylesModal: stylesModal_email,
  //   openModal: openModal_email,
  //   closeModal: closeModal_email,
  // } = useButtonModal();

  // useEffect(() => {
  //   console.log({
  //     modalIsOpen_email,
  //     stylesModal_email,
  //     openModal_email,
  //     closeModal_email,
  //   });
  // }, [modalIsOpen_email, stylesModal_email, openModal_email, closeModal_email]);

  // const {
  //   modalIsOpen: modalIsOpen_password,
  //   stylesModal: stylesModal_password,
  //   openModal: openModal_password,
  //   closeModal: closeModal_password,
  // } = useButtonModal();

  const {
    isOpen: isOpen_password,
    openAreaModalBase: openAreaModalBase_password,
    closeAreaModalBase: closeAreaModalBase_password,
  } = useModalBase();

  const myEmail = useMemo(() => {
    return me ? me.email : null;
  }, [me]);

  const field_gender = "gender";
  const initialValue_gender = me && me[field_gender] ? me[field_gender] : null;
  const {
    initialOption: initialOption_gender,
    selectedOption: selectedOption_gender,
    // selectedValue,
    // selectedLabel,
    // isDisabled: isDisabled_gender,
    dropDownOnChangeHandler: dropDownOnChangeHandler_gender,
    // enableDropDown,
    // disableDropDown,
    // setIsDisabled,
    updateAValueInDB: updateAValueInDB_gender,
    messageDropDown: messageDropDown_gender,
    errorLoading: errorLoading_gender,
    errorMessage: errorMessage_gender,

    disabled: disabled_gender,
  } = useFormElementDropDown({
    // field: "gender",
    // options: optionsDropDown_gender,

    field: field_gender,
    updateFunc: updateMe,
    valueInitial: initialValue_gender,
    options: optionsDropDown_gender,
  });

  const field_countryOfResidence = "countryOfResidence";
  const initialValue_countryOfResidence =
    me && me[field_countryOfResidence] ? me[field_countryOfResidence] : null;
  const field_placeOfResidence = "placeOfResidence";
  const initialValue_placeOfResidence =
    me && me[field_placeOfResidence] ? me[field_placeOfResidence] : null;

  const {
    initialOption_country: initialOption_countryOfResidence,
    selectedOption_country: selectedOption_countryOfResidence,
    selectedValue_country: selectedValue_countryOfResidence,
    dropDownOnChangeHandler_country: dropDownOnChangeHandler_countryOfResidence,
    // updateAValueInDB_country: updateAValueInDB_countryOfResidence,
    messageDropDown_country: messageDropDown_countryOfResidence,
    errorLoading_country: errorLoading_countryOfResidence,
    errorMessage_country: errorMessage_countryOfResidence,
    disabled_country: disabled_countryOfResidence,

    initialOption_placeInACountry: initialOption_placeOfResidence,
    selectedOption_placeInACountry: selectedOption_placeOfResidence,
    dropDownOnChangeHandler_placeInACountry:
      dropDownOnChangeHandler_placeOfResidence,
    messageDropDown_placeInACountry: messageDropDown_placeOfResidence,
    errorLoading_placeInACountry: errorLoading_placeOfResidence,
    errorMessage_placeInACountry: errorMessage_placeOfResidence,
    disabled_placeInACountry: disabled_placeOfResidence,

    optionsDropDown_placeInACountry: optionsDropDown_placeOfResidence,

    updateDB_placeInACountry_with_country:
      updateDB_placeOfResidence_with_countryOfResidence,
  } = useFormElementDropDownGeo({
    fieldCountry: field_countryOfResidence,
    fieldPlaceInACountry: field_placeOfResidence,
    updateFunc: updateMe,
    initialValue_country: initialValue_countryOfResidence,
    initialValue_placeInACountry: initialValue_placeOfResidence,
  });

  const field_countryOfOrigin = "countryOfOrigin";
  const initialValue_countryOfOrigin =
    me && me[field_countryOfOrigin] ? me[field_countryOfOrigin] : null;

  const {
    initialOption_country: initialOption_countryOfOrigin,
    selectedOption_country: selectedOption_countryOfOrigin,
    // selectedValue_country: selectedValue_countryOfOrigin,

    dropDownOnChangeHandler_country: dropDownOnChangeHandler_countryOfOrigin,
    updateAValueInDB_country: updateAValueInDB_countryOfOrigin,
    messageDropDown_country: messageDropDown_countryOfOrigin,
    errorLoading_country: errorLoading_countryOfOrigin,
    errorMessage_country: errorMessage_countryOfOrigin,
    disabled_country: disabled_countryOfOrigin,
  } = useFormElementDropDown_country({
    fieldCountry: field_countryOfOrigin,
    initialValue_country: initialValue_countryOfOrigin,
    updateFunc: updateMe,
  });

  const {
    selectedOption_year,
    yearOptions,
    initialOption_year,
    dropDownOnChangeHandler_year,

    selectedOption_month,
    monthIndexOptions,
    initialOption_month,
    dropDownOnChangeHandler_month,

    selectedOption_day,
    dayOptions,
    initialOption_day,
    dropDownOnChangeHandler_day,

    messageDropDownDate: messageDropDownBirthDate,

    errorLoading: errorLoadingBirth,
    errorMessageDate: errorMessageBirthDate,
    updateDB_date: updateAValueInDB_Birth,

    disabled: disabled_Birth,
  } = useFormElementDropDownDate(updateMe);

  return (
    <div className={classes.ContentSettings}>
      <FormArea isAForm={false}>
        <h5>個人設定</h5>
        <FormElementInput
          label={"ニックネーム"}
          // type={"text"}
          type={"name"}
          value={name}
          onChange={onChange_name}
          onClick={updateAValueInDB_name}
          // loading={loading_name}
          message={loadingSuccessful_name ? "更新に成功しました！" : null}
          errorLoading={errorLoading_name}
          errorMessage={"エラー"}
          isAForm={true}
          disabled={disabled_name}
          // maxLength
        />

        <FormElementInput
          label={"アカウント名"}
          // type={"text"}
          type={"username"}
          value={username}
          onChange={onChange_username}
          onClick={updateAValueInDB_username}
          // loading={loading_username}
          message={loadingSuccessful_username ? "更新に成功しました！" : null}
          errorLoading={errorLoading_username}
          errorMessage={"更新失敗：他のユーザーが既に使用しています。"}
          displayAtMark={true}
          isAForm={true}
          disabled={disabled_username}
        />

        {/* <FormElementInput
          label={"プロフィール写真"}
          labelSub={
            "（「保存」ボタンを押して更新しても、すぐには反映されない場合があります。保存後３０分たってもプロフィール写真が変わらない場合、お手数ですが再度画像のアップロードをお願いします。）"
          }
          type={"file"}
          // value={profilePic}
          onChange={onChange_profilePic}
          onClick={updateAValueInDB_profilePic}
          // loading={loading_profilePic}
          message={loadingSuccessful_profilePic ? "更新に成功しました！" : null}
          errorLoading={errorLoading_profilePic}
          errorMessage={"エラーが発生しました。"}
          isAForm={true}
          disabled={disabled_profilePic}
          uploadAFile={true}
          accept={".jpg,.png,.jpeg"}
          // name={name_profilePic}
        >
          <div className={classes.FormElementInput_image__wrapperImage}>
            {previewingProfilePic ? <p>プレビュー中</p> : null}
            <div
              className={
                classes.FormElementInput_image__wrapperImage__areaImage
              }
            >
              <UserImage
                user={previewingProfilePic ? null : me}
                jumpToUserPageOnClick={false}
                src={
                  previewingProfilePic ? URL.createObjectURL(profilePic) : null
                }
              />
            </div>
          </div>
        </FormElementInput> */}
        <FormElementProfilePic />

        <FormElementInput
          label={"自己紹介"}
          type={"text"}
          value={bio}
          onChange={onChange_bio}
          onClick={updateAValueInDB_bio}
          // loading={loading_bio}
          message={loadingSuccessful_bio ? "更新に成功しました！" : null}
          errorLoading={errorLoading_bio}
          errorMessage={"エラーが発生しました。"}
          isAForm={true}
          isTextarea={true}
          disabled={disabled_bio}
        />

        <FormElementLanguagePlus />
        <FormElementLanguageMinus />
        <FormElementDifficulty />

        <FormElementDropDown
          label={"性別"}
          selectedOption={selectedOption_gender}
          optionsDropDown={optionsDropDown_gender}
          initialOption={initialOption_gender}
          dropDownOnChangeHandler={dropDownOnChangeHandler_gender}
          message={messageDropDown_gender}
          errorLoading={errorLoading_gender}
          errorMessage={errorMessage_gender}
          onClick={updateAValueInDB_gender}
          disabled={disabled_gender}
          isAForm={true}
        />

        <FormElementDropDown
          label={"居住国"}
          selectedOption={selectedOption_countryOfResidence}
          optionsDropDown={optionsDropDown_countries}
          initialOption={initialOption_countryOfResidence}
          dropDownOnChangeHandler={dropDownOnChangeHandler_countryOfResidence}
          message={messageDropDown_countryOfResidence}
          errorLoading={errorLoading_countryOfResidence}
          errorMessage={errorMessage_countryOfResidence}
          onClick={updateDB_placeOfResidence_with_countryOfResidence}
          disabled={disabled_countryOfResidence}
          isAForm={true}
        />

        {selectedValue_countryOfResidence ? (
          <FormElementDropDown
            label={"居住地"}
            selectedOption={selectedOption_placeOfResidence}
            optionsDropDown={optionsDropDown_placeOfResidence}
            initialOption={initialOption_placeOfResidence}
            dropDownOnChangeHandler={dropDownOnChangeHandler_placeOfResidence}
            message={messageDropDown_placeOfResidence}
            errorLoading={errorLoading_placeOfResidence}
            errorMessage={errorMessage_placeOfResidence}
            // "placeOfResidence"の保存ボタンを押した時に"countryOfResidence"の変更が反映されない可能性があるので、必ず二つセットで更新する。
            onClick={updateDB_placeOfResidence_with_countryOfResidence}
            disabled={disabled_placeOfResidence}
            isAForm={true}
          />
        ) : null}

        <FormElementDropDown
          label={"出身国"}
          selectedOption={selectedOption_countryOfOrigin}
          optionsDropDown={optionsDropDown_countries}
          initialOption={initialOption_countryOfOrigin}
          dropDownOnChangeHandler={dropDownOnChangeHandler_countryOfOrigin}
          message={messageDropDown_countryOfOrigin}
          errorLoading={errorLoading_countryOfOrigin}
          errorMessage={errorMessage_countryOfOrigin}
          onClick={updateAValueInDB_countryOfOrigin}
          disabled={disabled_countryOfOrigin}
          isAForm={true}
        />

        <FormElementDropDownBirthDate
          label={"誕生日"}
          selectedOption_year={selectedOption_year}
          optionsDropDown_year={yearOptions}
          initialOption_year={initialOption_year}
          dropDownOnChangeHandler_year={dropDownOnChangeHandler_year}
          selectedOption_month={selectedOption_month}
          optionsDropDown_month={monthIndexOptions}
          initialOption_month={initialOption_month}
          dropDownOnChangeHandler_month={dropDownOnChangeHandler_month}
          selectedOption_day={selectedOption_day}
          optionsDropDown_day={dayOptions}
          initialOption_day={initialOption_day}
          dropDownOnChangeHandler_day={dropDownOnChangeHandler_day}
          message={messageDropDownBirthDate}
          errorLoading={errorLoadingBirth}
          errorMessage={errorMessageBirthDate}
          // onClick,
          disabled={disabled_Birth}
          onSubmit={updateAValueInDB_Birth}
        />

        <FormElementButton
          // label={"メールアドレス"}
          // modalIsOpen={modalIsOpen_email}
          // stylesModal={stylesModal_email}
          // openModal={openModal_email}
          // closeModal={closeModal_email}

          label={"メールアドレス"}
          // labelSub = null,
          // scrollableChildren = false,
          // disabled,
          // message = null,
          // errorLoading,
          // errorMessage,
          isOpen={isOpen_email}
          openAreaModalBase={openAreaModalBase_email}
          closeAreaModalBase={closeAreaModalBase_email}
        >
          <CardChangeAuthInfo
            defaultEmailAddress={myEmail}
            displayButtonToOpenInputArea={false}
            typeToChange={authInfoType_email}
          />
        </FormElementButton>

        <FormElementButton
          label={"パスワード"}
          // modalIsOpen={modalIsOpen_password}
          // stylesModal={stylesModal_password}
          // openModal={openModal_password}
          // closeModal={closeModal_password}

          isOpen={isOpen_password}
          openAreaModalBase={openAreaModalBase_password}
          closeAreaModalBase={closeAreaModalBase_password}
        >
          <CardChangeAuthInfo
            defaultEmailAddress={myEmail}
            displayButtonToOpenInputArea={false}
            typeToChange={authInfoType_password}
          />
        </FormElementButton>

        <FormElementReceiveNotificationsEmailChatRoomRandomMatch />
      </FormArea>
    </div>
  );
};

const FormElementDropDownBirthDate = ({
  label,

  selectedOption_year,
  optionsDropDown_year,
  initialOption_year,
  dropDownOnChangeHandler_year,

  selectedOption_month,
  optionsDropDown_month,
  initialOption_month,
  dropDownOnChangeHandler_month,

  selectedOption_day,
  optionsDropDown_day,
  initialOption_day,
  dropDownOnChangeHandler_day,

  message = null,
  errorLoading,
  errorMessage,
  // onClick,
  disabled,

  onSubmit,
}) => {
  return (
    <div className={classes.FormElementDropDown}>
      <FormElementTemplate
        label={label}
        isAForm={true}
        onSubmit={onSubmit}
        disabled={disabled}
      >
        <div className={classes.dropDownArea}>
          <DropDown
            selectedOption={selectedOption_year}
            dropDownItems={optionsDropDown_year}
            initialOption={initialOption_year}
            dropDownOnChangeHandler={dropDownOnChangeHandler_year}
            labelDropDown={null}
            isDisabled={disabled}
          />
          <div className={classes.dateLabel}>
            <p>年</p>
          </div>
          <DropDown
            selectedOption={selectedOption_month}
            dropDownItems={optionsDropDown_month}
            initialOption={initialOption_month}
            dropDownOnChangeHandler={dropDownOnChangeHandler_month}
            labelDropDown={null}
            isDisabled={disabled}
          />
          <div className={classes.dateLabel}>
            <p>月</p>
          </div>

          <DropDown
            selectedOption={selectedOption_day}
            dropDownItems={optionsDropDown_day}
            initialOption={initialOption_day}
            dropDownOnChangeHandler={dropDownOnChangeHandler_day}
            labelDropDown={null}
            isDisabled={disabled}
          />
          <div className={classes.dateLabel}>
            <p>日</p>
          </div>
        </div>

        <div className={classes.buttonContainer}>
          <FormButtonTemplate
            label={"保存"}
            // onClick={onClick}
            disabled={disabled}
          />
        </div>

        <FormMessageTemplate message={message} />
        <FormMessageErrorTemplate
          isError={errorLoading}
          message={errorMessage}
        />
      </FormElementTemplate>
    </div>
  );
};

const FormElementReceiveNotificationsEmailChatRoomRandomMatch = () => {
  const { me, fetchAndRenewMe } = useMe();

  const field_receiveNotificationsEmailChatRoomRandomMatch =
    "receiveNotificationsEmailChatRoomRandomMatch";

  const { checked, setChecked } = useToggleSwitch({
    defaultChecked: me?.receiveNotificationsEmailChatRoomRandomMatch,
  });

  const [updatingBool, setUpdatingBool] = useState(false);
  const [errorUpdatingBool, setErrorUpdatingBool] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(null);

  const updateMyBool = useCallback(
    async (newBool) => {
      try {
        setUpdatingBool(true);
        await updateMe({
          data: {
            [field_receiveNotificationsEmailChatRoomRandomMatch]: newBool,
          },
        });
        setErrorUpdatingBool(false);
        setUpdatedSuccessfully(true);
        await fetchAndRenewMe();
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
        setErrorUpdatingBool(true);
      } finally {
        setTimeout(() => {
          // すぐ戻してもいいんだけどチカチカしてみっともないから少し時間を置く
          setUpdatingBool(false);
        }, 500);
        setTimeout(() => {
          setUpdatedSuccessfully(null);
        }, 3000);
      }
    },
    [fetchAndRenewMe]
  );

  return (
    <FormElementInput
      label={"マッチした時に\nメール通知する"}
      labelSub={
        "ランダムチャットで誰かとマッチした際にメール通知を希望する場合はONにして下さい。"
      }
      type={"text"}
      // value={receiveNotificationsEmailChatRoomRandomMatch}
      // onChange={onChange_receiveNotificationsEmailChatRoomRandomMatch}
      // onClick={updateAValueInDB_receiveNotificationsEmailChatRoomRandomMatch}
      // loading={loading_receiveNotificationsEmailChatRoomRandomMatch}
      message={updatedSuccessfully ? "更新に成功しました！" : null}
      errorLoading={errorUpdatingBool}
      errorMessage={"エラー"}
      isAForm={true}
      disabled={updatingBool}
      // maxLength

      displayOnlyChildren={true}
    >
      <div
        className={
          classes.FormElementReceiveNotificationsEmailChatRoomRandomMatch__toggleTextArea
        }
      >
        <p
          className={`${
            classes.FormElementReceiveNotificationsEmailChatRoomRandomMatch__toggleTextArea__text
          } ${
            checked
              ? classes.FormElementReceiveNotificationsEmailChatRoomRandomMatch__toggleTextArea__text_checked
              : classes.FormElementReceiveNotificationsEmailChatRoomRandomMatch__toggleTextArea__text_unChecked
          }`}
        >
          {checked ? "ON" : "OFF"}
        </p>
      </div>
      <ToggleSwitch
        checked={checked}
        setChecked={setChecked}
        funcOnChange={updateMyBool}
        disabled={updatingBool}
      />
    </FormElementInput>
  );
};
