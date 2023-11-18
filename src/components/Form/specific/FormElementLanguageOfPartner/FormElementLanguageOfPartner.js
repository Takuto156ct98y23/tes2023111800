import { useMemo } from "react";
import useMyLanguageRead from "../../../../hooks/myLanguage/useMyLanguageRead";
// import classes from "./FormElementLanguageOfPartner.module.css";
import { getOptionsDropDown } from "../../../../utils/utilsLanguage";
import useFormElementDropDown from "../../../../hooks/form/DropDown/useFormElementDropDown";
import FormElementDropDown from "../../FormElementDropDown/FormElementDropDown";

const FormElementLanguageOfPartner = ({
  chatRoomRandomConfig,
  updateAValueChatRoomRandomConfig,
}) => {
  const field_language = "language";
  const initialValue_language = true
    ? "en"
    : chatRoomRandomConfig && chatRoomRandomConfig[field_language]
    ? chatRoomRandomConfig[field_language]
    : null;

  //   const isoCodeGoogle = language?.isoCodeGoogle;
  const { isoCodeGoogles } = useMyLanguageRead();

  const optionsDropDown_language = useMemo(() => {
    return getOptionsDropDown({ isoCodeGoogles });
  }, [isoCodeGoogles]);

  const {
    initialOption: initialOption_language,
    selectedOption: selectedOption_language,
    // selectedValue,
    // selectedLabel,
    // isDisabled: isDisabled_language,
    dropDownOnChangeHandler: dropDownOnChangeHandler_language,
    // enableDropDown,
    // disableDropDown,
    // setIsDisabled,
    updateAValueInDB: updateAValueInDB_language,
    messageDropDown: messageDropDown_language,
    errorLoading: errorLoading_language,
    errorMessage: errorMessage_language,

    disabled: disabled_language,
  } = useFormElementDropDown({
    field: field_language,
    updateFunc: updateAValueChatRoomRandomConfig,
    valueInitial: initialValue_language,
    options: optionsDropDown_language,
  });

  return (
    <FormElementDropDown
      label={"相手の言語"}
      selectedOption={selectedOption_language}
      optionsDropDown={optionsDropDown_language}
      initialOption={initialOption_language}
      dropDownOnChangeHandler={dropDownOnChangeHandler_language}
      message={
        "相手には何語を話してほしい？🌎\nこの設定は今開発中なので\n完成をお楽しみに😊" ||
        messageDropDown_language
      }
      errorLoading={errorLoading_language}
      errorMessage={errorMessage_language}
      onClick={updateAValueInDB_language}
      disabled={true || disabled_language}
      isAForm={true}
    />
  );
};

export default FormElementLanguageOfPartner;
