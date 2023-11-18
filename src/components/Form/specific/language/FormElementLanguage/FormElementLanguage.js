// import classes from "./FormElementLanguage.module.css";

import { Fragment, useMemo } from "react";
import useMyLanguageRead from "../../../../../hooks/myLanguage/useMyLanguageRead";
import useFormElementDropDown from "../../../../../hooks/form/DropDown/useFormElementDropDown";
import { updateMe } from "../../../../../api/apiUser";
import FormElementDropDown from "../../../FormElementDropDown/FormElementDropDown";
import { reloadPage } from "../../../../../utils/utilsWindow";
import { getOptionsDropDown } from "../../../../../utils/utilsLanguage";

// const codesHead = new Set([
//   "en",
//   "ja",
//   "ko",
//   "th",
//   // 20230718段階ではまだ少数の言語だけしか対応していないため、一時的に中国語はコメントアウトしている。
//   //  "zh", "zh-TW"
// ]);
// const getOptionsDropDown = (isoCodeGoogles, codesToOmit) => {
//   const arrHead = [];
//   const arrTail = [];
//   codesToOmit = new Set(codesToOmit);
//   for (const isoCodeGoogle of isoCodeGoogles) {
//     if (!isoCodeGoogle) {
//       continue;
//     }
//     const { code, name } = isoCodeGoogle;
//     if (codesToOmit.has(code)) {
//       continue;
//     }
//     const anOption = { value: code, label: name };
//     // ユーザーの多い言語は先頭に来るようにする
//     if (codesHead.has(code)) {
//       arrHead.push(anOption);
//     } else {
//       // 20230718段階ではまだ少数の言語だけしか対応していないため、一時的に強制falseにしている
//       if (1 === 0) {
//         arrTail.push(anOption);
//       }
//     }
//   }
//   const optionsDropDown = arrHead.concat(arrTail);
//   return optionsDropDown;
// };

const FormElementLanguage = ({
  label,
  field_language,
  language,
  codesToOmit = null,
}) => {
  const isoCodeGoogle = language?.isoCodeGoogle;
  // const { optionsDropDown_language } = useFormElementLanguage();
  const { isoCodeGoogles } = useMyLanguageRead();

  const optionsDropDown_language = useMemo(() => {
    // if (!Array.isArray(isoCodeGoogles)) {
    //   return;
    // }
    return getOptionsDropDown(
      // isoCodeGoogles, codesToOmit
      { isoCodeGoogles, codesToOmit }
    );
  }, [isoCodeGoogles, codesToOmit]);

  return (
    <Fragment>
      {Array.isArray(optionsDropDown_language) &&
      0 < optionsDropDown_language.length ? (
        <AreaFormElementLanguage
          label={label}
          field_language={field_language}
          initialValue_language={isoCodeGoogle}
          optionsDropDown_language={optionsDropDown_language}
        />
      ) : null}
    </Fragment>
  );
};
export default FormElementLanguage;

// const reloadPage = () => {
//   // 言語設定を反映させるためにページをreload
//   window.location.reload();
// };

const AreaFormElementLanguage = ({
  label,
  field_language,
  initialValue_language,
  optionsDropDown_language,
}) => {
  const {
    initialOption: initialOption_languagePlus,
    selectedOption: selectedOption_languagePlus,
    // selectedValue,
    // selectedLabel,
    // isDisabled: isDisabled_languagePlus,
    dropDownOnChangeHandler: dropDownOnChangeHandler_languagePlus,
    // enableDropDown,
    // disableDropDown,
    // setIsDisabled,
    updateAValueInDB: updateAValueInDB_languagePlus,
    messageDropDown: messageDropDown_languagePlus,
    errorLoading: errorLoading_languagePlus,
    errorMessage: errorMessage_languagePlus,

    disabled: disabled_languagePlus,
  } = useFormElementDropDown({
    field: field_language,
    updateFunc: updateMe,
    valueInitial: initialValue_language,
    options: optionsDropDown_language,
    // 更新を反映するためにページをreload
    callBack: reloadPage,
  });

  return (
    <FormElementDropDown
      label={label}
      selectedOption={selectedOption_languagePlus}
      optionsDropDown={optionsDropDown_language}
      initialOption={initialOption_languagePlus}
      dropDownOnChangeHandler={dropDownOnChangeHandler_languagePlus}
      message={messageDropDown_languagePlus}
      errorLoading={errorLoading_languagePlus}
      errorMessage={errorMessage_languagePlus}
      onClick={updateAValueInDB_languagePlus}
      disabled={disabled_languagePlus}
      isAForm={true}
    />
  );
};
