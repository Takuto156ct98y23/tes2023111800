// // FireFoxでは使用不可である関係でコメントアウト中
// const getSegmenter = () => {
//   let sgmntr;
//   try {
//     sgmntr = new Intl.Segmenter("ja-JP", { granularity: "word" });
//   } catch (err) {}

import { STRING_LENGTH_LIMIT_VOCTRANSLATION } from "../../../data/constants/messageConstants";
import { splitStringByLength, splitTextByRegex } from "../stringUtils";
import { getSegmentsByTinySegmenter } from "./TinySegmenter";

//   return sgmntr;
// };
// const segmenter = getSegmenter();

// // FireFoxでは使用不可である関係でコメントアウト中

// /*
//     const str = "超絶アダフォアディムスのみんなで東京に行くのはどう？";
//     const segmentData = getSegmentData(str);

//     ↓

//   [
//     {
//         "segment": "超絶",
//         "index": 0,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "ア",
//         "index": 2,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "ダ",
//         "index": 3,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "フォア",
//         "index": 4,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "デ",
//         "index": 7,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "ィ",
//         "index": 8,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "ム",
//         "index": 9,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "ス",
//         "index": 10,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "の",
//         "index": 11,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "みんな",
//         "index": 12,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "で",
//         "index": 15,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "東京",
//         "index": 16,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "に",
//         "index": 18,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "行く",
//         "index": 19,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "の",
//         "index": 21,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "は",
//         "index": 22,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "どう",
//         "index": 23,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": true
//     },
//     {
//         "segment": "？",
//         "index": 25,
//         "input": "超絶アダフォアディムスのみんなで東京に行くのはどう？",
//         "isWordLike": false
//     }
//   ]

//   */
// const getSegmentData = (str) => {
//   if (!segmenter) {
//     return;
//   }
//   if (typeof str !== "string") {
//     return;
//   }
//   let segmentData = segmenter.segment(str);

//   segmentData = Array.from(segmentData);

//   return segmentData;
// };

/*
(0)
    const str = "超絶アダフォアディムスのみんなで東京に行くのはどう？";
    const segments = getSegments(str);
  
    ↓
  
  [
    "超絶",
    "ア",
    "ダ",
    "フォア",
    "デ",
    "ィ",
    "ム",
    "ス",
    "の",
    "みんな",
    "で",
    "東京",
    "に",
    "行く",
    "の",
    "は",
    "どう",
    "？"
  ]
  
  (1)
  今のところ日本語のみ対応
  */
export const getSegments = ({ str }) => {
  if (typeof str !== "string") {
    return;
  }

  // 今後Intl.SegmenterがFireFoxに対応したらIntl.Segmenterの使用を検討すべき

  let segments = getSegmentsByTinySegmenter(str);

  // 変な位置に「\n」が入ったままな場合に対処。
  // "私は\n\n日本人"　→　"私は","\n","\n","日本人"
  // "\n\n"　→　"\n","\n"
  const newSegments = [];
  for (const aSegment of segments) {
    if (typeof aSegment !== "string") {
      continue;
    }
    const arrayFromThisSegment = splitTextByRegex({
      text: aSegment,
      delimiter: "\n",
    });

    if (Array.isArray(arrayFromThisSegment)) {
      for (const aStr of arrayFromThisSegment) {
        newSegments.push(aStr);
      }
    }
  }
  segments = [...newSegments];

  // 長すぎる文字列を強制的に分割する処理。
  const segmentsShortened = [];
  for (const aSegment of segments) {
    if (typeof aSegment !== "string") {
      continue;
    }
    if (STRING_LENGTH_LIMIT_VOCTRANSLATION < aSegment.length) {
      const segmentsSplit = splitStringByLength({
        str: aSegment,
        length: STRING_LENGTH_LIMIT_VOCTRANSLATION,
      });
      if (!Array.isArray(segmentsSplit)) {
        continue;
      }
      for (const aSegmentSplit of segmentsSplit) {
        segmentsShortened.push(aSegmentSplit);
      }
      continue;
    }
    segmentsShortened.push(aSegment);
  }
  segments = [...segmentsShortened];

  return segments;
};
