import { useCallback, useMemo, useState } from "react";

const useModal = (customStyles = null) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const stylesModal = useMemo(() => {
    return customStyles
      ? customStyles
      : {
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "black",
            zIndex: "200000000",
          },
          overlay: {
            backgroundColor: "rgba(10, 10, 10, 0.75)",
            zIndex: "100000000",
          },
        };
  }, [customStyles]);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  return { modalIsOpen, stylesModal, openModal, closeModal };
};

export default useModal;
