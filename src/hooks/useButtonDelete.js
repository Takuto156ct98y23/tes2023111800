import { useCallback, useMemo, useState } from "react";
import { deleteActionDoc } from "../api/apiAction";
// import { deleteData } from "../api/apiGeneral";

import { handleError, isGoodError } from "../utils/utilsError";
import ButtonBasic from "../components/button/Basic/ButtonBasic";

const useButtonDelete = (path, objectId, funcWhenDelete = null) => {
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [objDeleted, setObjDeleted] = useState(false);

  const deleteObject = useCallback(() => {
    setConfirmingDeletion(false);
    setDeleting(true);
    const deleteObj = async () => {
      try {
        // // queryでidを受け取る場合とbodyでidを受け取る場合の両方に対応するため、「id: objectId」を二つ書いた。
        // const paramsObj = { deleteDocument: true, id: objectId };
        // const data = { id: objectId };

        // await deleteData(paramsObj, data, path, null);

        await deleteActionDoc(path, objectId);

        setDeleting(false);
        setObjDeleted(true);
        if (funcWhenDelete) {
          funcWhenDelete();
        }
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    };
    deleteObj();
  }, [path, objectId, funcWhenDelete]);

  const confirmingStart = useCallback(() => {
    setConfirmingDeletion(true);
  }, []);

  // 本当に削除するのか確認するステップを挟み、ワンクッション置きたい時に使う。
  const ButtonConfirmDeletion = useMemo(() => {
    return <ButtonBasic onClick={confirmingStart}>delete?</ButtonBasic>;
  }, [confirmingStart]);
  // 削除ボタン
  const ButtonDelete = useMemo(() => {
    return <ButtonBasic onClick={deleteObject}>delete</ButtonBasic>;
  }, [deleteObject]);

  const ButtonCancel = useMemo(() => {
    return (
      <ButtonBasic
        onClick={() => {
          setConfirmingDeletion(false);
        }}
      >
        cancel
      </ButtonBasic>
    );
  }, [setConfirmingDeletion]);

  const AreaButtonDelete = useMemo(() => {
    if (confirmingDeletion) {
      return (
        <div>
          <p>本当に削除しますか？</p>
          {ButtonCancel}
          {ButtonDelete}
        </div>
      );
    } else if (deleting) {
      return (
        <div>
          <p>削除中...</p>
        </div>
      );
    } else if (objDeleted) {
      return (
        <div>
          <p>削除しました。</p>
        </div>
      );
      // } else {
      //   return <div>{isMyArasuzy ? ButtonConfirmDeletion : null}</div>;
      // }
    } else {
      return <div>{ButtonConfirmDeletion}</div>;
    }
  }, [
    confirmingDeletion,
    ButtonCancel,
    ButtonConfirmDeletion,
    ButtonDelete,
    deleting,
    objDeleted,
  ]);

  return {
    ButtonConfirmDeletion,
    ButtonDelete,
    ButtonCancel,
    confirmingDeletion,
    setConfirmingDeletion,
    objDeleted,
    deleteObject,
    deleting,
    AreaButtonDelete,
  };
};

export default useButtonDelete;
