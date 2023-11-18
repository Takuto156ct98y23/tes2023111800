import { getObjects } from "./apiGeneral";

export const getSupporters = () => {
  return getObjects(null, `supporter/middleware_getSupporters`, null);
};
