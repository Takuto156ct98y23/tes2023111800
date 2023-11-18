import classes from "./EditorSimple.module.css";
import { useCallback } from "react";
import TextareaAutoGrowing from "../../Content/UI/text/TextareaAutoGrowing/TextareaAutoGrowing";
import ButtonBasic from "../../button/Basic/ButtonBasic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CardMyRice from "../../Card/CardMyRice/CardMyRice";

const EditorSimple = ({
  // // px。入力欄の高さの最低値。
  // minHeight = 30,
  // px。入力欄の高さの最低値。"auto"のようなstringまたは20のようなnumber
  // autoはsingle line height
  minHeight = "auto",
  // px。入力欄の高さの最大値。
  maxHeight = 200,

  // text,
  textRealTime,
  setTextRealTime,
  // resetTextArea,
  // pathPost,
  // data,
  // callBackAfterCreate = null,
  // 諸々汎用的にEditorをdisableにするのに使う
  disabled = false,
  // テキスト入力欄とそれ以外を別々にdisabledにするなら以下を使用
  disabled_textarea = false,
  disabled_buttonEditorSimple = false,

  autoComplete = false,

  sending,
  // createMessage,
  // メッセージ生成ボタン等はここに入れる
  onButtonClick,
}) => {
  // const dataEditorSimple = useMemo(() => {
  //   return { ...data, contentStr: text };
  // }, [data, text]);

  // const callBackAfterCreateEditorSimple = useCallback(() => {
  //   if (callBackAfterCreate) {
  //     callBackAfterCreate();
  //   }
  // }, [callBackAfterCreate]);

  // const {
  //   createObject,
  //   sending,
  //   haveSendingError,
  //   sendingStatus,
  //   restrictedUntil,
  // } = useCreateContent();

  // useEffect(() => {
  //   if (sendingStatus === "success") {
  //     resetTextArea();
  //   }
  // }, [resetTextArea, sendingStatus]);

  const onClickHandler = useCallback(async () => {
    if (onButtonClick) {
      onButtonClick();
    }
    // if (createMessage) {
    //   createMessage();
    // }
    // await createObject({
    //   pathPost,
    //   // data: dataEditorSimple,
    //   data,
    //   callback: callBackAfterCreate,
    // });
    // if (callBackAfterCreateEditorSimple) {
    //   console.log("onClickHandler ifffff!!");
    //   callBackAfterCreateEditorSimple();
    // }
  }, [
    onButtonClick,
    // callBackAfterCreate,
    // createObject,
    // dataEditorSimple,
    // pathPost,
    // callBackAfterCreateEditorSimple,
  ]);

  // useNotificationEditorSimple(haveSendingError, sendingStatus, restrictedUntil);

  return (
    <div className={classes.EditorSimple}>
      <div className={classes.wrapperTextarea}>
        <TextareaAutoGrowing
          className={classes.textarea}
          minHeight={minHeight}
          maxHeight={maxHeight}
          autoComplete={autoComplete ? "on" : "off"}
          // https://stackoverflow.com/a/64837759
          // ここが空欄だと、autofillが出てしまう可能性がある。
          name={"EditorSimpleTextArea"}
          disabled={disabled_textarea || disabled}
          textRealTime={textRealTime}
          setTextRealTime={setTextRealTime}
        />
        <div className={classes.wrapperButton}>
          <SendButton
            onClickHandler={onClickHandler}
            disabled={
              !textRealTime ||
              disabled ||
              disabled_buttonEditorSimple ||
              sending
            }
          />
        </div>
      </div>
      <div className={classes.EditorSimple__bottom}>
        {
          // 強制非表示中
          false ? (
            <div className={classes.wrapperCardMyRice}>
              <CardMyRice className={classes.CardMyRice} />
            </div>
          ) : null
        }

        {/* <HitPointMessage /> */}

        {/* <CardLanguageSelector /> */}
      </div>
    </div>
  );
};

export default EditorSimple;

const SendButton = ({
  onClickHandler,
  disabled,
  // disabled_buttonEditorSimple,
}) => {
  return (
    <div className={classes.SendButton}>
      <ButtonBasic
        className={classes.ButtonBasic}
        onClick={onClickHandler}
        // disabled={disabled || disabled_buttonEditorSimple}
        disabled={disabled}
      >
        <FontAwesomeIcon className={classes.sendIcon} icon={faPaperPlane} />
      </ButtonBasic>
    </div>
  );
};

// const messsageLimitation = `HPがゼロになってから２４時間は英語しか使えない！😱
// （制限解除日時：{{REPLACE}}）

// ＜制限中の書き方＞
// NG😭："私は日本人！"
// NG😭："Hello! I'm Ken! 私は日本人！"
// OK😍："Hello! I'm Ken! Watashi wa nihon jin!"
// `;

// const useNotificationEditorSimple = (
//   haveSendingError,
//   sendingStatus,
//   restrictedUntil
// ) => {
//   const { displayNotificationSuccess, displayNotificationError } =
//     useNotificationToast();

//   useEffect(() => {
//     if (haveSendingError) {
//       displayNotificationError("エラーが発生しました", {
//         autoClose: timeToMilliseconds(30, "second"),
//       });
//       return;
//       // return "エラーが発生しました";
//     }

//     switch (sendingStatus) {
//       case "success":
//         // displayNotificationSuccess("投稿成功！", {
//         //   autoClose: timeToMilliseconds(1, "second"),
//         // });

//         return;
//       // return "投稿に成功！";

//       case "NoHP":
//         displayNotificationError(
//           messsageLimitation.replace(
//             "{{REPLACE}}",
//             `${formatJapaneseTime(restrictedUntil)}`
//           ),
//           {
//             autoClose: timeToMilliseconds(60, "second"),
//           }
//         );
//         return;
//       // return `HPがゼロになってから２４時間は日本語が使えない！（制限解除日時：${formatJapaneseTime(
//       //   restrictedUntil
//       // )}）`;
//       default:
//     }

//     // return null;
//   }, [
//     displayNotificationSuccess,
//     displayNotificationError,
//     haveSendingError,
//     restrictedUntil,
//     sendingStatus,
//   ]);
// };

// const HitPointMessage = () => {
//   const { currentHitPoints } = useMyHitPointRead();

//   const { isoCodeGoogles } = useMyLanguageRead();

//   const { me, languagePlusAndMinusAreTheSame } = useMe();

//   const nameLanguagePlus = useMemo(() => {
//     const isoCodeGoogle = me?.languagePlus?.isoCodeGoogle;

//     const languagePlusInMyLanguage = getObjectByKeyValuePairFromObjectArray(
//       "code",
//       isoCodeGoogle,
//       isoCodeGoogles
//     );
//     return languagePlusInMyLanguage?.name;
//   }, [isoCodeGoogles, me]);

//   const hitPointMessage = useMemo(() => {
//     let messageAboutHitPoint = "";
//     if (!nameLanguagePlus) {
//       return messageAboutHitPoint;
//     }
//     if (languagePlusAndMinusAreTheSame) {
//       messageAboutHitPoint =
//         "母国語と学習したい言語が同じ言語に設定されているようです。";
//       return messageAboutHitPoint;
//     }
//     if (currentHitPoints <= 0) {
//       messageAboutHitPoint = `HPがゼロになってしまった！\n２４時間${nameLanguagePlus}しかつかえない！`;
//       // "HPがゼロになってしまった！\n２４時間英語しかつかえない！";
//     } else if (currentHitPoints < 40) {
//       messageAboutHitPoint = `HPがゼロになりそうだ！\n${nameLanguagePlus}で文を書いてHPを回復しよう！`;
//       // "HPがゼロになりそうだ！\n英語で文を書いてHPを回復しよう！";
//     } else {
//       messageAboutHitPoint = `↑　${nameLanguagePlus}以外で書くとHPにダメージが！`;
//       // "英語以外で書くとHPにダメージ食らうぞ！\n（絵文字、数字、記号等はOK(例：😀😁😂01`+@)）";
//     }
//     return messageAboutHitPoint;
//   }, [currentHitPoints, nameLanguagePlus, languagePlusAndMinusAreTheSame]);
//   return (
//     <Fragment>
//       {typeof hitPointMessage === "string" ? (
//         <div className={classes.hitPointMessage}>
//           <div className={classes.hitPointMessageWrapper}>
//             <p className={classes.hitPointMessageText}>{hitPointMessage}</p>
//           </div>
//         </div>
//       ) : null}
//     </Fragment>
//   );
// };
