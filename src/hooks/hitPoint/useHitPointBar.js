import { useCallback } from "react";
import {
  pointsRestore,
  pointsRestoreWithBonus,
  secondsTransition,
  weightDamage,
} from "../../data/constants/hitPointConstants";

import useSpecialString from "./useSpecialString";
import useMyHitPointRead from "./useMyHitPointRead";
import useMyHitPointUpdate from "./useMyHitPointUpdate";
import {
  convertTwoByteCharactersIntoOneByteCharacters,
  getSentenceParts,
} from "../../utils/string/stringUtils";
import useMe from "../user/me/useMe";

const useHitPointBar = () => {
  const { currentHitPoints } = useMyHitPointRead();
  const {
    updatePointsInDB,
    addPointsToCurrentHitPoints,
    setCurrentHitPointsDelta,
    setTextToDisplay,
  } = useMyHitPointUpdate();

  const { specialStringLowered } = useSpecialString();

  const createTextVsPointsFromArrays = useCallback(
    (targetLanguageExpressions, others) => {
      for (const anExpressionArray of [targetLanguageExpressions, others]) {
        if (!Array.isArray(anExpressionArray)) {
          return null;
        }
      }

      for (const anArr of [targetLanguageExpressions, others]) {
        if (!Array.isArray(anArr)) {
          return;
        }
      }

      const textVsPoints = others.map((anExpressionInOthers) => {
        return typeof anExpressionInOthers === "string"
          ? getAnObjTextVsPoints(
              anExpressionInOthers,
              anExpressionInOthers.length * weightDamage
            )
          : getAnObjTextVsPoints("", 0);
      });

      for (const anExpressionInTargetLanguageExpressions of targetLanguageExpressions) {
        if (
          !anExpressionInTargetLanguageExpressions ||
          typeof anExpressionInTargetLanguageExpressions !== "string"
        ) {
          return;
        }
        const sameAsSpecialString =
          specialStringLowered ===
          anExpressionInTargetLanguageExpressions.toLowerCase();
        const pointForThisWord = sameAsSpecialString
          ? pointsRestoreWithBonus
          : pointsRestore;
        textVsPoints.push(
          getAnObjTextVsPoints(
            anExpressionInTargetLanguageExpressions,
            pointForThisWord,
            sameAsSpecialString
          )
        );
      }

      return textVsPoints;
    },
    [specialStringLowered]
  );

  const fluctuateHitPointAndText = useCallback(
    (anObjFromTextVsPoints) => {
      const textAndPoint = getTextAndPointsFromAnArray(anObjFromTextVsPoints);
      if (!textAndPoint) {
        return;
      }
      const { text, points } = textAndPoint;
      setTextToDisplay(text);
      addPointsToCurrentHitPoints(points);
      setCurrentHitPointsDelta(points);
    },
    [addPointsToCurrentHitPoints, setTextToDisplay, setCurrentHitPointsDelta]
  );

  const { me } = useMe();
  const getTextVsPoints = useCallback(
    (textInput) => {
      const textInputConvertedToOneByteCharacters =
        convertTwoByteCharactersIntoOneByteCharacters(textInput);
      const sentenceParts = getSentenceParts(
        textInputConvertedToOneByteCharacters,
        me?.languagePlus?.isoCodeGoogle
      );

      if (!sentenceParts) {
        return;
      }
      const targetLanguageExpressions = sentenceParts.targetLanguageExpressions;
      const others = sentenceParts.others;
      const textVsPoints = createTextVsPointsFromArrays(
        // englishWords,
        // japaneseParts
        targetLanguageExpressions,
        others
      );
      return textVsPoints;
    },
    [createTextVsPointsFromArrays, me]
  );
  const getSumOfPointsDelta = useCallback((textVsPoints) => {
    if (!Array.isArray(textVsPoints)) {
      return;
    }
    // const textVsPoints = getTextVsPoints(textInput);
    // 今回の変動分（例：50ポイントから75ポイントになったなら、25ポイント。）
    let sumOfPointsDelta = 0;
    for (const anTextVsPoints of textVsPoints) {
      sumOfPointsDelta += anTextVsPoints["points"];
    }

    return sumOfPointsDelta;
  }, []);

  const fluctuateHitPointChunkByChunk = useCallback(
    async (textInput) => {
      const textVsPoints = getTextVsPoints(textInput);
      if (!textVsPoints) {
        return;
      }

      const sumOfPointsDelta = getSumOfPointsDelta(textVsPoints);
      if (typeof sumOfPointsDelta !== "number") {
        return;
      }
      // const { textVsPoints, sumOfPointsDelta } = getPointsData(textInput);

      // hitPointをぐわんぐわんさせるのはあくまで演出。DBへの反映はここで一括でやる。
      await updatePointsInDB(currentHitPoints + sumOfPointsDelta);

      // 演出
      if (!Array.isArray(textVsPoints) || textVsPoints.length < 1) {
        return;
      }
      const interval = secondsTransition * 1000;
      for (let index = 0; index < textVsPoints.length; index++) {
        setTimeout(() => {
          const anObjFromTextVsPoints = textVsPoints[index];
          fluctuateHitPointAndText(anObjFromTextVsPoints);

          // 終了
          const allOf_textVsPoints_HasProcessed =
            index === textVsPoints.length - 1;
          if (allOf_textVsPoints_HasProcessed) {
            setTimeout(() => {
              setTextToDisplay("");
              setCurrentHitPointsDelta(0);
            }, interval);
          }
        }, interval * index);
      }
    },
    [
      currentHitPoints,
      fluctuateHitPointAndText,
      setCurrentHitPointsDelta,
      getSumOfPointsDelta,
      getTextVsPoints,
      setTextToDisplay,
      updatePointsInDB,
    ]
  );

  return {
    fluctuateHitPointChunkByChunk,
  };
};

export default useHitPointBar;

const getAnObjTextVsPoints = (text, points, isSpecialString = false) => {
  return {
    text: text,
    points: Math.ceil(points),
    isSpecialString: isSpecialString,
  };
};

const getTextAndPointsFromAnArray = (anObjFromTextVsPoints) => {
  const text = anObjFromTextVsPoints["text"];
  const points = anObjFromTextVsPoints["points"];
  if (!text || typeof text !== "string") {
    // throw new Error("invalid text element.");
    return;
  }
  if (!points || typeof points !== "number") {
    // throw new Error("invalid points element.");
    return;
  }

  return { text, points };
};
