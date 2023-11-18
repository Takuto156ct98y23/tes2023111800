import classes from "./ContentChatRoomRandomConfig.module.css";

import { useCallback, useEffect, useMemo } from "react";
import { updateChatRoomRandomConfig } from "../../../api/apiChatRoomRandomConfig";
import useFormElementDropDown from "../../../hooks/form/DropDown/useFormElementDropDown";
import {
  optionsDropDown_age,
  optionsDropDown_countries,
  optionsDropDown_gender,
} from "../../../data/constants/form/dropDownConstants";
import useFormElementDropDownGeo from "../../../hooks/form/DropDown/geo/useFormElementDropDownGeo";
import useFormElementDropDown_country from "../../../hooks/form/DropDown/geo/useFormElementDropDown_country";
import useFormElementInput from "../../../hooks/form/useFormElementInput";
import useSubscriptions from "../../../hooks/commerceStripe/useSubscriptions";
import useCollapseReactCollapsed from "../../../hooks/UI/useCollapseReactCollapsed";
import FormArea from "../../Form/FormArea/FormArea";
import CollapseReactCollapsed from "../../Util/collapse/CollapseReactCollapsed/CollapseReactCollapsed";
import FormElementDropDown from "../../Form/FormElementDropDown/FormElementDropDown";
import FormElementInput from "../../Form/FormElementInput/FormElementInput";
import useDropDownAsync from "../../../hooks/DropDown/useDropDownAsync/useDropDownAsync";
import {
  LENGTH_MAX_PLACE_OF_RESIDENCE,
  LENGTH_MAX_WANNACHAT,
  chatRoomRandomConfigLength_Short,
  chatRoomRandomConfigLength_long,
  chatRoomRandomConfigScope_friends,
  chatRoomRandomConfigScope_friendsOfMyFriends,
  chatRoomRandomConfigScope_public,
} from "../../../data/constants/chatRoomRandomConfigConstants";
import FormElementButton from "../../Form/FormElementButton/FormElementButton";
import useModalBase from "../../../hooks/Modal/useModalBase";
import ButtonBasic from "../../button/Basic/ButtonBasic";
import DropDownAsync from "../../DropDown/DropDownAsync/DropDownAsync";
// import useChatRoomRandomConfig from "../../../hooks/chatRoomRandomConfig/useChatRoomRandomConfig";
import ButtonJump from "../../button/ButtonJump/ButtonJump";
import { useParams } from "react-router-dom";
import useMe from "../../../hooks/user/me/useMe";
import FormElementDifficulty from "../../Form/specific/FormElementDifficulty/FormElementDifficulty";
import FormElementLanguageOfPartner from "../../Form/specific/FormElementLanguageOfPartner/FormElementLanguageOfPartner";

const ContentChatRoomRandomConfig = ({
  chatRoomRandomConfig,
  active,
  wannaChat,
  setWannaChat,
  getOrCreateChatRoomRandomConfig,
  disabled_all,
  disabled_inputArea,
}) => {
  // const {
  //   chatRoomRandomConfig,
  //   active,
  //   wannaChat,
  //   setWannaChat,
  //   getOrCreateChatRoomRandomConfig,
  //   disabled_all,
  //   disabled_inputArea,
  // } = useChatRoomRandomConfig();

  // const params = useParams();

  // const scope = useMemo(() => {
  //   return params?.scope;
  // }, [params]);
  // const chatLength = useMemo(() => {
  //   return params?.chatLength;
  // }, [params]);

  const { isUser } = useMe();

  return (
    <div className={classes.ContentChatRoomRandomConfig}>
      {/* <ButtonJump
        label={"戻る"}
        path={`/chatrooms-random/${scope}/${chatLength}`}
      /> */}

      {active === true ? (
        <ChatRoomRandomConfig
          chatRoomRandomConfig={chatRoomRandomConfig}
          getOrCreateChatRoomRandomConfig={getOrCreateChatRoomRandomConfig}
          wannaChat={wannaChat}
          setWannaChat={setWannaChat}
          disabled_all={!isUser || disabled_all}
          disabled_inputArea={!isUser || disabled_inputArea}
        />
      ) : null}
    </div>
  );
};

export default ContentChatRoomRandomConfig;

// const ChatRoomRandomConfig = ({
//   chatRoomRandomConfig,
//   getOrCreateChatRoomRandomConfig,
//   wannaChat,
//   setWannaChat,
//   disabled_all,
//   disabled_inputArea,
// }) => {
//   return (
//     <Fragment>
//       <AreaSetting
//         chatRoomRandomConfig={chatRoomRandomConfig}
//         getOrCreateChatRoomRandomConfig={getOrCreateChatRoomRandomConfig}
//         wannaChat={wannaChat}
//         setWannaChat={setWannaChat}
//         disabled_all={disabled_all}
//         disabled_inputArea={disabled_inputArea}
//       />
//     </Fragment>
//   );
// };

// const AreaSetting = ({
const ChatRoomRandomConfig = ({
  chatRoomRandomConfig,
  getOrCreateChatRoomRandomConfig,

  wannaChat,
  setWannaChat,
  disabled_all,
  disabled_inputArea,
}) => {
  return (
    <div className={classes.ChatRoomRandomConfig}>
      <FormArea
        isAForm={false}
        className={classes.ChatRoomRandomConfig__FormArea}
      >
        <AreaPartnerScope />
        <AreaChatLength />

        <AreaSetting
          chatRoomRandomConfig={chatRoomRandomConfig}
          getOrCreateChatRoomRandomConfig={getOrCreateChatRoomRandomConfig}
          wannaChat={wannaChat}
          setWannaChat={setWannaChat}
          disabled_all={disabled_all}
          disabled_inputArea={disabled_inputArea}
        />
      </FormArea>
    </div>
  );
};

const ButtonPathChanger = ({ chatLength = null, scope = null, label }) => {
  const params = useParams();

  const scopeOfThisPage = useMemo(() => {
    return params?.scope;
  }, [params]);
  const chatLengthOfThisPage = useMemo(() => {
    return params?.chatLength;
  }, [params]);
  const pathToJump = useMemo(() => {
    return `/chatrooms-random/${scope ? scope : scopeOfThisPage}/${
      chatLength ? chatLength : chatLengthOfThisPage
    }`;
  }, [chatLength, chatLengthOfThisPage, scope, scopeOfThisPage]);

  const selected = useMemo(() => {
    if (typeof pathToJump !== "string") {
      return null;
    }
    if (!chatLength && !scope) {
      return null;
    }
    // 例：["", "chatrooms-random", "public", "short"]
    const strsInPathToJump = pathToJump.split("/");

    if (!Array.isArray(strsInPathToJump) || strsInPathToJump.length < 4) {
      return null;
    }

    const scopeInPathToJump = strsInPathToJump[2];
    const chatLengthInPathToJump = strsInPathToJump[3];

    if (
      typeof scopeOfThisPage === "string" &&
      typeof chatLengthOfThisPage === "string" &&
      scopeOfThisPage === scopeInPathToJump &&
      chatLengthOfThisPage === chatLengthInPathToJump
    ) {
      return true;
    } else {
      return false;
    }

    // if (scopeOfThisPage !== scopeInPathToJump) {
    //   return false;
    // }
    // if (chatLengthOfThisPage !== chatLengthInPathToJump) {
    //   return false;
    // }
    // return true;
  }, [chatLength, chatLengthOfThisPage, pathToJump, scope, scopeOfThisPage]);
  return (
    <ButtonJump
      path={
        // path
        pathToJump
      }
      className={[
        classes.ButtonPathChanger,
        selected
          ? classes.ButtonPathChanger_selected
          : classes.ButtonPathChanger_notSelected,
      ].join(" ")}
    >
      <p>{label}</p>
    </ButtonJump>
  );
};

const AreaPartnerScope = () => {
  return (
    <div className={classes.AreaPartnerScope}>
      <h6>誰と話したい？</h6>

      <div className={classes.AreaPartnerScope__buttons}>
        <ButtonPathChanger
          scope={chatRoomRandomConfigScope_friends}
          // path={"/chatrooms-random/friends/short"}
          label={"友達の誰か"}
        />
        <ButtonPathChanger
          scope={chatRoomRandomConfigScope_friendsOfMyFriends}
          // path={"/chatrooms-random/friendsOfMyFriends/short"}
          label={"友達の友達の誰か"}
        />
        <ButtonPathChanger
          scope={chatRoomRandomConfigScope_public}
          // path={"/chatrooms-random/public/short"}
          label={"日本の誰か"}
        />
      </div>

      {/* <ButtonJump
        path={"/chatrooms-random/friends/short"}
        className={classes.AreaPartnerScope_button}
      >
        <p>友達の誰か</p>
      </ButtonJump>
      <ButtonJump path={"/chatrooms-random/friendsOfMyFriends/short"}>
        <p>友達の友達の誰か</p>
      </ButtonJump>
      <ButtonJump path={"/chatrooms-random/public/short"}>
        <p>日本の誰か</p>
      </ButtonJump> */}
    </div>
  );
};
const AreaChatLength = () => {
  return (
    <div className={classes.AreaPartnerScope}>
      <h6>どれだけ話したい？</h6>

      <div className={classes.AreaPartnerScope__buttons}>
        <ButtonPathChanger
          chatLength={chatRoomRandomConfigLength_Short}
          // path={"/chatrooms-random/friends/short"}
          label={"５分間"}
        />
        <ButtonPathChanger
          chatLength={chatRoomRandomConfigLength_long}
          // path={"/chatrooms-random/friendsOfMyFriends/short"}
          label={"２４時間"}
        />
      </div>

      {/* <ButtonJump
        path={"/chatrooms-random/friends/short"}
        className={classes.AreaPartnerScope_button}
      >
        <p>友達の誰か</p>
      </ButtonJump>
      <ButtonJump path={"/chatrooms-random/friendsOfMyFriends/short"}>
        <p>友達の友達の誰か</p>
      </ButtonJump>
      <ButtonJump path={"/chatrooms-random/public/short"}>
        <p>日本の誰か</p>
      </ButtonJump> */}
    </div>
  );
};

const AreaSetting = ({
  chatRoomRandomConfig,
  getOrCreateChatRoomRandomConfig,

  wannaChat,
  setWannaChat,
  disabled_all,
  disabled_inputArea,
}) => {
  const updateAValueChatRoomRandomConfig = useCallback(
    async ({ data, signal = null }) => {
      await updateChatRoomRandomConfig(null, data, signal);
      await getOrCreateChatRoomRandomConfig(signal);
    },
    [getOrCreateChatRoomRandomConfig]
  );

  // const field_scope = "scope";
  // const initialValue_scope =
  //   chatRoomRandomConfig && chatRoomRandomConfig[field_scope]
  //     ? chatRoomRandomConfig[field_scope]
  //     : null;
  // const {
  //   initialOption: initialOption_scope,
  //   selectedOption: selectedOption_scope,
  //   dropDownOnChangeHandler: dropDownOnChangeHandler_scope,
  //   updateAValueInDB: updateAValueInDB_scope,
  //   messageDropDown: messageDropDown_scope,
  //   errorLoading: errorLoading_scope,
  //   errorMessage: errorMessage_scope,

  //   disabled: disabled_scope,
  // } = useFormElementDropDown({
  //   field: field_scope,
  //   updateFunc: updateAValueChatRoomRandomConfig,
  //   valueInitial: initialValue_scope,
  //   options: optionsDropDown_scope,
  // });

  const field_gender = "gender";
  const initialValue_gender =
    chatRoomRandomConfig && chatRoomRandomConfig[field_gender]
      ? chatRoomRandomConfig[field_gender]
      : null;
  const {
    initialOption: initialOption_gender,
    selectedOption: selectedOption_gender,
    dropDownOnChangeHandler: dropDownOnChangeHandler_gender,
    updateAValueInDB: updateAValueInDB_gender,
    messageDropDown: messageDropDown_gender,
    errorLoading: errorLoading_gender,
    errorMessage: errorMessage_gender,

    disabled: disabled_gender,
  } = useFormElementDropDown({
    field: field_gender,
    updateFunc: updateAValueChatRoomRandomConfig,
    valueInitial: initialValue_gender,
    options: optionsDropDown_gender,
  });

  const field_countryOfResidence = "countryOfResidence";
  const initialValue_countryOfResidence =
    chatRoomRandomConfig && chatRoomRandomConfig[field_countryOfResidence]
      ? chatRoomRandomConfig[field_countryOfResidence]
      : null;
  const field_placeOfResidence = "placeOfResidence";
  const initialValue_placeOfResidence =
    chatRoomRandomConfig && chatRoomRandomConfig[field_placeOfResidence]
      ? chatRoomRandomConfig[field_placeOfResidence]
      : null;
  const {
    initialOption_country: initialOption_countryOfResidence,
    selectedOption_country: selectedOption_countryOfResidence,
    selectedValue_country: selectedValue_countryOfResidence,
    dropDownOnChangeHandler_country: dropDownOnChangeHandler_countryOfResidence,
    messageDropDown_country: messageDropDown_countryOfResidence,
    errorLoading_country: errorLoading_countryOfResidence,
    errorMessage_country: errorMessage_countryOfResidence,
    disabled_country: disabled_countryOfResidence,

    initialOption_placeInACountry: initialOption_placeOfResidence,
    selectedOption_placeInACountry: selectedOption_placeOfResidence,
    dropDownOnChangeHandler_placeInACountry:
      dropDownOnChangeHandler_placeOfResidence,
    messageDropDown_placeInACountry: messageDropDown_placeOfResidence,
    setMessageDropDown_placeInACountry: setMessageDropDown_placeOfResidence,
    errorLoading_placeInACountry: errorLoading_placeOfResidence,
    errorMessage_placeInACountry: errorMessage_placeOfResidence,
    disabled_placeInACountry: disabled_placeOfResidence,

    optionsDropDown_placeInACountry: optionsDropDown_placeOfResidence,

    updateDB_placeInACountry_with_country:
      updateDB_placeOfResidence_with_countryOfResidence,
  } = useFormElementDropDownGeo({
    fieldCountry: field_countryOfResidence,
    fieldPlaceInACountry: field_placeOfResidence,
    updateFunc: updateAValueChatRoomRandomConfig,
    initialValue_country: initialValue_countryOfResidence,
    initialValue_placeInACountry: initialValue_placeOfResidence,
  });

  const reachedTheMaximumSelectionLimit_placeOfResidence = useMemo(() => {
    if (
      Array.isArray(selectedOption_placeOfResidence) &&
      LENGTH_MAX_PLACE_OF_RESIDENCE < selectedOption_placeOfResidence.length
    ) {
      return true;
    }
    return false;
  }, [selectedOption_placeOfResidence]);
  useEffect(() => {
    if (reachedTheMaximumSelectionLimit_placeOfResidence) {
      setMessageDropDown_placeOfResidence(
        `登録上限個数（${LENGTH_MAX_PLACE_OF_RESIDENCE}個）を超えています。`
      );
    } else {
      setMessageDropDown_placeOfResidence("");
    }
  }, [
    reachedTheMaximumSelectionLimit_placeOfResidence,
    setMessageDropDown_placeOfResidence,
  ]);

  const field_countryOfOrigin = "countryOfOrigin";
  const initialValue_countryOfOrigin =
    chatRoomRandomConfig && chatRoomRandomConfig[field_countryOfOrigin]
      ? chatRoomRandomConfig[field_countryOfOrigin]
      : null;

  const {
    initialOption_country: initialOption_countryOfOrigin,
    selectedOption_country: selectedOption_countryOfOrigin,
    dropDownOnChangeHandler_country: dropDownOnChangeHandler_countryOfOrigin,
    updateAValueInDB_country: updateAValueInDB_countryOfOrigin,
    messageDropDown_country: messageDropDown_countryOfOrigin,
    errorLoading_country: errorLoading_countryOfOrigin,
    errorMessage_country: errorMessage_countryOfOrigin,
    disabled_country: disabled_countryOfOrigin,
  } = useFormElementDropDown_country({
    fieldCountry: field_countryOfOrigin,
    initialValue_country: initialValue_countryOfOrigin,
    updateFunc: updateAValueChatRoomRandomConfig,
  });

  const field_ageMin = "ageMin";
  const initialValue_ageMin =
    chatRoomRandomConfig && chatRoomRandomConfig[field_ageMin]
      ? chatRoomRandomConfig[field_ageMin]
      : null;
  const {
    initialOption: initialOption_ageMin,
    selectedOption: selectedOption_ageMin,
    selectedValue: selectedValue_ageMin,
    dropDownOnChangeHandler: dropDownOnChangeHandler_ageMin,
    updateAValueInDB: updateAValueInDB_ageMin,
    messageDropDown: messageDropDown_ageMin,
    errorLoading: errorLoading_ageMin,
    errorMessage: errorMessage_ageMin,

    disabled: disabled_ageMin,
  } = useFormElementDropDown({
    field: field_ageMin,
    updateFunc: updateAValueChatRoomRandomConfig,
    valueInitial: initialValue_ageMin,
    options: optionsDropDown_age,
  });

  const field_ageMax = "ageMax";
  const initialValue_ageMax =
    chatRoomRandomConfig && chatRoomRandomConfig[field_ageMax]
      ? chatRoomRandomConfig[field_ageMax]
      : null;
  const {
    initialOption: initialOption_ageMax,
    selectedOption: selectedOption_ageMax,
    selectedValue: selectedValue_ageMax,
    dropDownOnChangeHandler: dropDownOnChangeHandler_ageMax,
    updateAValueInDB: updateAValueInDB_ageMax,
    messageDropDown: messageDropDown_ageMax,
    errorLoading: errorLoading_ageMax,
    errorMessage: errorMessage_ageMax,

    disabled: disabled_ageMax,
  } = useFormElementDropDown({
    field: field_ageMax,
    updateFunc: updateAValueChatRoomRandomConfig,
    valueInitial: initialValue_ageMax,
    options: optionsDropDown_age,
  });

  const optionsDropDown_ageMin = useMemo(() => {
    if (!selectedValue_ageMax) {
      return optionsDropDown_age;
    }
    const optionsDropDown_lessThan_selectedValue_ageMax = [];
    for (const anAgeOption of optionsDropDown_age) {
      if (anAgeOption) {
        const age = anAgeOption.value;
        if (age === null) {
          optionsDropDown_lessThan_selectedValue_ageMax.push(anAgeOption);
        }
        if (typeof age === "number" && age < selectedValue_ageMax) {
          optionsDropDown_lessThan_selectedValue_ageMax.push(anAgeOption);
        }
      }
    }
    return optionsDropDown_lessThan_selectedValue_ageMax;
  }, [selectedValue_ageMax]);
  const optionsDropDown_ageMax = useMemo(() => {
    if (!selectedValue_ageMin) {
      return optionsDropDown_age;
    }
    const optionsDropDown_greaterThan_selectedValue_ageMin = [];
    for (const anAgeOption of optionsDropDown_age) {
      if (anAgeOption) {
        const age = anAgeOption.value;
        if (age === null) {
          optionsDropDown_greaterThan_selectedValue_ageMin.push(anAgeOption);
        }
        if (typeof age === "number" && selectedValue_ageMin < age) {
          optionsDropDown_greaterThan_selectedValue_ageMin.push(anAgeOption);
        }
      }
    }
    return optionsDropDown_greaterThan_selectedValue_ageMin;
  }, [selectedValue_ageMin]);

  const field_bio = "bio";
  const initialValue_bio =
    chatRoomRandomConfig && chatRoomRandomConfig[field_bio]
      ? chatRoomRandomConfig[field_bio]
      : null;
  const {
    value: bio,
    onChange: onChange_bio,
    errorLoading: errorLoading_bio,
    updateAValueInDB: updateAValueInDB_bio,
    disabled: disabled_bio,
    loadingSuccessful: loadingSuccessful_bio,
  } = useFormElementInput({
    field: field_bio,
    updateFunc: updateAValueChatRoomRandomConfig,
    initialValue: initialValue_bio,
  });

  const {
    amASubscriber,
    amAPartialSubscriber,
    notASubscriber,
    notAPartialSubscriber,
  } = useSubscriptions();

  const disabled_setting = useMemo(() => {
    return disabled_all || disabled_inputArea;
  }, [disabled_all, disabled_inputArea]);

  const {
    getCollapseProps,
    getToggleProps,
    isExpanded,
    toggleCollapse,
    closeCollapse,
  } = useCollapseReactCollapsed();

  return (
    <div className={classes.AreaSetting}>
      <h6>マッチ設定</h6>

      {/* {wannaChat !== null ? (
        <AreaWannaChat
          wannaChat={wannaChat}
          setWannaChat={setWannaChat}
          disabled={disabled_setting}
        />
      ) : null} */}

      <div className={classes.SettingsFree}>
        {wannaChat !== null ? (
          <AreaWannaChat
            wannaChat={wannaChat}
            setWannaChat={setWannaChat}
            disabled={disabled_setting}
          />
        ) : null}

        <FormElementDifficulty
          chatRoomRandomConfig={chatRoomRandomConfig}
          updateAValueChatRoomRandomConfig={updateAValueChatRoomRandomConfig}
        />
        <FormElementLanguageOfPartner
          chatRoomRandomConfig={chatRoomRandomConfig}
          updateAValueChatRoomRandomConfig={updateAValueChatRoomRandomConfig}
        />
      </div>

      {/* <FormElementDropDown
    label={"マッチング範囲"}
    selectedOption={selectedOption_scope}
    optionsDropDown={optionsDropDown_scope}
    initialOption={initialOption_scope}
    dropDownOnChangeHandler={dropDownOnChangeHandler_scope}
    message={messageDropDown_scope}
    errorLoading={errorLoading_scope}
    errorMessage={errorMessage_scope}
    onClick={updateAValueInDB_scope}
    disabled={disabled_scope || disabled_setting}
    isAForm={true}
  /> */}

      <CollapseReactCollapsed
        elementAsASwitch={
          <p className={classes.elementAsASwitch}>{`もっと細かく設定する${
            amASubscriber ? "" : "（プレミアム会員限定）"
          }`}</p>
        }
        withZIndex={false}
        getCollapseProps={getCollapseProps}
        getToggleProps={getToggleProps}
        isExpanded={isExpanded}
        toggleCollapse={toggleCollapse}
        closeCollapse={closeCollapse}
      >
        <div className={classes.CollapseReactCollapsed__wrapper}>
          <FormArea isAForm={false}>
            <FormElementDropDown
              label={"性別"}
              selectedOption={selectedOption_gender}
              optionsDropDown={optionsDropDown_gender}
              initialOption={initialOption_gender}
              dropDownOnChangeHandler={dropDownOnChangeHandler_gender}
              message={
                messageDropDown_gender
                  ? messageDropDown_gender
                  : amAPartialSubscriber
                  ? "ここは特別に設定できるよ！😊"
                  : null
              }
              errorLoading={errorLoading_gender}
              errorMessage={errorMessage_gender}
              onClick={updateAValueInDB_gender}
              disabled={
                (notASubscriber && notAPartialSubscriber) ||
                disabled_gender ||
                disabled_setting
              }
              isAForm={true}
              // activateLinkToUpgradePage={notASubscriber}
              activateLinkToUpgradePage={
                notASubscriber && notAPartialSubscriber
              }
            />

            <FormElementDropDown
              label={"居住国"}
              selectedOption={selectedOption_countryOfResidence}
              optionsDropDown={optionsDropDown_countries}
              initialOption={initialOption_countryOfResidence}
              dropDownOnChangeHandler={
                dropDownOnChangeHandler_countryOfResidence
              }
              message={
                // messageDropDown_countryOfResidence

                messageDropDown_countryOfResidence
                  ? messageDropDown_countryOfResidence
                  : amAPartialSubscriber
                  ? "ここは特別に設定できるよ！😊"
                  : null
              }
              errorLoading={errorLoading_countryOfResidence}
              errorMessage={errorMessage_countryOfResidence}
              onClick={updateDB_placeOfResidence_with_countryOfResidence}
              disabled={
                (notASubscriber && notAPartialSubscriber) ||
                disabled_countryOfResidence ||
                disabled_setting
              }
              isAForm={true}
              // activateLinkToUpgradePage={notASubscriber}
              activateLinkToUpgradePage={
                notASubscriber && notAPartialSubscriber
              }
            />

            {selectedValue_countryOfResidence ? (
              <FormElementDropDown
                label={"居住地"}
                selectedOption={selectedOption_placeOfResidence}
                optionsDropDown={optionsDropDown_placeOfResidence}
                initialOption={initialOption_placeOfResidence}
                dropDownOnChangeHandler={
                  dropDownOnChangeHandler_placeOfResidence
                }
                message={messageDropDown_placeOfResidence}
                errorLoading={errorLoading_placeOfResidence}
                errorMessage={errorMessage_placeOfResidence}
                // "placeOfResidence"の保存ボタンを押した時に"countryOfResidence"の変更が反映されない可能性があるので、必ず二つセットで更新する。
                onClick={updateDB_placeOfResidence_with_countryOfResidence}
                disabled={
                  notASubscriber ||
                  disabled_placeOfResidence ||
                  disabled_setting
                }
                buttonDisabled={
                  reachedTheMaximumSelectionLimit_placeOfResidence
                }
                isAForm={true}
                isMulti={true}
                activateLinkToUpgradePage={notASubscriber}
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
              disabled={
                notASubscriber || disabled_countryOfOrigin || disabled_setting
              }
              isAForm={true}
              activateLinkToUpgradePage={notASubscriber}
            />

            <FormElementDropDown
              label={"年齢（下限）"}
              selectedOption={selectedOption_ageMin}
              optionsDropDown={optionsDropDown_ageMin}
              initialOption={initialOption_ageMin}
              dropDownOnChangeHandler={dropDownOnChangeHandler_ageMin}
              message={messageDropDown_ageMin}
              errorLoading={errorLoading_ageMin}
              errorMessage={errorMessage_ageMin}
              onClick={updateAValueInDB_ageMin}
              disabled={notASubscriber || disabled_ageMin || disabled_setting}
              isAForm={true}
              activateLinkToUpgradePage={notASubscriber}
            />

            <FormElementDropDown
              label={"年齢（上限）"}
              selectedOption={selectedOption_ageMax}
              optionsDropDown={optionsDropDown_ageMax}
              initialOption={initialOption_ageMax}
              dropDownOnChangeHandler={dropDownOnChangeHandler_ageMax}
              message={messageDropDown_ageMax}
              errorLoading={errorLoading_ageMax}
              errorMessage={errorMessage_ageMax}
              onClick={updateAValueInDB_ageMax}
              disabled={notASubscriber || disabled_ageMax || disabled_setting}
              isAForm={true}
              activateLinkToUpgradePage={notASubscriber}
            />

            {/* <FormElementDifficulty
              chatRoomRandomConfig={chatRoomRandomConfig}
              updateAValueChatRoomRandomConfig={
                updateAValueChatRoomRandomConfig
              }
            />
            <FormElementLanguageOfPartner
              chatRoomRandomConfig={chatRoomRandomConfig}
              updateAValueChatRoomRandomConfig={
                updateAValueChatRoomRandomConfig
              }
            /> */}

            <FormElementInput
              label={"フリーワード検索"}
              labelSub={
                "自己紹介文から検索します。スペースか改行で区切って単語を入力して下さい。"
              }
              type={"text"}
              value={bio}
              onChange={onChange_bio}
              onClick={updateAValueInDB_bio}
              message={loadingSuccessful_bio ? "更新に成功しました！" : null}
              errorLoading={errorLoading_bio}
              errorMessage={"エラーが発生しました。"}
              isAForm={true}
              disabled={notASubscriber || disabled_bio || disabled_setting}
              activateLinkToUpgradePage={notASubscriber}
            />
          </FormArea>
        </div>
      </CollapseReactCollapsed>
    </div>
  );
};

const AreaWannaChat = ({ wannaChat, setWannaChat, disabled }) => {
  const { isOpen, openAreaModalBase, closeAreaModalBase } = useModalBase();

  const {
    getOptionsDebounced,
    selectedOption,
    handleChange,
    getDropDownCardObj,
    initialOptionDropDownAsync,
  } = useDropDownAsync({
    path: "users/search",
    defaultValuesDropDownAsync: wannaChat,
  });

  const exceededWannaChatLengthMax = useMemo(() => {
    return (
      Array.isArray(selectedOption) &&
      LENGTH_MAX_WANNACHAT < selectedOption.length
    );
  }, [selectedOption]);

  const buttonDisabledAreaDropDownAsync = useMemo(() => {
    return exceededWannaChatLengthMax || disabled;
  }, [exceededWannaChatLengthMax, disabled]);

  const renewWannaChat = useCallback(() => {
    if (selectedOption) {
      setWannaChat(selectedOption);
    }

    closeAreaModalBase();
  }, [closeAreaModalBase, selectedOption, setWannaChat]);

  return (
    <div className={classes.AreaWannaChat}>
      <FormElementButton
        label={"会話したいユーザー"}
        labelSub={
          "ここに登録されたユーザーとはマッチしやすくなるよ！（登録が相手に通知されることはありません。）"
        }
        scrollableChildren={true}
        isOpen={isOpen}
        openAreaModalBase={openAreaModalBase}
        closeAreaModalBase={closeAreaModalBase}
        disabled={disabled}
      >
        <div className={classes.ModalContent}>
          <AreaDropDownAsync
            getOptionsDebounced={getOptionsDebounced}
            handleChange={handleChange}
            initialOptionDropDownAsync={initialOptionDropDownAsync}
            getDropDownCardObj={getDropDownCardObj}
            renewWannaChat={renewWannaChat}
            exceededWannaChatLengthMax={exceededWannaChatLengthMax}
            buttonDisabledAreaDropDownAsync={buttonDisabledAreaDropDownAsync}
          />
        </div>
      </FormElementButton>
    </div>
  );
};

const AreaDropDownAsync = ({
  getOptionsDebounced,
  handleChange,
  initialOptionDropDownAsync,
  getDropDownCardObj,
  renewWannaChat,
  exceededWannaChatLengthMax,
  buttonDisabledAreaDropDownAsync,
}) => {
  return (
    <div className={classes.AreaDropDownAsync}>
      <div className={classes.AreaDropDownAsync__AreaButton}>
        {exceededWannaChatLengthMax ? (
          <div
            className={
              classes.AreaDropDownAsync__AreaButton__exceededWannaChatLengthMax
            }
          >
            <p
              className={
                classes.AreaDropDownAsync__AreaButton__exceededWannaChatLengthMax__text
              }
            >{`ごめんね、登録できるのは${LENGTH_MAX_WANNACHAT}人までなんだ😭`}</p>
          </div>
        ) : null}
        <ButtonBasic
          onClick={renewWannaChat}
          disabled={buttonDisabledAreaDropDownAsync}
        >
          登録
        </ButtonBasic>
      </div>
      <div className={classes.AreaDropDownAsync__AreaExplanation}>
        <p>
          名前を入力して、マッチしたいユーザーを登録しよう🔍登録するとそのユーザーとのマッチの確率が上がるよ🚀
        </p>
      </div>

      <DropDownAsync
        getOptionsDebounced={getOptionsDebounced}
        handleChange={handleChange}
        initialOptionDropDownAsync={initialOptionDropDownAsync}
        getDropDownCardObj={getDropDownCardObj}
      />
    </div>
  );
};
