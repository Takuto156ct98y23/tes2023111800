import { getObjects } from "./apiGeneral";

export const getVocs = async (words, signal = null) => {
  return getObjects({ words }, "vocabulary/vocs", signal);
};
