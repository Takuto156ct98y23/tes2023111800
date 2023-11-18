import { useCallback, useState } from "react";

const useModalBurger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openAreaModalBurger = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeAreaModalBurger = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openAreaModalBurger,
    closeAreaModalBurger,
  };
};

export default useModalBurger;
