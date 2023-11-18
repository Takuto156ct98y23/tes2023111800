import { getObjects } from "./apiGeneral";

export const getMyLanguage = () => {
  return getObjects(null, `language/get-my-language`, null);
};
