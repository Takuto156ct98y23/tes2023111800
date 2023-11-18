import { SEGMENT_STR_TYPE_ORIGINAL } from "../../data/constants/messageConstants";
import { getRegularExpression } from "../string/stringUtils";

// messageのsegmentObjsをstring化する
export const getTextBySegmentObjs = ({ segmentObjs }) => {
  if (!Array.isArray(segmentObjs)) {
    return;
  }
  const segmentObjsLength = segmentObjs.length;
  const lastIndex = segmentObjsLength - 1;
  const newSegments = segmentObjs.map((segmentObj, index) => {
    const segmentStrOriginal = segmentObj.segmentStrOriginal;
    const segmentStrTranslated = segmentObj.segmentStrTranslated;
    const segmentStrType = segmentObj.segmentStrType;
    if (segmentStrType === SEGMENT_STR_TYPE_ORIGINAL) {
      return segmentStrOriginal;
    } else {
      let strOfThisSegment = segmentStrTranslated;
      const nextSegmenntExists = index < lastIndex;
      if (nextSegmenntExists) {
        const nextSegment = segmentObjs[index + 1];
        // segmentStrOriginalには原文の情報が含まれており、スペース等もそのまま残されている。そこでsegmentStrOriginalを基準として使う
        const nextSegmentStrOriginal = nextSegment?.segmentStrOriginal;
        strOfThisSegment = getStrWithASpaceIfNeeded(
          strOfThisSegment,
          nextSegmentStrOriginal
        );
      }

      return strOfThisSegment;
    }
  });
  if (!Array.isArray(newSegments)) {
    return;
  }
  return newSegments.join("");
};

// 「私haveapen」のようにくっついてしまうのを防ぐためにスペースを末尾に（加える必要があるなら）加えたstringを返す。
// 加える必要が無かった場合入力されたstringをそのまま返す。（記号や絵文字等があれば加える必要がない）
const spaces = new Set([" ", "　"]);
const getStrWithASpaceIfNeeded = (strInput, nextStr) => {
  let strOutput = strInput;
  const regexSymbol = getRegularExpression("symbol");
  const regexEmoji = getRegularExpression("emoji");

  const nextStrIsASpace = spaces.has(nextStr);
  const nextStrIsASymbol = regexSymbol.test(nextStr);
  const nextStrIsAnEmoji = regexEmoji.test(nextStr);

  const noSpaceNeeded = nextStrIsASpace || nextStrIsASymbol || nextStrIsAnEmoji;
  const shouldAddASpace = !noSpaceNeeded;

  if (shouldAddASpace) {
    strOutput += " ";
  }

  return strOutput;
};
