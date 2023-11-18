import { useMemo } from "react";
import useMyUserGroups from "../../userGroup/useMyUserGroups";
import useDropDown from "../useDropDown/useDropDown";

const useDropDownAudience = (
  // { value: "63d226bc2ce470f66c268cd7", label: "Myfriends" }等
  valueInitial = null
  // labelInitial = "public"
) => {
  // const { audienceOptions } = useAudienceOptions(valueInitial, labelInitial);
  const { audienceOptions } = useAudienceOptions();

  const {
    initialOption,
    // initialOption,
    selectedOption,
    selectedValue,
    // selectedLabel,
    isDisabled,
    dropDownOnChangeHandler,
    enableDropDown,
    disableDropDown,
    setIsDisabled,
  } = useDropDown(valueInitial, audienceOptions);

  return {
    initialOption,
    // initialOption,
    audienceOptions,
    selectedOption,
    selectedValue,
    // selectedLabel,
    isDisabled,
    dropDownOnChangeHandler,
    enableDropDown,
    disableDropDown,
    setIsDisabled,
  };
};
export default useDropDownAudience;

// const useAudienceOptions = (valueInitial, labelInitial) => {
const useAudienceOptions = () => {
  const { myUserGroups } = useMyUserGroups();

  const audienceOptions = useMemo(() => {
    if (!myUserGroups) {
      return;
    }
    // const audienceOptionsArray = [{ value: valueInitial, label: labelInitial }];
    const audienceOptionsArray = [];

    myUserGroups.forEach((anUserGroup, index) => {
      // 処理用のuserGroupなので除く
      if (
        anUserGroup.type === "chatRoom" ||
        anUserGroup.type === "chatRoomSender"
      ) {
        return;
      }

      const label =
        anUserGroup.type === "onlyMe"
          ? "自分のみ"
          : `${anUserGroup.name} (user group ${
              // keyの重複を避けるため後ろに追記
              index + 1
            })`;

      audienceOptionsArray.push({
        value: anUserGroup.id,
        label: label,
      });
    });

    return audienceOptionsArray;
  }, [myUserGroups]);
  // }, [labelInitial, myUserGroups, valueInitial]);

  return { audienceOptions };
};
