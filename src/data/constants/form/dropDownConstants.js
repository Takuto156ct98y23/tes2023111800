import { range } from "../../../utils/arrayUtils";
import { countryCodeVSCountryName } from "../../geo/geoConstants";
import {
  DIFFICULTY_EASY,
  DIFFICULTY_HARD,
  DIFFICULTY_NORMAL,
  availableAge,
  userGender_female,
  userGender_male,
  userGender_other,
} from "../userConstants";

export const optionsDropDown_gender = [
  {
    value: null,
    label: "設定なし",
  },
  {
    value: userGender_male,
    label: "男性",
  },
  {
    value: userGender_female,
    label: "女性",
  },
  {
    value: userGender_other,
    label: "その他",
  },
];
export const optionsDropDown_difficulty = [
  {
    value: DIFFICULTY_EASY,
    label: "イージー",
  },
  {
    value: DIFFICULTY_NORMAL,
    label: "ノーマル",
  },
  {
    value: DIFFICULTY_HARD,
    label: "ハード",
  },
];

const getLabel = (countryName) => {
  switch (countryName) {
    case "Japan":
      return "日本 / Japan";
    default:
      return countryName;
  }
};

const arrays_CountryCode_And_CountryName = Object.entries(
  countryCodeVSCountryName
);

const getOptionsDropDown_countries = () => {
  const optionsDropDown_countries = [
    {
      value: null,
      label: "設定なし",
    },
    // 重複になるが、利便性のために先頭に追加
    { value: "JP", label: "日本 / Japan" },
    { value: "KR", label: "South Korea" },
  ];
  for (const arr of arrays_CountryCode_And_CountryName) {
    const countryName = arr[1];
    const countryLabel = getLabel(countryName);
    const countryCode = arr[0];
    optionsDropDown_countries.push({
      value: countryCode,
      label: countryLabel,
    });
  }

  return optionsDropDown_countries;
};
export const optionsDropDown_countries = getOptionsDropDown_countries();

const getOptionsDropDown_age = (ageRange = {}) => {
  const { min = 0, max = 150 } = ageRange;

  const ages = range(min, max);

  const options = [{ value: null, label: "設定なし" }];
  for (const age of ages) {
    options.push({ value: age, label: `${age}歳` });
  }

  return options;
};

export const optionsDropDown_age = getOptionsDropDown_age({
  min: availableAge,
});
