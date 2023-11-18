import { useCallback, useEffect, useState } from "react";
import { checkIfSameArray } from "../../utils/arrayUtils";

/*
内部の要素が変化した場合に変化するarrayのstateを利用するためのhook。

（使用方法の例）
  const [someArray, setSomeArray] = useState([]);
上記のようにarrayをそのままstateとして扱ってしまうと：

1. 以下の２パターンは違うarrayとして扱われてしまう。
(0) someArray: [{ _id: 100 }]
(1) someArray: [{ _id: 100 }]

2. 無限ループが発生する恐れがある。

1.と2.を防ぐにはuseArrayStateを使う。

具体例０===================================================
  const { arr, pushToArrayState, overWriteArrayState } = useArrayState({
    compareBy: "keyAndValue",
    keyToCompare: "id",
  });

    const push = useCallback(() => {
    pushToArrayState({ _id: 100 });
  }, [pushToArrayState]);
  const overWrite = useCallback(() => {
    overWriteArrayState([{ _id: 100, x: Math.random() }]);
  }, [overWriteArrayState]);

  ↓

  異なるidのオブジェクトが入って来たりすると変化。同じ順番で同じ数のオブジェクトのarrayを入れ直しても変化しない。

具体例１===================================================

    const { arr, pushToArrayState, overWriteArrayState } = useArrayState();
  useEffect(() => {
    console.log("AAAAAA", arr);
  }, [arr]);

  const push = useCallback(() => {
    pushToArrayState(100);
  }, [pushToArrayState]);
  const overWrite = useCallback(() => {
    overWriteArrayState([100]);
  }, [overWriteArrayState]);

  ↓

  異なる要素が入って来たりすると変化。同じ順番で同じ数の要素のarrayを入れ直しても変化しない。

*/

const useArrayState = (options = {}) => {
  // const { defaultArray = [], compareBy = null, keyToCompare = null } = options;
  const {
    defaultArray = null,
    compareBy = null,
    keyToCompare = null,
  } = options;

  const [_arr, set_arr] = useState(defaultArray);
  const [arr, setArr] = useState(_arr);

  //   push
  const pushToArrayState = useCallback(
    (newElement) => {
      const new_arr = [..._arr, newElement];
      set_arr(new_arr);
    },
    [_arr]
  );

  //   array丸ごと上書き
  const overWriteArrayState = useCallback((newArray) => {
    set_arr(newArray);
  }, []);

  useEffect(() => {
    const sameArray = checkIfSameArray({
      arr0: _arr,
      arr1: arr,
      compareBy,
      keyToCompare,
    });

    // if (sameArray === false) {
    if (!sameArray && Array.isArray(_arr)) {
      setArr(_arr);
    }
  }, [_arr, arr, compareBy, keyToCompare]);

  return { arr, pushToArrayState, overWriteArrayState };
};

export default useArrayState;

/*
実験メモ

const ComponentTest = () => {
  const { arr, pushToArrayState, overWriteArrayState } = useArrayState({
    compareBy: "keyAndValue",
    keyToCompare: "id",
  });
  // const { arr, pushToArrayState, overWriteArrayState } = useArrayState();
  useEffect(() => {
    console.log("AAAAAA", arr);
  }, [arr]);

  const push = useCallback(() => {
    pushToArrayState({ _id: 100 });
    // pushToArrayState(100);
  }, [pushToArrayState]);
  const overWrite = useCallback(() => {
    overWriteArrayState([{ _id: 100, x: Math.random() }]);
    // overWriteArrayState([100]);
  }, [overWriteArrayState]);

  const displayArr = useCallback(() => {
    console.log(arr);
  }, [arr]);

  return (
    <div className={classes.ComponentTest}>
      <button onClick={push}>push</button>
      <button onClick={overWrite}>overWrite</button>
      <button onClick={displayArr}>display</button>
    </div>
  );
};

export default ComponentTest;

*/
