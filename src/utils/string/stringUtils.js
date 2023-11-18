import emojiRegex from "emoji-regex";
import { v4 as uuidv4 } from "uuid";

export function makeAGetAndRenewingId(searchObj, objectType, path) {
  const keysStringInSearchObj = Object.keys(searchObj).join("");
  const getAndRenewingId = objectType + path + keysStringInSearchObj;

  return getAndRenewingId;
}

export function getUniqueStr() {
  return `${uuidv4()}${new Date().getTime()}`;
}

// regexTypeに対応したregular expressionを返す
// Please note that in JavaScript, regular expressions are stateful when using the global flag (g). If you use them in multiple calls (like calling .match() multiple times), they may start from where they left off.
// regexはjavascriptでは繰り返し使うと思わぬ結果になるので使用の度にここから入手する
export const getRegularExpression = (regexType) => {
  switch (regexType) {
    case "en":
      return /[a-zA-Z]+/g;
    case "number":
      return /[0-9]+/g;
    case "ja":
      return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+/g;
    case "ko":
      // The Unicode ranges for Hangul (Korean characters) are:
      // Hangul Syllables (AC00–D7AF)
      // Hangul Jamo (1100–11FF)
      // Hangul Compatibility Jamo (3130–318F)
      // Hangul Jamo Extended-A (A960–A97F)
      // Hangul Jamo Extended-B (D7B0–D7FF)
      return /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]+/g;
    case "th":
      return /[\u0E01-\u0E5B]+/g;
    case "symbol":
      // return /[!"#$%&'()=~|{`+*}_?><^\\@[\];:\],./\n\t-]+/g;
      return /[！”＃＄％＆’（）＝～｜｛‘｝＊＋＿？＞＜、。・￥；：」＠「￥＾ー!"#$%&'()=~|{`+*}_?><^\\@[\];:\],./\n\t-]+/g;
    case "emoji":
      return emojiRegex();
    default:
      return;
  }
};

const extractTargetLanguageExpressions = (str, targetLanguage) => {
  const regularExpressionOfTargetLanguage =
    getRegularExpression(targetLanguage);
  let targetWords = str.match(regularExpressionOfTargetLanguage);

  return targetWords ? targetWords : [];
};
const extractNumbers = (str) => {
  const regularExpressionForNumbers = getRegularExpression("number");
  let matches = str.match(regularExpressionForNumbers);
  return matches ? matches : [];
};
const extractEmojis = (str) => {
  const regularExpressionForEmojis = getRegularExpression("emoji");
  let matches = str.match(regularExpressionForEmojis);
  return matches ? matches : [];
};
const extractSymbols = (str) => {
  const regularExpressionForSymbles = getRegularExpression("symbol");
  let matches = str.match(regularExpressionForSymbles);
  return matches ? matches.join("").split("") : [];
};
const extractOthers = (
  str,
  // 記号は最初に置き換えた方がいいので、記号のregex typeを先頭に置く。
  arrayOfRegexTypes
) => {
  if (!Array.isArray(arrayOfRegexTypes)) {
    return null;
  }
  let others = str;
  const PLACE_HOLDER = `"`;

  for (const regexType of arrayOfRegexTypes) {
    others = others.replaceAll(getRegularExpression(regexType), PLACE_HOLDER);
  }
  // for (const anExpressionArr of arrayOfArrayOfExpressions) {
  //   if (!Array.isArray(anExpressionArr)) {
  //     continue;
  //   }
  //   for (const anExpression of anExpressionArr) {
  //     if (typeof anExpression !== "string") {
  //       continue;
  //     }
  //     others = others.replaceAll(anExpression, PLACE_HOLDER);
  //   }
  // }

  others = others.replaceAll(" ", PLACE_HOLDER).replaceAll("　", PLACE_HOLDER);
  others = typeof others === "string" ? others.split(PLACE_HOLDER) : [];

  others = others.filter((anExpression) => {
    // ""を除く
    if (anExpression) {
      return true;
    } else {
      return false;
    }
  });

  return others;
};

/*
  const text = `"Hello,私は!?🤣😀🚅宇宙人である。", he said so. Yo*{`;
  const sentenceParts = getSentenceParts(text);
  console.log({ sentenceParts });

  sentenceParts: 
emojis:  ['🤣', '😀', '🚅']
others:  ['私は', '宇宙人である。']
symbols:  ['"', ',', '!', '?', '"', ',', '.', '*', '{']
targetLanguageExpressions:  ['Hello', 'he', 'said', 'so', 'Yo']
*/
export const getSentenceParts = (textInput, targetLanguage = "en") => {
  if (typeof textInput !== "string") {
    return;
  }
  const targetLanguageExpressions = extractTargetLanguageExpressions(
    textInput,
    targetLanguage
  );

  const numbers = extractNumbers(textInput);

  const emojis = extractEmojis(textInput);

  const symbols = extractSymbols(textInput);

  const others = extractOthers(textInput, [
    // 記号は最初に置き換えた方がいい
    "symbol",
    targetLanguage,
    "number",
    "emoji",

    // symbols,
    // targetLanguageExpressions,
    // numbers,
    // emojis,
  ]);

  return {
    emojis,
    numbers,
    others,
    symbols,
    targetLanguageExpressions,
  };
};

// convertTwoByteCharactersIntoOneByteCharactersで使う辞書を作る。
const getDictToConvertTwoByteCharactersIntoOneByteCharacters = () => {
  const twoByteCharacters = `ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ！＂＃＄％＆＇（）＝～｜｛｀｝＊＋＿？＞＜－＾＠［；：］，．／＼　０１２３４５６７８９`;

  const oneByteCharacters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&'()=~|{\`}*+_?><-^@[;:],./\\ 0123456789`;

  const dictToConvertTwoByteCharactersIntoOneByteCharacters = {};
  for (let i = 0; i < oneByteCharacters.length; i++) {
    const twoByteCharacter = twoByteCharacters[i];
    const oneByteCharacter = oneByteCharacters[i];

    if (twoByteCharacter === oneByteCharacter) {
    }
    dictToConvertTwoByteCharactersIntoOneByteCharacters[twoByteCharacter] =
      oneByteCharacter;
  }

  return dictToConvertTwoByteCharactersIntoOneByteCharacters;
};
// convertTwoByteCharactersIntoOneByteCharactersで使う辞書
const dictToConvertTwoByteCharactersIntoOneByteCharacters =
  getDictToConvertTwoByteCharactersIntoOneByteCharacters();

// 全角英数字や記号等を半角に変換する
export const convertTwoByteCharactersIntoOneByteCharacters = (str) => {
  if (typeof str !== "string") {
    return str;
  }

  const reg = new RegExp(
    "(" +
      Object.keys(dictToConvertTwoByteCharactersIntoOneByteCharacters).join(
        "|"
      ) +
      ")",
    "g"
  );
  return str.replace(reg, function (match) {
    return dictToConvertTwoByteCharactersIntoOneByteCharacters[match];
  });
};

/*
length字ごとにstrを分割したarrayを返す

const str="０１２３４５６７８９"
console.log(splitStringByLength({str,length:3}))
// ["０１２", "３４５", "６７８", "９"]
*/
export const splitStringByLength = ({ str, length }) => {
  const regex = new RegExp(`.{1,${length}}`, "g");
  return str.match(regex);
};

/*
delimiterで文を分割したarrayを返す。
stringのsplit()と違い、delimiterが残る。

console.log(
  splitTextByRegex({
    text: 'I am \na dog. I\n like to walk.',
    delimiter: '\n',
  })
);
// ["I am ", "\n", "a dog. I", "\n", " like to walk."]

*/
export function splitTextByRegex({ text, delimiter }) {
  const regex = new RegExp(`(${delimiter})`);
  const strArray = text.split(regex);

  if (Array.isArray(strArray)) {
    // ['私は', '\n', '', '\n', '日本人']を['私は', '\n', '\n', '日本人']にして返す。
    return strArray.filter((str) => {
      return str !== "";
    });
  }
}

/*
（０）
絵文字も考慮しつつsplitする。一文字ずつのstrが入ったarrayを返す。


（１）
絵文字は.splitで分けてしまうと、以下のようにバグる。
'😂'→['\uD83D', '\uDE02']


（２）
絵文字のsplit問題はIntl.Segmenterで解決可能。firefoxにIntl.Segmenterが対応したら書き換えよう
https://stackoverflow.com/questions/24531751/how-can-i-split-a-string-containing-emoji-into-an-array

（３）
例：

const text = "あ😄😃⛔🎠🚓ああ👨‍👨‍👧‍👧だ👦🏾ｄさｆ学習abcdABCD";
console.log({ arr: splitButNotSplittingEmoji(text) });
[
  "あ",
  "😄",
  "😃",
  "⛔",
  "🎠",
  "🚓",
  "あ",
  "あ",
  "👨‍👨‍👧‍👧",
  "だ",
  "👦🏾",
  "ｄ",
  "さ",
  "ｆ",
  "学",
  "習",
  "a",
  "b",
  "c",
  "d",
  "A",
  "B",
  "C",
  "D",
]
*/

export const splitButNotSplittingEmoji = (text) => {
  if (typeof text !== "string") {
    return null;
  }
  const emojiRegex = getRegularExpression("emoji");
  const strArr = splitTextByRegex({ text, delimiter: emojiRegex });
  if (!Array.isArray(strArr)) {
    return null;
  }
  const strsSplit = [];
  for (const str of strArr) {
    if (typeof str !== "string") {
      continue;
    }
    if (getRegularExpression("emoji").test(str)) {
      strsSplit.push(str);
    } else {
      // .splitだと過剰分割の恐れがあるのでES6の機能を使う
      // https://stackoverflow.com/a/37535876
      const chars = [...str];
      for (const aChar of chars) {
        strsSplit.push(aChar);
      }
    }
  }

  return strsSplit;
};
