import { useCallback, useEffect, useMemo, useState } from "react";
import useModalBase from "../../../hooks/Modal/useModalBase";
import classes from "./CardLanguageSelector.module.css";
import ModalBase from "../../Modal/ModalBase/ModalBase";
import ReactCountryFlag from "react-country-flag";
import useMe from "../../../hooks/user/me/useMe";
import { updateMe } from "../../../api/apiUser";
import { handleError } from "../../../utils/utilsError";
import useMyLanguageRead from "../../../hooks/myLanguage/useMyLanguageRead";
import { reloadPage } from "../../../utils/utilsWindow";

const CardLanguageSelector = () => {
  const { isOpen, openAreaModalBase, closeAreaModalBase } = useModalBase();

  return (
    <div className={classes.CardLanguageSelector}>
      <ModalBase
        customComponentToOpen={
          <FlagToOpenModal openAreaModalBase={openAreaModalBase} />
        }
        isOpen={isOpen}
        // openAreaModalBase={openAreaModalBase}
        closeAreaModalBase={closeAreaModalBase}
      >
        <AreaSelectLanguagePlus />
      </ModalBase>
    </div>
  );
};

const FlagToOpenModal = ({ openAreaModalBase }) => {
  const { me } = useMe();
  const languagePlusCode = useMemo(() => {
    return me?.languagePlus?.isoCodeGoogle;
  }, [me]);

  const onClickFlag = useCallback(() => {
    if (openAreaModalBase) {
      openAreaModalBase();
    }
  }, [openAreaModalBase]);

  const {
    flagCode: flagCodePlus,
    onClickHandler: onClickHandlerPlus,
    shadedColor: shadedColorPlus,
  } = useFlag({ languageCode: languagePlusCode, onClick: onClickFlag });

  return (
    <div className={classes.FlagToOpenModal}>
      <Flag
        flagCode={flagCodePlus}
        onClick={onClickHandlerPlus}
        shadedColor={shadedColorPlus}
      />
    </div>
  );
};

const AreaSelectLanguagePlus = () => {
  const { languageCodeSelected, setLanguageCodeSelected } =
    useCardLanguageSelector();

  const onClickFlag = useCallback(
    ({ languageCode }) => {
      // openAreaModalBase();
      setLanguageCodeSelected(languageCode);
    },
    [
      // openAreaModalBase,
      setLanguageCodeSelected,
    ]
  );

  const {
    flagCode: flagCodeUS,
    onClickHandler: onClickHandlerUS,
    shadedColor: shadedColorUS,
  } = useFlag({
    languageCode: "en",
    onClick: onClickFlag,
  });

  const {
    flagCode: flagCodeThailand,
    onClickHandler: onClickHandlerThailand,
    shadedColor: shadedColorThailand,
  } = useFlag({ languageCode: "th", onClick: onClickFlag });
  // const {
  //   flagCode: flagCodeJapan,
  //   onClickHandler: onClickHandlerJapan,
  //   shadedColor: shadedColorJapan,
  // } = useFlag({ languageCode: "ja", onClick: onClickFlag });

  const {
    flagCode: flagCodeKorea,
    onClickHandler: onClickHandlerKorea,
    shadedColor: shadedColorKOrea,
  } = useFlag({ languageCode: "ko", onClick: onClickFlag });

  // const {
  //   changingLanguagePlus,
  //   errorConfirmLanguageChange,
  //   updateLanguagePlus,
  //   textConfirm,
  //   displayButton,
  // } = useConfirmLanguageChange({ languageCodeSelected });

  useConfirmLanguageChange({ languageCodeSelected });

  return (
    <div className={classes.AreaSelectLanguagePlus}>
      <span className={classes.AreaSelectLanguagePlus__title}>
        <p className={classes.AreaSelectLanguagePlus__title__text}>
          学習したい言語を選択しよう😀
        </p>
      </span>

      <div className={classes.flags}>
        <Flag
          flagCode={flagCodeUS}
          onClick={onClickHandlerUS}
          shadedColor={shadedColorUS}
        />
        <Flag
          flagCode={flagCodeThailand}
          onClick={onClickHandlerThailand}
          shadedColor={shadedColorThailand}
        />
        <Flag
          flagCode={flagCodeKorea}
          onClick={onClickHandlerKorea}
          shadedColor={shadedColorKOrea}
        />
      </div>

      {/* <ConfirmLanguageChange
        changingLanguagePlus={changingLanguagePlus}
        errorConfirmLanguageChange={errorConfirmLanguageChange}
        updateLanguagePlus={
          updateLanguagePlus
        }
        textConfirm={textConfirm}
        displayButton={displayButton}
      /> */}
    </div>
  );
};

const useCardLanguageSelector = () => {
  const [languageCodeSelected, setLanguageCodeSelected] = useState(null);

  return {
    languageCodeSelected,
    setLanguageCodeSelected,
  };
};

const useFlag = ({ languageCode, onClick }) => {
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick({ languageCode });
    }
  }, [languageCode, onClick]);

  const flagCode = useMemo(() => {
    switch (languageCode) {
      case "en":
        return "US";
      case "ja":
        return "JP";
      case "ko":
        return "kr";
      case "th":
        return "TH";
      default:
        return null;
    }
  }, [languageCode]);

  const { me } = useMe();
  const isTheFlagOfLanguagePlus = useMemo(() => {
    const languagePlusCode = me?.languagePlus?.isoCodeGoogle;
    return languageCode === languagePlusCode;
  }, [languageCode, me]);

  const shadedColor = useMemo(() => {
    return typeof isTheFlagOfLanguagePlus === "boolean"
      ? !isTheFlagOfLanguagePlus
      : null;
  }, [isTheFlagOfLanguagePlus]);

  return { flagCode, onClickHandler, isTheFlagOfLanguagePlus, shadedColor };
};

const Flag = ({ flagCode, onClick, shadedColor }) => {
  const flagStyle = useMemo(() => {
    return {
      width: "calc(var(--width--App--center)*0.075)",
      height: "calc(var(--width--App--center)*0.075)",
      maxWidth: "calc(var(--max-width--App--center--content)*0.075)",
      maxHeight: "calc(var(--max-width--App--center--content)*0.075)",
    };
  }, []);

  return (
    <ReactCountryFlag
      className={`${classes.flag} ${shadedColor ? classes.flag_shaded : ""}`}
      countryCode={flagCode}
      svg
      onClick={onClick}
      style={flagStyle}
    />
  );
};

const useConfirmLanguageChange = ({ languageCodeSelected }) => {
  const [changingLanguagePlus, setChangingLanguagePlus] = useState(false);
  const [errorConfirmLanguageChange, setErrorConfirmLanguageChange] =
    useState(false);

  const { me } = useMe();
  const languagePlusCode = useMemo(() => {
    return me?.languagePlus?.isoCodeGoogle;
  }, [me]);

  const updateLanguagePlus = useCallback(async () => {
    setChangingLanguagePlus(true);
    try {
      await updateMe({
        data: {
          // languagePlus: languagePlusCode === "en" ? "ko" : "en",
          languagePlus: languageCodeSelected,
        },
      });
      setErrorConfirmLanguageChange(false);
      // 言語設定を反映させるためにページをreload
      reloadPage();
    } catch (err) {
      handleError({ err });
      setErrorConfirmLanguageChange(true);
    } finally {
      setChangingLanguagePlus(false);
    }
  }, [languageCodeSelected]);

  useEffect(() => {
    if (languageCodeSelected && updateLanguagePlus) {
      updateLanguagePlus();
    }
  }, [languageCodeSelected, updateLanguagePlus]);

  // const { me } = useMe();
  const myLanguagePlusIsSelected = useMemo(() => {
    const languagePlusCode = me?.languagePlus?.isoCodeGoogle;
    return languageCodeSelected === languagePlusCode;
  }, [languageCodeSelected, me]);

  const { getNameOfALanguageInMyLanguage } = useMyLanguageRead();

  const textConfirm = useMemo(() => {
    if (getNameOfALanguageInMyLanguage) {
      const nameOfLanguageSelected = getNameOfALanguageInMyLanguage({
        code: languageCodeSelected,
      });
      const nameLanguagePlus = getNameOfALanguageInMyLanguage({
        code: languagePlusCode,
      });
      // const nameLanguageAnother = getNameOfALanguageInMyLanguage({
      //   code: languagePlusCode === "en" ? "ko" : "en",
      // });

      // if (
      //   typeof nameLanguagePlus === "string" &&
      //   typeof nameLanguageAnother === "string"
      // ) {
      //   return `あなたは学習したい言語を${nameLanguagePlus}に設定してます。\n学習したい言語を${nameLanguageAnother}に変更しますか？`;
      // }

      let text = `あなたは学習したい言語を${nameLanguagePlus}に設定してます。`;
      if (!myLanguagePlusIsSelected) {
        text += `学習したい言語を${nameOfLanguageSelected}に変更しますか？`;
      }
      return text;
    }

    return "loading...";
  }, [
    getNameOfALanguageInMyLanguage,
    languagePlusCode,
    languageCodeSelected,
    myLanguagePlusIsSelected,
  ]);

  const displayButton = useMemo(() => {
    return typeof myLanguagePlusIsSelected === "boolean"
      ? !myLanguagePlusIsSelected
      : null;
  }, [myLanguagePlusIsSelected]);

  return {
    changingLanguagePlus,
    errorConfirmLanguageChange,
    updateLanguagePlus,
    textConfirm,
    displayButton,
  };
};

// const ConfirmLanguageChange = ({
//   changingLanguagePlus,
//   errorConfirmLanguageChange,
//   updateLanguagePlus,
//   textConfirm,
//   displayButton,
// }) => {
//   return (
//     <div className={classes.ConfirmLanguageChange}>
//       <p className={classes.ConfirmLanguageChange__text}>{textConfirm}</p>

//       <ButtonBasic
//         onClick={updateLanguagePlus}
//         disabled={changingLanguagePlus}
//       >
//         <p>変更する</p>
//       </ButtonBasic>

//       {errorConfirmLanguageChange ? <p>エラーが発生しました</p> : null}
//     </div>
//   );
// };

export default CardLanguageSelector;
