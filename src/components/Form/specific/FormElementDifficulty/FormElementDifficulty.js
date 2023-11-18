import { updateMe } from "../../../../api/apiUser";
import { optionsDropDown_difficulty } from "../../../../data/constants/form/dropDownConstants";
import { DIFFICULTY_NORMAL } from "../../../../data/constants/userConstants";
import useFormElementDropDown from "../../../../hooks/form/DropDown/useFormElementDropDown";
// import useMe from "../../../../hooks/user/me/useMe";
import FormElementDropDown from "../../FormElementDropDown/FormElementDropDown";
// import classes from "./FormElementDifficulty.module.css";

const FormElementDifficulty = ({
  chatRoomRandomConfig,
  updateAValueChatRoomRandomConfig,
  activateLinkToUpgradePage = false,
}) => {
  // const { me } = useMe();

  const field_difficulty = "difficulty";
  const initialValue_difficulty = true
    ? // まだ製作中なので、強制的にnormalにしている
      DIFFICULTY_NORMAL
    : chatRoomRandomConfig && chatRoomRandomConfig[field_difficulty]
    ? chatRoomRandomConfig[field_difficulty]
    : null;
  const {
    initialOption: initialOption_difficulty,
    selectedOption: selectedOption_difficulty,
    // selectedValue,
    // selectedLabel,
    // isDisabled: isDisabled_difficulty,
    dropDownOnChangeHandler: dropDownOnChangeHandler_difficulty,
    // enableDropDown,
    // disableDropDown,
    // setIsDisabled,
    updateAValueInDB: updateAValueInDB_difficulty,
    messageDropDown: messageDropDown_difficulty,
    errorLoading: errorLoading_difficulty,
    errorMessage: errorMessage_difficulty,

    disabled: disabled_difficulty,
  } = useFormElementDropDown({
    field: field_difficulty,
    updateFunc: updateMe,
    valueInitial: initialValue_difficulty,
    options: optionsDropDown_difficulty,
  });

  return (
    <FormElementDropDown
      label={"難易度"}
      selectedOption={selectedOption_difficulty}
      optionsDropDown={optionsDropDown_difficulty}
      initialOption={initialOption_difficulty}
      dropDownOnChangeHandler={dropDownOnChangeHandler_difficulty}
      message={
        "語学レベルを設定しよう😁\nこの設定は今開発中なので\n完成をお楽しみに😊" ||
        messageDropDown_difficulty
      }
      errorLoading={errorLoading_difficulty}
      errorMessage={errorMessage_difficulty}
      onClick={updateAValueInDB_difficulty}
      disabled={true || disabled_difficulty}
      isAForm={true}
      activateLinkToUpgradePage={activateLinkToUpgradePage}
    />
  );
};

export default FormElementDifficulty;
