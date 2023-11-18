import { useCallback } from "react";
import useFormElementDropDown_country from "./useFormElementDropDown_country";
import useFormElementDropDown_placeInACountry from "./useFormElementDropDown_placeInACountry";

// 国とその地域は連動させる必要がある。それら二つを使うならこのhookを使用。
/*
連動例
・国を変えたらplaceInACountryはreset
・国かplaceInACountryのどちらかを保存したら、両方とも保存
*/
const useFormElementDropDownGeo = ({
  fieldCountry,
  fieldPlaceInACountry,

  updateFunc,
  initialValue_country,
  initialValue_placeInACountry,
}) => {
  const {
    initialOption_country,
    selectedOption_country,
    selectedValue_country,
    dropDownOnChangeHandler_country,
    updateAValueInDB_country,
    messageDropDown_country,
    errorLoading_country,
    errorMessage_country,
    disabled_country,
  } = useFormElementDropDown_country({
    fieldCountry,
    initialValue_country: initialValue_country,
    updateFunc,
  });

  const {
    initialOption_placeInACountry,
    selectedOption_placeInACountry,
    dropDownOnChangeHandler_placeInACountry,
    updateAValueInDB_placeInACountry,
    messageDropDown_placeInACountry,
    setMessageDropDown_placeInACountry,
    errorLoading_placeInACountry,
    errorMessage_placeInACountry,
    disabled_placeInACountry,
    optionsDropDown_placeInACountry,
  } = useFormElementDropDown_placeInACountry({
    fieldPlaceInACountry,
    initialValue_country: initialValue_country,
    initialValue_placeInACountry: initialValue_placeInACountry,
    updateFunc,
    country: selectedValue_country,
  });

  const updateDB_placeInACountry_with_country = useCallback(async () => {
    await updateAValueInDB_country(false);
    await updateAValueInDB_placeInACountry();
  }, [updateAValueInDB_country, updateAValueInDB_placeInACountry]);

  return {
    // country
    initialOption_country,
    selectedOption_country,
    selectedValue_country,
    dropDownOnChangeHandler_country,

    // 国とplaceInACountryを一緒に使うなら基本的に使わない関数（updateDB_placeInACountry_with_countryを使うべし）
    updateAValueInDB_country,

    messageDropDown_country,
    errorLoading_country,
    errorMessage_country,
    disabled_country,

    // placeInACountry
    initialOption_placeInACountry,
    selectedOption_placeInACountry,
    dropDownOnChangeHandler_placeInACountry,

    // 国とplaceInACountryを一緒に使うなら基本的に使わない関数（updateDB_placeInACountry_with_countryを使うべし）
    updateAValueInDB_placeInACountry,

    messageDropDown_placeInACountry,
    setMessageDropDown_placeInACountry,
    errorLoading_placeInACountry,
    errorMessage_placeInACountry,
    disabled_placeInACountry,
    optionsDropDown_placeInACountry,

    // 両方
    updateDB_placeInACountry_with_country,
  };
};

export default useFormElementDropDownGeo;
