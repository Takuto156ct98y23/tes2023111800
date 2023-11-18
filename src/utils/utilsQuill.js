import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export const deltaToHtml = (deltaOps, cfg = {}) => {
  // https://github.com/nozer/quill-delta-to-html

  const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
  const html = converter.convert();
  return html;
};

export function deltaToPlaintext(delta) {
  return delta.reduce(function (text, op) {
    if (!op.insert)
      throw new TypeError("only `insert` operations can be transformed!");
    if (typeof op.insert !== "string") return text + " ";
    return text + op.insert;
  }, "");
}
