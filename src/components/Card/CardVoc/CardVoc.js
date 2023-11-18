import { Fragment, useCallback, useMemo, useState } from "react";
import classes from "./CardVoc.module.css";
import useMyLanguageRead from "../../../hooks/myLanguage/useMyLanguageRead";
import useMe from "../../../hooks/user/me/useMe";

const CardVoc = ({ voc }) => {
  const { vocIsSelected, toggleVocIsSelected } = useCardVoc();

  return (
    <Fragment>
      {voc ? (
        <div className={classes.CardVoc}>
          <Fragment>
            {vocIsSelected ? (
              <AreaVocabulary
                voc={voc}
                toggleVocIsSelected={toggleVocIsSelected}
              />
            ) : (
              <AreaVocabularyOnlyTitle
                voc={voc}
                toggleVocIsSelected={toggleVocIsSelected}
              />
            )}
          </Fragment>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CardVoc;

const useCardVoc = () => {
  const [vocIsSelected, setVocIsSelected] = useState(false);

  const toggleVocIsSelected = useCallback(() => {
    setVocIsSelected((prev) => !prev);
  }, []);

  return { vocIsSelected, toggleVocIsSelected };
};

const Title00 = ({ titleStr }) => {
  return <h6 className={classes.Title00}>{titleStr}</h6>;
};
const Title01 = ({ titleStr }) => {
  return <h6 className={classes.Title01}>{titleStr}</h6>;
};

const TextNormal = ({ text }) => {
  return <p className={classes.TextNormal}>{text}</p>;
};

const AreaVocabularyOnlyTitle = ({ voc, toggleVocIsSelected }) => {
  const vocabularyString = voc ? voc.vocabularyString : null;
  const explanationMini = voc ? voc.explanationMini : null;
  const stringExplanationMini = useMemo(() => {
    let strExplanationMini = "";
    if (Array.isArray(explanationMini)) {
      let explanationNum = 1;
      for (const anExplanation of explanationMini) {
        strExplanationMini += `(${explanationNum})\t${anExplanation} `;
        explanationNum++;
      }
    } else if (typeof explanationMini === "string") {
      strExplanationMini = explanationMini;
    }

    return strExplanationMini;
  }, [explanationMini]);

  return (
    <div className={classes.AreaVocabulary} onClick={toggleVocIsSelected}>
      <div className={classes.wrapperAreaVocabulary}>
        <VocabularyString vocabularyString={vocabularyString} />
        <p>{stringExplanationMini}</p>
        <TextNormal text={"▼タップで詳しい解説を表示"} />
      </div>
    </div>
  );
};

const AreaVocabulary = ({ voc, toggleVocIsSelected }) => {
  const vocId = voc ? voc._id : null;
  const vocabularyString = voc ? voc.vocabularyString : null;
  const explanationMini = voc ? voc.explanationMini : null;
  const explanationMiniAI = voc?.explanationMiniAI;
  const explanation = voc ? voc.explanation : null;
  const explanationAI = voc?.explanationAI;
  const wiktionary = voc ? voc.wiktionary : null;

  return (
    <div className={classes.AreaVocabulary}>
      <div className={classes.wrapperAreaVocabulary}>
        <VocabularyString
          vocabularyString={vocabularyString}
          toggleVocIsSelected={toggleVocIsSelected}
        />
        <ExplanationMini explanationMini={explanationMini} />
        <ExplanationMiniAI explanationMiniAI={explanationMiniAI} />
        <Explanation explanation={explanation} />
        <ExplanationAI explanationAI={explanationAI} />

        <Wiktionary vocId={vocId} wiktionary={wiktionary} />
        <CopyRight
          wiktionary={wiktionary}
          vocabularyString={vocabularyString}
        />
      </div>
    </div>
  );
};

const VocabularyString = ({ vocabularyString, toggleVocIsSelected }) => {
  const _vocabularyString = useMemo(() => {
    return vocabularyString;
  }, [vocabularyString]);
  return (
    <Fragment>
      {_vocabularyString ? (
        <div
          className={`${classes.AreaVocabulary__item} ${classes.VocabularyString}`}
          onClick={toggleVocIsSelected}
        >
          {/* <Title00 titleStr={"この語彙を使ってみよう！"} /> */}
          {/* <p>この語彙を使ってみよう！</p> */}
          <h6 className={classes.VocabularyString__text}>
            {_vocabularyString}
          </h6>
        </div>
      ) : null}
    </Fragment>
  );
};

const ExplanationMini = ({ explanationMini }) => {
  const { isoCodeGoogle } = useMyLanguageRead();

  // const registered = new Set();
  const stringExplanationMini = useMemo(() => {
    let meaningArray = explanationMini ? explanationMini[isoCodeGoogle] : null;
    if (!Array.isArray(meaningArray) || meaningArray.length < 1) {
      return null;
    }
    let strExplanationMini = "";
    if (Array.isArray(meaningArray)) {
      let explanationNum = 1;
      for (const anExplanation of meaningArray) {
        strExplanationMini += `(${explanationNum})\t${anExplanation}\n`;
        explanationNum++;
      }
    } else if (typeof meaningArray === "string") {
      strExplanationMini = meaningArray;
    }

    return strExplanationMini;
  }, [explanationMini, isoCodeGoogle]);

  return (
    <Fragment>
      {stringExplanationMini ? (
        <div
          className={`${classes.AreaVocabulary__item} ${classes.ExplanationMini}`}
        >
          <div className={classes.AreaVocabulary__item__wrapper}>
            <Title00 titleStr={"意味ミニ辞典"} />
            <TextNormal text={stringExplanationMini} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
const ExplanationMiniAI = ({ explanationMiniAI }) => {
  const { isoCodeGoogle } = useMyLanguageRead();

  // const registered = new Set();
  const stringExplanationMini = useMemo(() => {
    let meaningArray = explanationMiniAI
      ? explanationMiniAI[isoCodeGoogle]
      : null;
    if (!Array.isArray(meaningArray) || meaningArray.length < 1) {
      return null;
    }

    let strExplanationMini = "";
    if (Array.isArray(meaningArray)) {
      let explanationNum = 1;
      for (const anExplanation of meaningArray) {
        strExplanationMini += `(${explanationNum})\t${anExplanation}\n`;
        explanationNum++;
      }
    } else if (typeof meaningArray === "string") {
      strExplanationMini = meaningArray;
    }

    return strExplanationMini;
  }, [explanationMiniAI, isoCodeGoogle]);

  return (
    <Fragment>
      {stringExplanationMini ? (
        <div
          className={`${classes.AreaVocabulary__item} ${classes.ExplanationMini}`}
        >
          <div className={classes.AreaVocabulary__item__wrapper}>
            <Title00 titleStr={"意味ミニ辞典 by AI"} />
            <TextNormal text={stringExplanationMini} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

const Explanation = ({ explanation }) => {
  const { me } = useMe();
  const explanationMinusStr = useMemo(() => {
    if (!explanation) {
      return null;
    }
    const languageMinusCode = me?.languageMinus?.isoCodeGoogle;
    if (!languageMinusCode) {
      return;
    }
    return explanation[languageMinusCode];
  }, [explanation, me]);
  const explanationPlusStr = useMemo(() => {
    if (!explanation) {
      return null;
    }
    const languagePlusCode = me?.languagePlus?.isoCodeGoogle;
    if (!languagePlusCode) {
      return;
    }
    return explanation[languagePlusCode];
  }, [explanation, me]);

  return (
    <Fragment>
      {explanationMinusStr && explanationPlusStr ? (
        <div
          className={`${classes.AreaVocabulary__item} ${classes.Explanation}`}
        >
          <div className={classes.AreaVocabulary__item__wrapper}>
            <Title00 titleStr={"解説"} />
            <TextNormal text={"<日本語解説>"} />
            <TextNormal text={explanationMinusStr} />
            <TextNormal text={"\n\n<日本語解説の原文>"} />
            <TextNormal text={explanationPlusStr} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

const ExplanationAI = ({ explanationAI }) => {
  const { me } = useMe();
  const explanationMinusStr = useMemo(() => {
    if (!explanationAI) {
      return null;
    }
    const languageMinusCode = me?.languageMinus?.isoCodeGoogle;
    if (!languageMinusCode) {
      return;
    }

    return explanationAI[languageMinusCode];
  }, [explanationAI, me]);
  const explanationPlusStr = useMemo(() => {
    if (!explanationAI) {
      return null;
    }
    const languagePlusCode = me?.languagePlus?.isoCodeGoogle;
    if (!languagePlusCode) {
      return;
    }
    return explanationAI[languagePlusCode];
  }, [explanationAI, me]);

  return (
    <Fragment>
      {explanationMinusStr && explanationPlusStr ? (
        <div
          className={`${classes.AreaVocabulary__item} ${classes.ExplanationAI}`}
        >
          <div className={classes.AreaVocabulary__item__wrapper}>
            <Title00 titleStr={"AI先生の解説"} />

            <TextNormal text={"<日本語解説>"} />
            <TextNormal text={explanationMinusStr} />
            <TextNormal text={"\n\n<日本語解説の原文>"} />
            <TextNormal text={explanationPlusStr} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

const ItemInWiktionary = ({ category, contentArray }) => {
  const itemTitle = useMemo(() => {
    if (category === "texts") {
      return "意味";
    } else {
      return category;
    }
  }, [category]);

  return (
    <Fragment>
      {itemTitle && contentArray ? (
        <div>
          {itemTitle ? <Title01 titleStr={itemTitle} /> : null}
          {Array.isArray(contentArray) ? (
            <TextNormal text={contentArray.join("\n")} />
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

const Wiktionary = ({ vocId, wiktionary }) => {
  const { isoCodeGoogle } = useMyLanguageRead();

  const entriesWikitionary = useMemo(() => {
    if (!wiktionary) {
      return;
    }
    const wiktionaryInMyLanguage = wiktionary[isoCodeGoogle];
    return wiktionaryInMyLanguage
      ? Object.entries(wiktionaryInMyLanguage)
      : null;
  }, [wiktionary, isoCodeGoogle]);

  return (
    <Fragment>
      {entriesWikitionary ? (
        <div
          className={`${classes.AreaVocabulary__item} ${classes.Wiktionary}`}
        >
          <div className={classes.AreaVocabulary__item__wrapper}>
            <Title00 titleStr={"Wiktionary"} />
            {entriesWikitionary
              ? entriesWikitionary.map((entry, index) => {
                  const category = entry[0];
                  const contentArray = entry[1];
                  return (
                    <ItemInWiktionary
                      key={`${vocId}Wiktionary${index}`}
                      category={category}
                      contentArray={contentArray}
                    />
                  );
                })
              : null}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

const CopyRight = ({ wiktionary, vocabularyString }) => {
  const { isoCodeGoogle } = useMyLanguageRead();
  const strCopyRight = useMemo(() => {
    if (!wiktionary) {
      return;
    }
    const wiktionaryInMyLanguage = wiktionary[isoCodeGoogle];
    return wiktionaryInMyLanguage
      ? `当ページ上における語彙解説欄の【 Wiktionary 】内に掲載されている内容は、Wiktionaryの'${vocabularyString}'(https://ja.wiktionary.org/wiki/${vocabularyString})を改変、複製、再配布したものにあたり、GFDLまたはCC BY-SA 3.0ライセンスの下で提供されています。`
      : null;
  }, [wiktionary, vocabularyString, isoCodeGoogle]);
  return (
    <Fragment>
      {strCopyRight ? (
        <div className={`${classes.AreaVocabulary__item} ${classes.CopyRight}`}>
          <div className={classes.AreaVocabulary__item__wrapper}>
            <Title00 titleStr={"ライセンス情報"} />
            <p className={classes.strCopyRight}>{strCopyRight}</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
