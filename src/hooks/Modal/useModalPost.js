import React, { Fragment, useMemo } from "react";
import ButtonModal from "../../components/button/modal/ButtonModal/ButtonModal";
import useButtonModal from "../Button/useButtonModal";

import useButtonDelete from "../useButtonDelete";
import useMe from "../user/me/useMe";

const useModalPost = (arasuzy) => {
  const arasuzyId = arasuzy ? arasuzy._id : null;

  const { objDeleted, AreaButtonDelete } = useButtonDelete(
    "arasuzies/deleteDocument",
    arasuzyId
  );

  const PostModal = useMemo(() => {
    return (
      <Fragment>
        {arasuzy && AreaButtonDelete ? (
          <AreaModalPost
            arasuzy={arasuzy}
            AreaButtonDelete={AreaButtonDelete}
          />
        ) : null}
      </Fragment>
    );
  }, [AreaButtonDelete, arasuzy]);

  return { PostModal, objDeleted };
};

export default useModalPost;

const AreaModalPost = ({ arasuzy, AreaButtonDelete }) => {
  const { me } = useMe();

  const isMyArasuzy = useMemo(() => {
    return me && arasuzy ? me._id === arasuzy.userId._id.toString() : null;
  }, [me, arasuzy]);

  const ModalChildren = useMemo(() => {
    return <div>{isMyArasuzy ? AreaButtonDelete : null}</div>;
  }, [AreaButtonDelete, isMyArasuzy]);

  const { modalIsOpen, stylesModal, openModal, closeModal } = useButtonModal();

  return (
    <ButtonModal
      openButtonStr={"三"}
      closeButtonStr={"戻る"}
      modalIsOpen={modalIsOpen}
      stylesModal={stylesModal}
      openModal={openModal}
      closeModal={closeModal}
    >
      {ModalChildren}
    </ButtonModal>
  );
};
