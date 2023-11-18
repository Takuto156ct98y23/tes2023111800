/*
keyForResettingをkeyに仕込んだcomponentをresetAComponentで強制リセットする。

以下のようにして使う。
    <div className={classes.ContentOneUserGroup} key={keyForResettingUserGroup}>
      {AreaUserGroup}
    </div>

*/

import { useCallback, useState } from "react";
import { getUniqueStr } from "../../utils/string/stringUtils";

const useKeyForResetting = () => {
  const createUniqueKey = useCallback(() => {
    // const uniqueKey = `keyForResetting${uuidv4()}${new Date().getTime()}`;

    const uniqueStr = getUniqueStr();
    const uniqueKey = `keyForResetting${uniqueStr}`;
    return uniqueKey;
  }, []);

  // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements

  // https://stackoverflow.com/questions/21749798/how-can-i-reset-a-react-component-including-all-transitively-reachable-state

  const [keyForResetting, setKeyForResetting] = useState(createUniqueKey());

  const resetAComponent = useCallback(() => {
    const uniqueKey = createUniqueKey();
    setKeyForResetting(uniqueKey);
  }, [createUniqueKey]);

  return { keyForResetting, resetAComponent };
};

export default useKeyForResetting;
