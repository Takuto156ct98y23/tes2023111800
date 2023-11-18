import { useEffect, useState } from "react";
import useFormElementDropDown from "../useFormElementDropDown";
import { countryCodeVSCities } from "../../../../data/geo/geoConstants";

const useFormElementDropDown_placeInACountry = ({
  fieldPlaceInACountry,
  initialValue_country,
  initialValue_placeInACountry,
  updateFunc,
  country,
}) => {
  // const { optionsDropDown_placeInACountry } = useGeoSetting(
  //   // selectedValue_countryOfResidence
  //   // country

  //   );

  const { optionsDropDown_placeInACountry } =
    useOptionsDropDown_placeInACountry(initialValue_country, country);

  // const optionsDropDown_placeInACountry = useMemo(() => {
  //   if (countryCode) {
  //     const country = getObjectByKeyValuePairFromObjectArray(
  //       "name",
  //       countryCode,
  //       citiesByCountries
  //     );
  //     if (!country) {
  //       return null;
  //     }

  //     const cities = country["cities"];
  //     const options = [
  //       {
  //         value: null,
  //         label: "設定なし",
  //       },
  //     ];
  //     for (const city of cities) {
  //       options.push({
  //         value: city,
  //         label: city,
  //       });
  //     }
  //     return options;
  //   }

  //   return null;
  // }, [countryCode]);

  const {
    initialOption: initialOption_placeInACountry,
    selectedOption: selectedOption_placeInACountry,
    resetSelectedOption: resetSelectedOption_placeInACountry,
    // selectedValue,
    // selectedLabel,
    // isDisabled: isDisabled_placeInACountry,
    dropDownOnChangeHandler: dropDownOnChangeHandler_placeInACountry,
    // enableDropDown,
    // disableDropDown,
    // setIsDisabled,
    updateAValueInDB: updateAValueInDB_placeInACountry,
    messageDropDown: messageDropDown_placeInACountry,
    setMessageDropDown: setMessageDropDown_placeInACountry,
    errorLoading: errorLoading_placeInACountry,
    errorMessage: errorMessage_placeInACountry,

    disabled: disabled_placeInACountry,
  } = useFormElementDropDown({
    field: fieldPlaceInACountry,
    updateFunc,
    valueInitial: initialValue_placeInACountry,
    options: optionsDropDown_placeInACountry,
  });

  useResetPlaceWhenCountryIsChanged(
    country,
    resetSelectedOption_placeInACountry
  );
  // const [previousCountry, setPreviousCountry] = useState(country);
  // useEffect(() => {
  //   console.log("country,previousCountry", country, previousCountry);
  //   if (country) {
  //     if (previousCountry && previousCountry !== country) {
  //       resetSelectedOption_placeInACountry();
  //     }
  //     setPreviousCountry(country);
  //   }
  // }, [country, previousCountry, resetSelectedOption_placeInACountry]);

  return {
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
  };
};
export default useFormElementDropDown_placeInACountry;

const useResetPlaceWhenCountryIsChanged = (
  country,
  resetSelectedOption_placeInACountry
) => {
  const [previousCountry, setPreviousCountry] = useState(country);
  useEffect(() => {
    if (country) {
      if (previousCountry && previousCountry !== country) {
        resetSelectedOption_placeInACountry();
      }
      setPreviousCountry(country);
    }
  }, [country, previousCountry, resetSelectedOption_placeInACountry]);
};

// const useCountryName = (initialValue_placeInACountry, country) => {
//   const [countryCode, setCountryName] = useState(initialValue_placeInACountry);
//   useEffect(() => {
//     if (country) {
//       setCountryName(country);
//     }
//   }, [country]);

//   return { countryCode };
// };
const useOptionsDropDown_placeInACountry = (
  initialValue_country,
  countryCode
) => {
  const [optionsDropDown_placeInACountry, setOptionsDropDown_placeInACountry] =
    useState(getOptions(initialValue_country));

  useEffect(() => {
    if (countryCode) {
      setOptionsDropDown_placeInACountry(getOptions(countryCode));
    }
    // setOptionsDropDown_placeInACountry(getOptions(countryCode));
  }, [countryCode]);

  return { optionsDropDown_placeInACountry };
};

const getOptions = (countryCode) => {
  if (!countryCode) {
    return null;
  }

  const cities = countryCodeVSCities[countryCode];

  const options = [
    {
      value: null,
      label: "設定なし",
    },
  ];

  if (!cities) {
    return options;
  }

  for (const city of cities) {
    const cityCode = city.cityCode;
    const label = city.label;

    options.push({
      value: cityCode,
      label: label,
      // value: city,
      // label: city,
    });
  }

  return options;
};
