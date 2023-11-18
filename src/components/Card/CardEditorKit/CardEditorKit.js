import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useDropDownAudience from "../../../hooks/DropDown/useDropDownAudience/useDropDownAudience";
import useEditorSimple from "../../../hooks/editor/useEditorSimple";
import DropDown from "../../DropDown/DropDown/DropDown";
import EditorSimple from "../../Editor/EditorSimple/EditorSimple";
import classes from "./CardEditorKit.module.css";
import {
  SEGMENT_STR_TYPE_ORIGINAL,
  SEGMENT_STR_TYPE_TRANSLATED,
  characterLimit_AIChat,
} from "../../../data/constants/messageConstants";
import ButtonBasic from "../../button/Basic/ButtonBasic";
import { handleError, isGoodError } from "../../../utils/utilsError";
import { postData } from "../../../api/apiGeneral";
import { v4 as uuidv4 } from "uuid";
import useTooltip from "../../../hooks/useTooltip";
import Tooltip from "../../Tooltip/Tooltip";
import { getSegments } from "../../../utils/string/segment/segmenter";
import useHitPointBar from "../../../hooks/hitPoint/useHitPointBar";
import ButtonJump from "../../button/ButtonJump/ButtonJump";
import useRiceRead from "../../../hooks/rice/useRiceRead";
import useCreateContent from "../../../hooks/content/useCreateContent";
import useNotificationToast from "../../../hooks/NotificationToast/useNotificationToast";
import {
  formatJapaneseTime,
  timeToMilliseconds,
} from "../../../utils/utilsTime";
import CardMessageText from "../message/CardMessageText/CardMessageText";
import useMe from "../../../hooks/user/me/useMe";
import useMyLanguageRead from "../../../hooks/myLanguage/useMyLanguageRead";
import { getObjectByKeyValuePairFromObjectArray } from "../../../utils/arrayUtils";
import {
  ERROR_MESSAGE_ALL_TRANSLATION_LIMIT,
  ERROR_MESSAGE_FREEUSERS_TRANSLATION_LIMIT,
  ERROR_MESSAGE_INSUFFICIENT_RICE,
} from "../../../data/constants/errorConstants";
import { getTextBySegmentObjs } from "../../../utils/message/utilsMessage";
import { openNewTab } from "../../../utils/utilsWindow";

const ERROR_TYPE_SEGMENTSEDITOR_REACHED_FREE_LIMIT =
  "ERROR_TYPE_SEGMENTSEDITOR_REACHED_FREE_LIMIT";
const ERROR_TYPE_SEGMENTSEDITOR_REACHED_ALL_LIMIT =
  "ERROR_TYPE_SEGMENTSEDITOR_REACHED_ALL_LIMIT";

const ERROR_TYPE_SEGMENTSEDITOR_INSUFFICIENT_RICE =
  "ERROR_TYPE_SEGMENTSEDITOR_INSUFFICIENT_RICE";

const CardEditorKit = ({
  pathPost,
  callBackAfterCreate,
  displayDropDownAudience = false,
  data = null,
  disabled = false,
  // 字数制限を設けるならnullでなくnumberを入れる
  numCharacterLimit = null,
}) => {
  const { text, textRealTime, setTextRealTime, resetTextArea } =
    useEditorSimple();

  const {
    // currentHitPoints,
    // textToDisplay,
    fluctuateHitPointChunkByChunk,
    // hpMessage,
  } = useHitPointBar();

  const {
    initialOption,
    audienceOptions,
    selectedOption,
    selectedValue,
    isDisabled,
    dropDownOnChangeHandler,
  } = useDropDownAudience();

  // const _data = useMemo(() => {
  //   const newData = { ...data };
  //   if (displayDropDownAudience) {
  //     newData.audience = selectedValue;
  //   }
  //   return newData;
  // }, [data, displayDropDownAudience, selectedValue]);

  const {
    exceededTheLimit,
    messageAreaCharacterLimit,
    messageExceededCharacterLimit,
  } = useAreaCharacterLimit(text, numCharacterLimit);

  const _disabled = useMemo(() => {
    if (disabled) {
      return true;
    }
    if (isDisabled) {
      return true;
    }
    return false;
  }, [disabled, isDisabled]);

  const disabled_buttonEditorSimple = useMemo(() => {
    if (exceededTheLimit) {
      return true;
    }
    return false;
  }, [exceededTheLimit]);

  const {
    segmentObjs,

    setSegmentObjs,

    atLeastOneSegmentObjExists,
    // toggleBetweenOpenAndClose,
    openSegmentsEditor,
    closeSegmentsEditor,

    segmentsEditorIsOpen,
    // setSegmentsEditorIsOpen,

    segmentsEditingHistories,
    historyIsOpen,
    toggleBetweenOpenAndCloseAtHistory,
    closeHistory,
    updateSegmentObj,
    toggleSegmentStrType,
    translating,
    hasErrorTranslating,
    getTranslation,
    textBySegmentObjs,
    applyToTextRealTime,
    errorTypeSegmentsEditor,
  } = useSegmentsEditor({ text, setTextRealTime });

  const _data = useMemo(() => {
    const newData = { ...data, contentStr: textBySegmentObjs };
    if (displayDropDownAudience) {
      newData.audience = selectedValue;
    }
    if (segmentObjs) {
      newData.segmentObjs = segmentObjs;
    }
    return newData;
  }, [
    data,
    displayDropDownAudience,
    selectedValue,
    segmentObjs,
    textBySegmentObjs,
  ]);

  const {
    createObject,
    sending,
    haveSendingError,
    sendingStatus,
    restrictedUntil,
  } = useCreateContent({ funcAfterSuccess: resetTextArea });

  const { languagePlusAndMinusAreTheSame } = useMe();

  const _callback = useCallback(async () => {
    // languagePlusAndMinusAreTheSameだったらポイント計算を行わない（行ってもいいけど、エンジョイ勢向けにあえてやらない）
    if (!languagePlusAndMinusAreTheSame && fluctuateHitPointChunkByChunk) {
      fluctuateHitPointChunkByChunk(textBySegmentObjs);
      // fluctuateHitPointChunkByChunk(text);
    }

    if (callBackAfterCreate) {
      callBackAfterCreate(textBySegmentObjs);
      // callBackAfterCreate(text);
    }
  }, [
    textBySegmentObjs,
    callBackAfterCreate,
    fluctuateHitPointChunkByChunk,
    languagePlusAndMinusAreTheSame,
  ]);

  const [previewing, setPreviewing] = useState(false);

  const createMessage = useCallback(async () => {
    await createObject({
      pathPost,
      // data: dataEditorSimple,
      data: _data,
      callback: _callback,
    });
    closeSegmentsEditor();
    setPreviewing(false);
  }, [_callback, createObject, _data, pathPost, closeSegmentsEditor]);

  const onClickHandlerEditorSimple = useCallback(async () => {
    await createMessage();

    // if (languagePlusAndMinusAreTheSame) {
    //   // SegmentsEditorを開く必要が無いのでそのまま送る
    //   await createMessage();
    //   return;
    // }

    // if (segmentsEditorIsOpen && previewing) {
    //   closeSegmentsEditor();
    //   setPreviewing(false);
    // } else {
    //   openSegmentsEditor();
    //   setPreviewing(true);
    // }
  }, [
    // closeSegmentsEditor,
    // openSegmentsEditor,
    // segmentsEditorIsOpen,
    // previewing,
    // languagePlusAndMinusAreTheSame,
    createMessage,
  ]);

  useNotificationEditorSimple(haveSendingError, sendingStatus, restrictedUntil);

  return (
    <div className={classes.CardEditorKit}>
      <EditorSimple
        // text={text}
        textRealTime={textRealTime}
        setTextRealTime={setTextRealTime}
        resetTextArea={resetTextArea}
        // pathPost={pathPost}
        // disabled={disabled}
        disabled={_disabled}
        disabled_buttonEditorSimple={
          segmentsEditorIsOpen || disabled_buttonEditorSimple
        }
        // callBackAfterCreate={_callback}
        // data={_data}

        sending={sending}
        // createMessage={createMessage}
        onButtonClick={onClickHandlerEditorSimple}
      />

      {!languagePlusAndMinusAreTheSame && (
        <SegmentsEditor
          segmentObjs={segmentObjs}
          setSegmentObjs={setSegmentObjs}
          atLeastOneSegmentObjExists={atLeastOneSegmentObjExists}
          // toggleBetweenOpenAndClose={toggleBetweenOpenAndClose}
          openSegmentsEditor={openSegmentsEditor}
          closeSegmentsEditor={closeSegmentsEditor}
          segmentsEditorIsOpen={segmentsEditorIsOpen}
          segmentsEditingHistories={segmentsEditingHistories}
          historyIsOpen={historyIsOpen}
          toggleBetweenOpenAndCloseAtHistory={
            toggleBetweenOpenAndCloseAtHistory
          }
          closeHistory={closeHistory}
          updateSegmentObj={updateSegmentObj}
          toggleSegmentStrType={toggleSegmentStrType}
          translating={translating}
          hasErrorTranslating={hasErrorTranslating}
          errorTypeSegmentsEditor={errorTypeSegmentsEditor}
          getTranslation={getTranslation}
          applyToTextRealTime={applyToTextRealTime}
          createMessage={createMessage}
          previewing={previewing}
          setPreviewing={setPreviewing}
        />
      )}

      {displayDropDownAudience && audienceOptions ? (
        <DropDown
          selectedOption={selectedOption}
          dropDownItems={audienceOptions}
          initialOption={initialOption}
          dropDownOnChangeHandler={dropDownOnChangeHandler}
          labelDropDown={"audience"}
          // isDisabled={isDisabled}
          isDisabled={_disabled}
        />
      ) : null}

      {typeof numCharacterLimit === "number" ? (
        <div className={classes.CardEditorKit__bottom}>
          {/* {false ? (
            // riceは当面非表示中
            <div className={classes.wrapperCardMyRice}>
              <CardMyRice className={classes.CardMyRice} />
            </div>
          ) : null} */}
          {typeof numCharacterLimit === "number" ? (
            <AreaCharacterLimit
              messageAreaCharacterLimit={messageAreaCharacterLimit}
              messageExceededCharacterLimit={messageExceededCharacterLimit}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CardEditorKit;

// const SEGMENT_STR_TYPE_ORIGINAL = "SEGMENT_STR_TYPE_ORIGINAL";
// const SEGMENT_STR_TYPE_TRANSLATED = "SEGMENT_STR_TYPE_TRANSLATED";

const useSegmentsEditor = ({ text, setTextRealTime }) => {
  const [segmentsEditorIsOpen, setSegmentsEditorIsOpen] = useState(false);

  // textが書き換えられると全てリセット
  useEffect(() => {
    setSegmentsEditorIsOpen(false);
  }, [text]);

  const segmentStrs = useMemo(() => {
    return getSegments({ str: text });
  }, [text]);

  // textが書き換えられると全てリセット
  const [segmentObjs, setSegmentObjs] = useState([]);
  useEffect(() => {
    if (!Array.isArray(segmentStrs)) {
      return;
    }

    setSegmentObjs(() => {
      const newSegmentObjs = segmentStrs.map((segmentStr) => {
        return {
          segmentStrOriginal: segmentStr,
          segmentStrTranslated: null,
          segmentStrType: SEGMENT_STR_TYPE_ORIGINAL,
        };
      });

      return newSegmentObjs;
    });
  }, [segmentStrs]);

  const atLeastOneSegmentObjExists = useMemo(() => {
    return Array.isArray(segmentObjs) && 0 < segmentObjs.length;
  }, [segmentObjs]);

  const toggleBetweenOpenAndClose = useCallback(() => {
    if (atLeastOneSegmentObjExists) {
      setSegmentsEditorIsOpen((prev) => !prev);
    } else {
      setSegmentsEditorIsOpen(false);
    }
  }, [atLeastOneSegmentObjExists]);
  const openSegmentsEditor = useCallback(() => {
    if (atLeastOneSegmentObjExists) {
      setSegmentsEditorIsOpen(true);
    }
  }, [atLeastOneSegmentObjExists]);
  const closeSegmentsEditor = useCallback(() => {
    setSegmentsEditorIsOpen(false);
  }, []);

  const [segmentsEditingHistories, setSegmentsEditingHistory] = useState([]);
  const [historyIsOpen, setHistoryIsOpen] = useState(false);
  const toggleBetweenOpenAndCloseAtHistory = useCallback(() => {
    setHistoryIsOpen((prev) => !prev);
  }, []);
  const closeHistory = useCallback(() => {
    setHistoryIsOpen(false);
  }, []);

  // editorが閉じたらhistoryも閉ざしておく
  useEffect(() => {
    if (!segmentsEditorIsOpen) {
      setHistoryIsOpen(false);
    }
  }, [segmentsEditorIsOpen]);

  const registerNewHistory = useCallback((newSegmentObjs) => {
    if (Array.isArray(newSegmentObjs) && 0 < newSegmentObjs.length) {
      // 履歴を記録
      setSegmentsEditingHistory((prevSegmentsEditingHistory) => {
        const newHistory = [[...newSegmentObjs]];
        if (
          Array.isArray(prevSegmentsEditingHistory) &&
          0 < prevSegmentsEditingHistory.length
        ) {
          const prevHistoryCopied = [...prevSegmentsEditingHistory];
          for (const aHistory of prevHistoryCopied) {
            newHistory.push([...aHistory]);
          }
        }

        return newHistory;
      });
    }
  }, []);

  // あるindexにあるsegmentObjを更新する
  const updateSegmentObj = useCallback(
    (options = {}) => {
      const { indexInSegmentObjs, dataForOverwriting } = options;
      if (!Array.isArray(segmentObjs)) {
        return;
      }
      if (!dataForOverwriting) {
        return;
      }

      const newSegmentObjs = segmentObjs.map(
        (segmentObj, _indexInSegmentObjs) => {
          if (!segmentObj) {
            return segmentObj;
          }

          if (_indexInSegmentObjs === indexInSegmentObjs) {
            const newSegmentObj = {
              ...segmentObj,
              ...dataForOverwriting,
            };
            return newSegmentObj;
          } else {
            return segmentObj;
          }
        }
      );
      setSegmentObjs(newSegmentObjs);
      registerNewHistory(newSegmentObjs);
    },
    [segmentObjs, registerNewHistory]
  );

  // あるindexにあるsegmentObjのsegmentStrTypeを切り替える
  const toggleSegmentStrType = useCallback(
    (indexInSegmentObjs) => {
      if (!Array.isArray(segmentObjs)) {
        return;
      }

      const newSegmentObjs = segmentObjs.map(
        (segmentObj, _indexInSegmentObjs) => {
          if (!segmentObj) {
            return segmentObj;
          }

          if (_indexInSegmentObjs === indexInSegmentObjs) {
            const newSegmentStrType =
              segmentObj.segmentStrType === SEGMENT_STR_TYPE_ORIGINAL
                ? SEGMENT_STR_TYPE_TRANSLATED
                : SEGMENT_STR_TYPE_ORIGINAL;
            if (newSegmentStrType === SEGMENT_STR_TYPE_TRANSLATED) {
              const segmentStrTranslated = segmentObj.segmentStrTranslated;
              //  未翻訳なのでtoggleしない
              if (!segmentStrTranslated) {
                return segmentObj;
              }
            }
            const newSegmentObj = {
              ...segmentObj,
              segmentStrType: newSegmentStrType,
            };
            return newSegmentObj;
          } else {
            return segmentObj;
          }
        }
      );
      setSegmentObjs(newSegmentObjs);
      registerNewHistory(newSegmentObjs);
    },
    [segmentObjs, registerNewHistory]
  );

  const refTranslationDictionary = useRef({});
  const [translating, setTranslating] = useState(false);
  const [hasErrorTranslating, setHasErrorTranslating] = useState(false);
  const [errorTypeSegmentsEditor, setErrorTypeSegmentsEditor] = useState(null);
  const getTranslation = useCallback(
    async (options = {}) => {
      const { text, signal = null } = options;

      if (translating) {
        return;
      }
      // 何も入力されてないなら特に何もせず戻る
      if (!text || text.replace("\n", "") === "") {
        return;
      }

      const translationDictionary = refTranslationDictionary.current;
      const pastTranslation = translationDictionary[text];

      if (pastTranslation) {
        return pastTranslation;
      }

      setTranslating(true);

      try {
        const pathPost = `messages/middleware_translate`;

        const res = await postData(null, { text }, pathPost, signal);

        const textTranslated = res?.data?.data?.data;

        setHasErrorTranslating(false);

        if (refTranslationDictionary.current) {
          // 日→英、英→日両方登録
          refTranslationDictionary.current[text] = textTranslated;
          refTranslationDictionary.current[textTranslated] = text;
        }

        return textTranslated;
      } catch (err) {
        const errorMessage = err?.response?.data?.data?.data?.message;
        switch (errorMessage) {
          case ERROR_MESSAGE_FREEUSERS_TRANSLATION_LIMIT:
            setErrorTypeSegmentsEditor(
              ERROR_TYPE_SEGMENTSEDITOR_REACHED_FREE_LIMIT
            );
            break;
          case ERROR_MESSAGE_ALL_TRANSLATION_LIMIT:
            setErrorTypeSegmentsEditor(
              ERROR_TYPE_SEGMENTSEDITOR_REACHED_ALL_LIMIT
            );
            break;

          case ERROR_MESSAGE_INSUFFICIENT_RICE:
            setErrorTypeSegmentsEditor(
              ERROR_TYPE_SEGMENTSEDITOR_INSUFFICIENT_RICE
            );
            break;
          default:
        }

        // if (errorMessage === ERROR_MESSAGE_FREEUSERS_TRANSLATION_LIMIT) {
        //   setErrorTypeSegmentsEditor(
        //     ERROR_TYPE_SEGMENTSEDITOR_REACHED_FREE_LIMIT
        //   );
        // }

        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
        setHasErrorTranslating(true);
      } finally {
        setTranslating(false);
      }
    },
    [translating]
  );

  const textBySegmentObjs = useMemo(() => {
    // const newSegments = segmentObjs.map((segmentObj) => {
    //   const segmentStrOriginal = segmentObj.segmentStrOriginal;
    //   const segmentStrTranslated = segmentObj.segmentStrTranslated;
    //   const segmentStrType = segmentObj.segmentStrType;
    //   if (segmentStrType === SEGMENT_STR_TYPE_ORIGINAL) {
    //     return segmentStrOriginal;
    //   } else {
    //     return segmentStrTranslated;
    //   }
    // });
    // if (!Array.isArray(newSegments)) {
    //   return;
    // }
    // return newSegments.join("");
    return getTextBySegmentObjs({ segmentObjs });
  }, [segmentObjs]);

  const applyToTextRealTime = useCallback(() => {
    // const newSegments = segmentObjs.map((segmentObj) => {
    //   const segmentStrOriginal = segmentObj.segmentStrOriginal;
    //   const segmentStrTranslated = segmentObj.segmentStrTranslated;
    //   const segmentStrType = segmentObj.segmentStrType;

    //   if (segmentStrType === SEGMENT_STR_TYPE_ORIGINAL) {
    //     return segmentStrOriginal;
    //   } else {
    //     return segmentStrTranslated;
    //   }
    // });
    // if (!Array.isArray(newSegments)) {
    //   return;
    // }
    // const newText = newSegments.join("");
    // if (typeof newText !== "string") {
    //   return;
    // }
    if (typeof textBySegmentObjs !== "string") {
      return;
    }
    setTextRealTime(textBySegmentObjs);
  }, [setTextRealTime, textBySegmentObjs]);

  return {
    segmentObjs,
    setSegmentObjs,
    atLeastOneSegmentObjExists,
    toggleBetweenOpenAndClose,
    openSegmentsEditor,
    closeSegmentsEditor,
    segmentsEditorIsOpen,
    setSegmentsEditorIsOpen,

    segmentsEditingHistories,

    historyIsOpen,
    toggleBetweenOpenAndCloseAtHistory,
    closeHistory,
    updateSegmentObj,
    toggleSegmentStrType,
    translating,
    hasErrorTranslating,
    getTranslation,
    textBySegmentObjs,
    applyToTextRealTime,
    errorTypeSegmentsEditor,
  };
};

const SegmentsEditor = ({
  segmentObjs,

  setSegmentObjs,

  atLeastOneSegmentObjExists,
  // toggleBetweenOpenAndClose,
  openSegmentsEditor,
  closeSegmentsEditor,
  segmentsEditorIsOpen,

  segmentsEditingHistories,
  historyIsOpen,
  toggleBetweenOpenAndCloseAtHistory,
  closeHistory,
  updateSegmentObj,
  toggleSegmentStrType,
  translating,
  hasErrorTranslating,
  errorTypeSegmentsEditor,
  getTranslation,

  applyToTextRealTime,
  createMessage,
  previewing,
  setPreviewing,
}) => {
  return (
    <div className={classes.SegmentsEditor}>
      <div className={classes.SegmentsEditor__buttons}>
        {segmentsEditorIsOpen ? (
          <Fragment>
            {historyIsOpen ? null : (
              <Fragment>
                {!previewing && (
                  <Fragment>
                    <ButtonToCloseSegmentsEditor
                      closeSegmentsEditor={closeSegmentsEditor}
                      translating={translating}
                    />
                    {/* 強制非表示中 */}
                    {0 === 1 && (
                      <ButtonApplyToTextRealTime
                        applyToTextRealTime={applyToTextRealTime}
                        translating={translating}
                      />
                    )}
                  </Fragment>
                )}

                <ButtonPreview
                  previewing={previewing}
                  translating={translating}
                  setPreviewing={setPreviewing}
                />

                {previewing && (
                  <ButtonSendFromSegmentsEditor
                    translating={translating}
                    createMessage={createMessage}
                  />
                )}
              </Fragment>
            )}

            {/* 強制非表示中 */}
            {0 === 1 && (
              <ButtonHistory
                historyIsOpen={historyIsOpen}
                toggleBetweenOpenAndCloseAtHistory={
                  toggleBetweenOpenAndCloseAtHistory
                }
              />
            )}
          </Fragment>
        ) : (
          <ButtonToOpenSegmentsEditor
            atLeastOneSegmentObjExists={atLeastOneSegmentObjExists}
            openSegmentsEditor={openSegmentsEditor}
            translating={translating}
          />
        )}
      </div>

      {segmentsEditorIsOpen ? (
        <Fragment>
          <div className={classes.AreaEditor}>
            {historyIsOpen && (
              <AreaHistories
                setSegmentObjs={setSegmentObjs}
                segmentsEditingHistories={segmentsEditingHistories}
                closeHistory={closeHistory}
              />
            )}

            {previewing ? (
              <AreaPreviewOfSegmentsEditor segmentObjs={segmentObjs} />
            ) : (
              <AreaSegmentsEditor
                segmentObjs={segmentObjs}
                updateSegmentObj={updateSegmentObj}
                toggleSegmentStrType={toggleSegmentStrType}
                getTranslation={getTranslation}
                hasErrorTranslating={hasErrorTranslating}
              />
            )}
          </div>
        </Fragment>
      ) : null}

      <MessageSegmentsEditor
        hasErrorTranslating={hasErrorTranslating}
        errorTypeSegmentsEditor={errorTypeSegmentsEditor}
      />
    </div>
  );
};

const MessageSegmentsEditor = ({
  hasErrorTranslating,
  errorTypeSegmentsEditor,
}) => {
  // const { hasRicePointsForTranslation } = useMyRice();
  const { hasRicePointsForTranslation } = useRiceRead();

  const messageSegmentsEditor = useMemo(() => {
    if (
      errorTypeSegmentsEditor === ERROR_TYPE_SEGMENTSEDITOR_REACHED_FREE_LIMIT
    ) {
      return "無料翻訳の上限に達してしまったみたい😭";
    }
    if (
      errorTypeSegmentsEditor === ERROR_TYPE_SEGMENTSEDITOR_REACHED_ALL_LIMIT
    ) {
      return "翻訳サーバーがダウンしました。";
    }

    if (hasErrorTranslating) {
      if (
        // 強制非表示中
        1 === 0 &&
        (errorTypeSegmentsEditor ===
          ERROR_TYPE_SEGMENTSEDITOR_INSUFFICIENT_RICE ||
          // hasRicePointsForTranslationがnullの時にメッセージが出ないように「===false」
          hasRicePointsForTranslation === false)
      ) {
        return "翻訳に使うRiceが足りないみたい😭";
      }
      return "エラーが発生しました。";
    }
  }, [
    hasErrorTranslating,
    hasRicePointsForTranslation,
    errorTypeSegmentsEditor,
  ]);

  return (
    <Fragment>
      {typeof messageSegmentsEditor === "string" ? (
        <div className={classes.MessageSegmentsEditor}>
          <p className={classes.MessageSegmentsEditor__text}>
            {messageSegmentsEditor}
          </p>

          {
            // 強制非表示中
            1 === 0 &&
            // hasRicePointsForTranslationがnullの時にメッセージが出ないように「===false」
            (errorTypeSegmentsEditor ===
              ERROR_TYPE_SEGMENTSEDITOR_INSUFFICIENT_RICE ||
              hasRicePointsForTranslation === false) ? (
              <ButtonJump
                label={"Riceを手に入れて制限を解除する🤩"}
                path={"/rice"}
              />
            ) : null
          }

          {errorTypeSegmentsEditor ===
            ERROR_TYPE_SEGMENTSEDITOR_REACHED_FREE_LIMIT && (
            <ButtonJump
              label={"アップグレードして制限を解除する🤩"}
              path={"/upgrade"}
              className={classes.MessageSegmentsEditor_buttonUpgrade}
            />
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

const ButtonToOpenSegmentsEditor = ({
  // segmentsEditorIsOpen,
  atLeastOneSegmentObjExists,
  // toggleBetweenOpenAndClose,
  openSegmentsEditor,
  translating,
}) => {
  const { isoCodeGoogles } = useMyLanguageRead();
  const { me } = useMe();
  const nameLanguagePlus = useMemo(() => {
    const isoCodeGoogle = me?.languagePlus?.isoCodeGoogle;
    const languagePlusInMyLanguage = getObjectByKeyValuePairFromObjectArray(
      "code",
      isoCodeGoogle,
      isoCodeGoogles
    );
    return languagePlusInMyLanguage?.name;
  }, [isoCodeGoogles, me]);

  const onClickHandler = useCallback(() => {
    if (openSegmentsEditor) {
      openSegmentsEditor();
    }
  }, [openSegmentsEditor]);

  const disabled = useMemo(() => {
    if (translating) {
      return true;
    }
    const noObjs = !atLeastOneSegmentObjExists;
    if (noObjs) {
      return true;
    }
    return false;
  }, [translating, atLeastOneSegmentObjExists]);
  return (
    <div className={classes.ButtonToOpenSegmentsEditor}>
      <ButtonBasic
        className={classes.ButtonToOpenSegmentsEditor__Button}
        onClick={onClickHandler}
        disabled={disabled}
      >
        <p>{`日本語と${
          nameLanguagePlus ? nameLanguagePlus : "外国語"
        }がMixされた文をmakeする😎`}</p>
        {/* <p>日本語とEnglishがMixされた文をmakeする😎</p> */}
      </ButtonBasic>
    </div>
  );
};
const ButtonToCloseSegmentsEditor = ({
  // segmentsEditorIsOpen,
  // atLeastOneSegmentObjExists,
  // toggleBetweenOpenAndClose,
  closeSegmentsEditor,
  translating,
}) => {
  const onClickHandler = useCallback(() => {
    if (closeSegmentsEditor) {
      closeSegmentsEditor();
    }
  }, [closeSegmentsEditor]);

  const disabled = useMemo(() => {
    if (translating) {
      return true;
    }
    return false;
  }, [translating]);
  return (
    <div className={classes.ButtonToCloseSegmentsEditor}>
      <ButtonBasic onClick={onClickHandler} disabled={disabled}>
        <p>閉じる</p>
      </ButtonBasic>
    </div>
  );
};
const ButtonHistory = ({
  historyIsOpen,
  toggleBetweenOpenAndCloseAtHistory,
}) => {
  const onClickHandler = useCallback(() => {
    if (toggleBetweenOpenAndCloseAtHistory) {
      toggleBetweenOpenAndCloseAtHistory();
    }
  }, [toggleBetweenOpenAndCloseAtHistory]);
  return (
    <ButtonBasic onClick={onClickHandler}>
      <p>{historyIsOpen ? "履歴を閉じる" : "履歴を見る"}</p>
    </ButtonBasic>
  );
};

const ButtonApplyToTextRealTime = ({ applyToTextRealTime, translating }) => {
  const onClickHandler = useCallback(() => {
    if (applyToTextRealTime) {
      applyToTextRealTime();
    }
  }, [applyToTextRealTime]);

  return (
    <ButtonBasic onClick={onClickHandler} disabled={translating}>
      ↑反映する！
    </ButtonBasic>
  );
};

const ButtonPreview = ({ previewing, translating, setPreviewing }) => {
  const onClickHandler = useCallback(() => {
    setPreviewing((prev) => !prev);
  }, [setPreviewing]);

  return (
    <ButtonBasic
      onClick={onClickHandler}
      disabled={translating}
      className={`${classes.ButtonPreview} ${
        previewing ? null : classes.ButtonPreview_highLighted
      }`}
    >
      <p>{previewing ? "戻る" : "送信準備"}</p>
    </ButtonBasic>
  );
};

const TEXT_ButtonSendFromSegmentsEditor = "送信する!!";
const ButtonSendFromSegmentsEditor = ({ translating, createMessage }) => {
  const onClickHandler = useCallback(() => {
    if (createMessage) {
      createMessage();
    }
  }, [createMessage]);

  return (
    <ButtonBasic
      onClick={onClickHandler}
      disabled={translating}
      className={classes.ButtonSendFromSegmentsEditor}
    >
      {TEXT_ButtonSendFromSegmentsEditor}
    </ButtonBasic>
  );
};

const AreaSegmentsEditor = ({
  segmentObjs,

  updateSegmentObj,
  toggleSegmentStrType,
  getTranslation,
  hasErrorTranslating,
}) => {
  return (
    <Fragment>
      {Array.isArray(segmentObjs) ? (
        <Fragment>
          {segmentObjs.map((segmentObj, indexInSegmentObjs) => {
            return (
              <Segment
                key={uuidv4()}
                segmentObj={segmentObj}
                indexInSegmentObjs={indexInSegmentObjs}
                updateSegmentObj={updateSegmentObj}
                toggleSegmentStrType={toggleSegmentStrType}
                getTranslation={getTranslation}
                hasErrorTranslating={hasErrorTranslating}
              />
            );
          })}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const Segment = ({
  segmentObj,
  indexInSegmentObjs,
  updateSegmentObj,
  toggleSegmentStrType,
  getTranslation,
  hasErrorTranslating,
}) => {
  const segmentStrType = useMemo(() => {
    return segmentObj?.segmentStrType;
  }, [segmentObj]);
  const segmentStrOriginal = useMemo(() => {
    return segmentObj?.segmentStrOriginal;
  }, [segmentObj]);
  const segmentStrTranslated = useMemo(() => {
    return segmentObj?.segmentStrTranslated;
  }, [segmentObj]);

  const getTranslationOfThisSegmentStr = useCallback(async () => {
    const translated = await getTranslation({ text: segmentStrOriginal });
    if (!translated) {
      return;
    }
    updateSegmentObj({
      indexInSegmentObjs,
      dataForOverwriting: {
        segmentStrTranslated: translated,
        segmentStrType: SEGMENT_STR_TYPE_TRANSLATED,
      },
    });
  }, [
    getTranslation,
    indexInSegmentObjs,
    segmentStrOriginal,
    updateSegmentObj,
  ]);

  const onClickHandler = useCallback(() => {
    if (segmentStrTranslated) {
      if (toggleSegmentStrType) {
        toggleSegmentStrType(indexInSegmentObjs);
      }
    } else {
      if (getTranslationOfThisSegmentStr) {
        getTranslationOfThisSegmentStr();
      }
    }
  }, [
    getTranslationOfThisSegmentStr,
    indexInSegmentObjs,
    segmentStrTranslated,
    toggleSegmentStrType,
  ]);

  const {
    displayTextTooltip,
    onMouseEnterHandlerTooltip,
    onMouseLeaveHandlerTooltip,
  } = useTooltip();

  const { hasRicePointsForTranslation } = useRiceRead();
  const disabled = useMemo(() => {
    if (
      hasErrorTranslating ||
      // 強制非表示中
      (1 === 0 && !hasRicePointsForTranslation)
    ) {
      return true;
    }
    return false;
  }, [hasRicePointsForTranslation, hasErrorTranslating]);

  return (
    <div className={classes.Segment} onClick={disabled ? null : onClickHandler}>
      <p
        className={`${classes.Segment__segmentStr} ${
          disabled ? classes.Segment__segmentStr_disabled : ""
        }`}
        onMouseEnter={onMouseEnterHandlerTooltip}
        onMouseLeave={onMouseLeaveHandlerTooltip}
      >
        {segmentStrType === SEGMENT_STR_TYPE_ORIGINAL
          ? segmentStrOriginal
          : segmentStrTranslated}
      </p>
      <Tooltip
        displayTextTooltip={displayTextTooltip}
        text={
          !hasErrorTranslating
            ? "クリックで置き換え" ||
              // 強制非表示中
              (hasRicePointsForTranslation
                ? "クリックで置き換え（初回1Rice消費）"
                : "Riceが足りません😭")
            : null
        }
      />
    </div>
  );
};

const AreaPreviewOfSegmentsEditor = ({ segmentObjs }) => {
  const pseudoMessageObj = useMemo(() => {
    return { segmentObjs };
  }, [segmentObjs]);

  return (
    <div className={classes.AreaPreviewOfSegmentsEditor}>
      <TextsAreaPreview pseudoMessageObj={pseudoMessageObj} />
      {/* <CardMessageText message={pseudoMessageObj} /> */}
    </div>
  );
};

const TextsAreaPreview = ({ pseudoMessageObj }) => {
  return (
    <div className={classes.TextsAreaPreview}>
      <p className={classes.TextsAreaPreview__previewStr}>プレビュー</p>

      <CardMessageText message={pseudoMessageObj} />

      <div className={classes.TextsAreaPreview__explanation}>
        <span className={classes.TextsAreaPreview__explanation__normalText}>
          当社の
        </span>
        <span
          className={classes.link}
          onClick={() => {
            openNewTab("/terms-of-service");
          }}
        >
          利用規約
        </span>
        <span className={classes.TextsAreaPreview__explanation__normalText}>
          、
        </span>
        <span
          className={classes.link}
          onClick={() => {
            openNewTab("/privacy-policy");
          }}
        >
          プライバシーポリシー
        </span>
        <span className={classes.TextsAreaPreview__explanation__normalText}>
          、
        </span>
        <span
          className={classes.link}
          onClick={() => {
            openNewTab("/specified-commercial-transactions-act");
          }}
        >
          特定商取引法に基づく表示
        </span>
        <span className={classes.TextsAreaPreview__explanation__normalText}>
          に同意する場合は「{TEXT_ButtonSendFromSegmentsEditor}
          」と書かれたボタンをクリックして送信して下さい。
        </span>
      </div>
    </div>
  );
};

const AreaHistories = ({
  setSegmentObjs,
  segmentsEditingHistories,
  closeHistory,
}) => {
  return (
    <Fragment>
      {Array.isArray(segmentsEditingHistories) &&
      0 < segmentsEditingHistories.length ? (
        segmentsEditingHistories.map((segmentsEditingHistory) => {
          return (
            <History
              key={uuidv4()}
              setSegmentObjs={setSegmentObjs}
              segmentsEditingHistory={segmentsEditingHistory}
              closeHistory={closeHistory}
            />
          );
        })
      ) : (
        <p>履歴はありません。</p>
      )}
    </Fragment>
  );
};

const History = ({ setSegmentObjs, segmentsEditingHistory, closeHistory }) => {
  const onClickHandler = useCallback(() => {
    if (!setSegmentObjs) {
      return;
    }
    if (!Array.isArray(segmentsEditingHistory)) {
      return;
    }
    setSegmentObjs(segmentsEditingHistory);
    if (closeHistory) {
      closeHistory();
    }
  }, [segmentsEditingHistory, setSegmentObjs, closeHistory]);

  const textInHistory = useMemo(() => {
    if (!Array.isArray(segmentsEditingHistory)) {
      return;
    }
    const arrayOfTexts = segmentsEditingHistory.map((segmentObj) => {
      // for (const segmentObj of segmentObjs) {
      if (!segmentObj) {
        return "";
      }
      const { segmentStrOriginal, segmentStrTranslated, segmentStrType } =
        segmentObj;
      if (segmentStrType === SEGMENT_STR_TYPE_ORIGINAL) {
        if (typeof segmentStrOriginal === "string") {
          return segmentStrOriginal;
        }
      } else {
        if (typeof segmentStrTranslated === "string") {
          return segmentStrTranslated;
        }
      }
      // }

      return "";
    });
    return Array.isArray(arrayOfTexts) ? arrayOfTexts.join("") : "";
  }, [segmentsEditingHistory]);

  return (
    <div className={classes.Segment} onClick={onClickHandler}>
      <p className={classes.Segment__segmentStr}>{textInHistory}</p>
    </div>
  );
};

const useAreaCharacterLimit = (text, numCharacterLimit) => {
  const textLength = useMemo(() => {
    return text ? text.length : 0;
  }, [text]);
  const exceededTheLimit = useMemo(() => {
    return typeof textLength === "number" && characterLimit_AIChat < textLength;
  }, [textLength]);
  const messageAreaCharacterLimit = useMemo(() => {
    return `${textLength} / ${numCharacterLimit}字`;
  }, [textLength, numCharacterLimit]);
  const messageExceededCharacterLimit = useMemo(() => {
    return exceededTheLimit
      ? `制限字数を${textLength - numCharacterLimit}文字オーバーしています。`
      : "";
  }, [textLength, numCharacterLimit, exceededTheLimit]);

  return {
    exceededTheLimit,
    messageAreaCharacterLimit,
    messageExceededCharacterLimit,
  };
};

const AreaCharacterLimit = ({
  messageAreaCharacterLimit,
  messageExceededCharacterLimit,
}) => {
  return (
    <div className={classes.AreaCharacterLimit}>
      <span className={classes.AreaCharacterLimit__messages}>
        <p className={classes.messageAreaCharacterLimit}>
          {messageAreaCharacterLimit}
        </p>
        <p
          className={`${classes.messageExceededCharacterLimit} ${
            messageExceededCharacterLimit ? classes.exceeded : ""
          }`}
        >
          {messageExceededCharacterLimit}
        </p>
      </span>
    </div>
  );
};

// const PLACEHOLDER_LANGUAGE_PLUS = "{{PLACEHOLDER_LANGUAGE_PLUS}}";
const PLACEHOLDER_LANGUAGE_MINUS = "{{PLACEHOLDER_LANGUAGE_MINUS}}";
const PLACEHOLDER_RESTRICTED_UNTIL = "{{PLACEHOLDER_RESTRICTED_UNTIL}}";
const PLACEHOLDER_GREETING = "{{PLACEHOLDER_GREETING}}";
const PLACEHOLDER_JAPANESE_LIKE_STRING = "{{PLACEHOLDER_JAPANESE_LIKE_STRING}}";

const messsageAboutLimitationTemplate = `HPがゼロになってから２４時間${PLACEHOLDER_LANGUAGE_MINUS}は使えない！😱
（制限解除日時：${PLACEHOLDER_RESTRICTED_UNTIL}）`;
// const messsageAboutLimitationTemplate = `HPがゼロになってから２４時間は${PLACEHOLDER_LANGUAGE_PLUS}しか使えない！😱
// （制限解除日時：${PLACEHOLDER_RESTRICTED_UNTIL}）

// ＜制限中の書き方＞
// NG😭："私は日本人！"
// NG😭："${PLACEHOLDER_GREETING} こんにちは！"
// OK😍："${PLACEHOLDER_GREETING} ${PLACEHOLDER_JAPANESE_LIKE_STRING}"
// `;

const greetings = {
  en: "Hello! I'm Ken!",
  ko: "안녕하세요!",
};
const japaneseLikeStrings = {
  en: "konnichiwa!",
  ko: "곤니치와!",
};

const useNotificationEditorSimple = (
  haveSendingError,
  sendingStatus,
  restrictedUntil
) => {
  const { displayNotificationSuccess, displayNotificationError } =
    useNotificationToast();

  const { me } = useMe();
  const languagePlusCode = useMemo(() => {
    return me?.languagePlus?.isoCodeGoogle;
  }, [me]);
  const languageMinusCode = useMemo(() => {
    return me?.languageMinus?.isoCodeGoogle;
  }, [me]);

  const { getNameOfALanguageInMyLanguage } = useMyLanguageRead();
  const messsageAboutLimitation = useMemo(() => {
    // const nameLanguagePlus = getNameOfALanguageInMyLanguage({
    //   code: languagePlusCode,
    // });
    const nameLanguageMinus = getNameOfALanguageInMyLanguage({
      code: languageMinusCode,
    });
    const greeting = greetings[languagePlusCode];
    const japaneseLikeString = japaneseLikeStrings[languagePlusCode];
    const textRestrictedUntil = `${formatJapaneseTime(restrictedUntil)}`;
    const messageReplaced = messsageAboutLimitationTemplate
      // .replaceAll(PLACEHOLDER_LANGUAGE_PLUS, nameLanguagePlus)
      .replaceAll(PLACEHOLDER_LANGUAGE_MINUS, nameLanguageMinus)
      .replaceAll(PLACEHOLDER_GREETING, greeting)
      .replaceAll(PLACEHOLDER_JAPANESE_LIKE_STRING, japaneseLikeString)
      .replaceAll(PLACEHOLDER_RESTRICTED_UNTIL, textRestrictedUntil);

    return messageReplaced;
  }, [
    getNameOfALanguageInMyLanguage,
    languageMinusCode,
    languagePlusCode,
    restrictedUntil,
  ]);

  useEffect(() => {
    if (haveSendingError) {
      displayNotificationError("エラーが発生しました", {
        autoClose: timeToMilliseconds(30, "second"),
      });
      return;
      // return "エラーが発生しました";
    }

    switch (sendingStatus) {
      case "success":
        // displayNotificationSuccess("投稿成功！", {
        //   autoClose: timeToMilliseconds(1, "second"),
        // });

        return;
      // return "投稿に成功！";

      case "NoHP":
        displayNotificationError(
          // messsageLimitation.replace(
          //   "{{REPLACE}}",
          //   `${formatJapaneseTime(restrictedUntil)}`
          // ),
          messsageAboutLimitation,
          {
            autoClose: timeToMilliseconds(60, "second"),
          }
        );
        return;
      // return `HPがゼロになってから２４時間は日本語が使えない！（制限解除日時：${formatJapaneseTime(
      //   restrictedUntil
      // )}）`;
      default:
    }

    // return null;
  }, [
    displayNotificationSuccess,
    displayNotificationError,
    haveSendingError,
    restrictedUntil,
    sendingStatus,
    messsageAboutLimitation,
  ]);
};
