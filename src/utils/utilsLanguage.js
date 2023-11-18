const codesHead = new Set([
  "en",
  "ja",
  "ko",
  "th",
  // 20230718段階ではまだ少数の言語だけしか対応していないため、一時的に中国語はコメントアウトしている。
  //  "zh", "zh-TW"
]);
export const getOptionsDropDown = (options = {}) => {
  let { isoCodeGoogles, codesToOmit = [] } = options;
  if (!Array.isArray(isoCodeGoogles)) {
    return;
  }

  const arrHead = [];
  const arrTail = [];
  codesToOmit = new Set(codesToOmit);
  for (const isoCodeGoogle of isoCodeGoogles) {
    if (!isoCodeGoogle) {
      continue;
    }
    const { code, name } = isoCodeGoogle;
    if (codesToOmit.has(code)) {
      continue;
    }
    const anOption = { value: code, label: name };
    // ユーザーの多い言語は先頭に来るようにする
    if (codesHead.has(code)) {
      arrHead.push(anOption);
    } else {
      // 20230718段階ではまだ少数の言語だけしか対応していないため、一時的に強制falseにしている
      if (1 === 0) {
        arrTail.push(anOption);
      }
    }
  }
  const optionsDropDown = arrHead.concat(arrTail);
  return optionsDropDown;
};
