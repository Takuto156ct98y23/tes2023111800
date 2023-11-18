import { useMemo } from "react";
import useVocs from "../../hooks/useVocs";
import {
  convertTwoByteCharactersIntoOneByteCharacters,
  getSentenceParts,
  getUniqueStr,
} from "../../utils/string/stringUtils";

// import { getSentenceInfo } from "../../utils/utilsHitPoint";
import CardVoc from "../Card/CardVoc/CardVoc";
import classes from "./SentenceData.module.css";
import useMe from "../../hooks/user/me/useMe";

const SentenceData = ({ sentence }) => {
  // const sentenceInfo = getSentenceInfo(sentence);
  // const englishWords = sentenceInfo.englishWords;

  const { me } = useMe();
  const languagePlusIsoCodeGoogle = useMemo(() => {
    return me?.languagePlus?.isoCodeGoogle;
  }, [me]);

  const targetLanguageExpressions = useMemo(() => {
    const sentenceConvertedToOneByteCharacters =
      convertTwoByteCharactersIntoOneByteCharacters(sentence);
    const sentenceParts = getSentenceParts(
      sentenceConvertedToOneByteCharacters,
      languagePlusIsoCodeGoogle
    );
    const targetLanguageExpressions = sentenceParts?.targetLanguageExpressions;
    if (
      !Array.isArray(targetLanguageExpressions) ||
      targetLanguageExpressions.length < 1
    ) {
      return [];
    }
    const sentencePartsLowered = targetLanguageExpressions.map((expression) => {
      return typeof expression === "string" ? expression.toLowerCase() : "";
    });
    return sentencePartsLowered;
  }, [sentence, languagePlusIsoCodeGoogle]);

  // const { vocs } = useVocs(englishWords);
  const { vocs } = useVocs(targetLanguageExpressions);

  return (
    <div className={classes.SentenceData}>
      <div className={classes.SentenceData_wrapperSentence}>
        <AreaSentence sentence={sentence} />
      </div>
      <div className={classes.SentenceData_wrapperVocs}>
        {vocs ? (
          <Vocs vocs={vocs} />
        ) : (
          <p className={classes.loadingVocs}>語彙データの読み込み中...</p>
        )}

        {/* <p>語彙データの読み込み中...</p> */}
      </div>
    </div>
  );
};
export default SentenceData;

const AreaSentence = ({ sentence }) => {
  return (
    <div className={classes.AreaSentence}>
      <p className={classes.sentence}>{sentence}</p>
    </div>
  );
};

const Vocs = ({ vocs }) => {
  return (
    <div className={classes.Vocs}>
      {Array.isArray(vocs)
        ? vocs.map((voc) => {
            return <CardVoc voc={voc} key={getUniqueStr()} />;
          })
        : null}
    </div>
  );
};
