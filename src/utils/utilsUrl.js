// urlStrを入れるとそれに関する情報の入ったオブジェクトを返す
// urlStrは"http://localhost:3000/upgrade?gorigori=true"のような文字列
export const getUrlInfo = (urlStr) => {
  const url = new URL(urlStr);
  const path = url.pathname; // "/upgrade"
  const queryParams = url.search; // "?gorigori=true"
  const fullPath = path + queryParams; // "/upgrade?gorigori=true"

  return {
    path,
    queryParams,
    fullPath,
  };
};

// // 新しいタブでpathを開く
// export const openNewTab = (path) => {
//   window.open(path);
// };
