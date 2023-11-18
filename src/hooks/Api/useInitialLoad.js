// あるstateの初回読み込みや監視を行うために使う。
// 名前はuse「Initial」Loadだが、初回読み込み後もstateの監視に使うので、「initial」だけではない。しかしまだ名称変更していない。暇が出来たらやっといて

import { useCallback, useEffect, useRef, useState } from "react";
import useMakeMinimumAsyncCall from "./useMakeMinimumAsyncCall";

const useInitialLoad = (
  // 注意：今のところsomeStateがfalsyになる場合についてはこのuseInitialLoadは対応してない。そのような場合はresで代用する。一旦someStateにresを入れ、それからuseMemoなどでstateを取り出す。
  someState,

  // useCallback済みのやつ入れないとsignalのキャンセルで送信エラーになるっぽい
  fetchAndRenewFunc,
  // uniqueStrはデバグ目的（必要ならばどこがここを呼んだのかチェックする目的）で入れているだけで、特に処理上の意味は無い
  uniqueStr = null,

  // stateToWatchが変化したらcallAgain()を実行
  // someStateの再読み込みを実装したい時はこれに何らかのstateを入れる
  stateToWatch = null
) => {
  const { setNumFetch, hasErrorInitialLoad } = useErrorInitialLoad(uniqueStr);

  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);

  // 大量の要請をここで一旦まとめて吸収する。
  // ここでこのようにワンクッション挟まないとgetが40個以上連発されてしまう等の問題が起きる。
  useEffect(() => {
    if (loading) {
      return;
    }
    // stateが存在するか確認し、無いならload
    if (someState) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [someState, loading]);

  const callBack = useCallback(() => {
    loadingRef.current = false;
    setLoading(false);
    setNumFetch((prev) => prev + 1);
  }, [setNumFetch]);

  const {
    finishedCalling,
    callThisAsyncFuncMinimumAmount: callFetchAndRenewFuncMinimumAmount,
    callAgain,
  } = useMakeMinimumAsyncCall(fetchAndRenewFunc, callBack);

  useEffect(() => {
    if (hasErrorInitialLoad) {
      return;
    }

    if (loadingRef.current) {
      return;
    }

    if (loading) {
      loadingRef.current = true;
      if (finishedCalling) {
        callAgain();
      } else {
        callFetchAndRenewFuncMinimumAmount();
      }
    }
  }, [
    callAgain,
    callFetchAndRenewFuncMinimumAmount,
    finishedCalling,
    hasErrorInitialLoad,
    loading,
  ]);

  // useReloadsomeState(stateToWatch, finishedCalling, callAgain);
  useReloadsomeState(stateToWatch, finishedCalling, callAgain, setNumFetch);

  return { hasErrorInitialLoad };
};
export default useInitialLoad;

const useErrorInitialLoad = (uniqueStr) => {
  // const maxNumFetch = 40;
  const maxNumFetch = 3;
  const [numFetch, setNumFetch] = useState(0);
  const [hasErrorInitialLoad, setHasErrorInitialLoad] = useState(false);

  useEffect(() => {
    // 何度もサーバーからfetchしようとしても失敗するということは何らかのエラーがサーバー側で発生している可能性が高いので、処理を停止する
    if (maxNumFetch < numFetch) {
      console.log("error: initial", uniqueStr, numFetch);
      setHasErrorInitialLoad(true);
    }
  }, [numFetch, uniqueStr]);

  return { setNumFetch, hasErrorInitialLoad };
};

const useReloadsomeState = (
  stateToWatch,
  finishedCalling,
  callAgain,
  setNumFetch
) => {
  const refPreviousStateToWatch = useRef(null);

  useEffect(() => {
    if (!stateToWatch) {
      return;
    }
    if (!finishedCalling) {
      return;
    }
    if (stateToWatch === refPreviousStateToWatch.current) {
      return;
    }

    if (!callAgain) {
      return;
    }
    if (setNumFetch) {
      setNumFetch(0);
    }
    callAgain();
    refPreviousStateToWatch.current = stateToWatch;
  }, [stateToWatch, finishedCalling, callAgain, setNumFetch]);
};
