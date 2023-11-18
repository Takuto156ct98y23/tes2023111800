import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncSelect from "react-select/async";
import { getObjects } from "../../api/apiGeneral";
import debounce from "../../utils/debounce";
import makeAnimated from "react-select/animated";
import { objectArraydeduplicated } from "../../utils/arrayUtils";
// import Arasuzy from "../../components/Arasuzy/Arasuzy";
import CardUser from "../../components/Card/CardUser/CardUser";
import { handleError, isGoodError } from "../../utils/utilsError";
const animatedComponents = makeAnimated();

const useSearchBox = ({
  path,
  defaultValueArraySearchBoxDropdown = null,
  hasDefaultValueSearchBoxDropdown = false,
  makeSelectArea = true,
  reqQuery = {},
  placeholder = "ここに入力",
}) => {
  const { objectsFound, setObjectsFound, SearchBoxPush } = useSearchBoxPush(
    path,
    reqQuery
  );

  const { SearchBoxDropdown, selectedOption, setSelectedOption } =
    useSearchBoxDropdown(
      path,
      defaultValueArraySearchBoxDropdown,
      hasDefaultValueSearchBoxDropdown,
      makeSelectArea,
      reqQuery,
      placeholder
    );

  return {
    objectsFound,
    setObjectsFound,
    SearchBoxPush,

    selectedOption,
    setSelectedOption,
    SearchBoxDropdown,
  };
};

export default useSearchBox;

const useSearchBoxPush = (path, reqQuery = {}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [objectsFound, setObjectsFound] = useState(null);

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isValidStr = searchTerm && 0 < searchTerm.length;
    if (!isValidStr) {
      // ""が入力の場合
      console.log("need input");
      return;
    }

    // Use Node.js and MongoDB to search for objs here
    // const objs = await searchFromDB(path, searchTerm);
    const objs = await searchFromDB(path, reqQuery, searchTerm);

    console.log({ objs });

    if (objs) {
      setObjectsFound(objectArraydeduplicated(objs));
    }
  }

  const SearchBoxPush = (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );

  return { objectsFound, setObjectsFound, SearchBoxPush };
};

const useSearchBoxDropdown = (
  path,
  defaultValueArraySearchBoxDropdown,
  hasDefaultValueSearchBoxDropdown,
  makeSelectArea,
  reqQuery = {},
  placeholder
) => {
  const [selectedOption, setSelectedOption] = useState(null);

  /*
  AsyncSelectに入れるためにはフォーマットがあるので変換する。
  optionのformatの例:
    [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  ・・・,]
  */
  const defaultValueSearchBoxDropdown = useMemo(() => {
    if (defaultValueArraySearchBoxDropdown) {
      // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
      const OptionLabel = "OptionLabel" + new Date().getTime();
      let numForOptionLabel = 0;
      const formattedArray = defaultValueArraySearchBoxDropdown.map((val) => {
        numForOptionLabel++;
        const uniqueLabel = OptionLabel + `${numForOptionLabel}`;
        // labelはcomponentのkeyの役割を果たすようで、これが存在しないと、全てのオプションが表示されない（一個しか表示されなくなる）。
        return { value: val, label: uniqueLabel };
      });
      return formattedArray;
    }
  }, [defaultValueArraySearchBoxDropdown]);

  const handleChange = (selectedOption) => {
    setSelectedOption(getObjectsFromSelectedOption(selectedOption));
  };

  // キー入力の度にaxios発動しないようにする

  // const getOptionsDebounced = debounce(getOptions.bind(null, path), 500);
  const getOptionsDebounced = debounce(
    getOptions.bind(null, path, reqQuery),
    1000
  );

  const getDropDownCardObj = useCallback(
    (objectSelect) => {
      const obj = objectSelect["value"];

      const DropDownCardObj = (
        <div key={obj._id}>
          {
            /* 選択時に押すエリアをつくる */
            makeSelectArea ? <h2>追加</h2> : null
          }
          {/* {path === "arasuzy/search" ? (
            <Arasuzy obj={obj} />
          ) : (
            // <UserInfo userObj={obj} />
            <CardUser user={obj} displayAreaClick={true} />
          )} */}
          <CardUser user={obj} displayAreaClick={true} />
        </div>
      );

      return DropDownCardObj;
    },
    [makeSelectArea]
  );

  // 選択済みアイテムにdefaultをセット
  useEffect(() => {
    // setSelectedOption(defaultValueSearchBoxDropdown);
    if (defaultValueSearchBoxDropdown) {
      setSelectedOption(
        getObjectsFromSelectedOption(defaultValueSearchBoxDropdown)
      );
    }
  }, [defaultValueSearchBoxDropdown]);

  const SearchBoxDropdown = useMemo(() => {
    // defaultValueArraySearchBoxDropdownの読み込みが遅れると、defaultValueがnullとしてAsyncSelectが読み込まれてしまう。そこで、hasDefaultValueSearchBoxDropdownを使い、defaultValueArraySearchBoxDropdownが読み込まれるまで待つ（もっと上手い方法があるかもしれないが・・・）。
    const readyToLoad = hasDefaultValueSearchBoxDropdown
      ? hasDefaultValueSearchBoxDropdown && defaultValueSearchBoxDropdown
      : true;

    return readyToLoad ? (
      <AsyncSelect
        loadOptions={getOptionsDebounced}
        formatOptionLabel={getDropDownCardObj}
        components={animatedComponents}
        isMulti
        onChange={handleChange}
        menuIsOpen={true}
        cacheOptions
        placeholder={placeholder}
        defaultValue={defaultValueSearchBoxDropdown}
      />
    ) : null;
  }, [
    hasDefaultValueSearchBoxDropdown,
    defaultValueSearchBoxDropdown,
    getDropDownCardObj,
    getOptionsDebounced,
    placeholder,
  ]);

  return { SearchBoxDropdown, selectedOption, setSelectedOption };
};

const getObjectsFromSelectedOption = (selectedOption) => {
  const objs = selectedOption.map((anSelectObj) => {
    return anSelectObj["value"];
  });

  return objectArraydeduplicated(objs);
};

async function searchFromDB(path, reqQuery = {}, searchTerm) {
  // const paramsObj = { searchTerm: searchTerm };

  reqQuery.searchTerm = searchTerm;

  try {
    // const res = await getObjects(paramsObj, path + "/search");
    const res = await getObjects(reqQuery, path);

    if (res && res.data && res.data.data && res.data.data.data) {
      const objs = res.data.data.data;
      return objs;
    }
  } catch (err) {
    handleError({ err });
    if (isGoodError(err)) {
      return;
    }
  }
}

async function getOptions(path, reqQuery = {}, searchTerm, callback = null) {
  console.log("aaaaaaaaa");
  const objs = await searchFromDB(path, reqQuery, searchTerm);

  const arrayOfOptions = objs
    ? objs.map((anObj) => {
        return {
          value: anObj,
          label: anObj._id,
        };
      })
    : null;

  if (callback) {
    return callback(arrayOfOptions);
  } else {
    return arrayOfOptions;
  }
}
