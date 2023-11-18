import classes from "./DropDownAsync.module.css";

import { useCallback, useMemo, useRef, useState } from "react";
import { getObjects } from "../../../api/apiGeneral";
// import Arasuzy from "../../../components/Arasuzy/Arasuzy";
import { objectArraydeduplicated } from "../../../utils/arrayUtils";
import CardUser from "../../../components/Card/CardUser/CardUser";
import { handleError, isGoodError } from "../../../utils/utilsError";

const useDropDownAsync = ({
  path,
  defaultValuesDropDownAsync = [],
  reqQuery = {},
  makeSelectArea = true,
}) => {
  const initialOptionDropDownAsync = useMemo(() => {
    return getDefaultValueSearchBoxDropdown(defaultValuesDropDownAsync);
  }, [defaultValuesDropDownAsync]);

  const [selectedOption, setSelectedOption] = useState(
    getObjectsFromSelectedOption(initialOptionDropDownAsync)
  );

  //   useEffect(() => {
  //     console.log("selectedOption", selectedOption);
  //   }, [selectedOption]);

  const handleChange = useCallback((selectedOption) => {
    setSelectedOption(getObjectsFromSelectedOption(selectedOption));
  }, []);

  const timeoutID = useRef(null);
  const getOptionsDebounced = useCallback(
    (searchTerm, callback) => {
      clearTimeout(timeoutID.current);
      timeoutID.current = setTimeout(() => {
        getOptions(path, reqQuery, searchTerm, callback);
      }, 1000);
    },
    [path, reqQuery]
  );

  const getDropDownCardObj = useCallback(
    (objectWithValueAndLabel) => {
      return (
        <DropDownCardObj
          objectWithValueAndLabel={objectWithValueAndLabel}
          path={path}
        />
      );
    },
    [path]
  );

  return {
    selectedOption,
    handleChange,
    getOptionsDebounced,
    getDropDownCardObj,
    initialOptionDropDownAsync,
  };
};

export default useDropDownAsync;

const DropDownCardObj = ({ objectWithValueAndLabel, path }) => {
  const obj = objectWithValueAndLabel["value"];

  return (
    <div className={classes.DropDownCardObj} key={obj._id}>
      <div className={classes.DropDownCardObj__wrapper}>
        {/* <div className={classes.DropDownCardObj__wrapper__AreaP}>
          <p className={classes.pToSelect}>■</p>
        </div> */}
        <div className={classes.DropDownCardObj__wrapper__AreaCard}>
          {/* {path === "arasuzy/search" ? (
            <Arasuzy obj={obj} />
          ) : (
            // <UserInfo userObj={obj} />
            <CardUser
              // displayAreaClick={true}
              user={obj}
              jumpToUserPageByUserInfoClick={false}
            />
          )} */}
          <CardUser user={obj} jumpToUserPageByUserInfoClick={false} />
        </div>
      </div>
    </div>
  );
};

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
const getDefaultValueSearchBoxDropdown = (defaultValuesDropDownAsync) => {
  if (defaultValuesDropDownAsync) {
    // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
    const OptionLabel = "OptionLabel" + new Date().getTime();
    let numForOptionLabel = 0;
    const formattedArray = defaultValuesDropDownAsync.map((val) => {
      numForOptionLabel++;
      const uniqueLabel = OptionLabel + `${numForOptionLabel}`;
      // labelはcomponentのkeyの役割を果たすようで、これが存在しないと、全てのオプションが表示されない（一個しか表示されなくなる）。
      return { value: val, label: uniqueLabel };
    });
    return formattedArray;
  }
};

const getObjectsFromSelectedOption = (selectedOption) => {
  const objs = selectedOption.map((anSelectObj) => {
    return anSelectObj["value"];
  });

  return objectArraydeduplicated(objs);
};

async function searchFromDB(path, reqQuery = {}, searchTerm) {
  reqQuery.searchTerm = searchTerm;

  try {
    const res = await getObjects(reqQuery, path);

    // console.log("res", res);

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
