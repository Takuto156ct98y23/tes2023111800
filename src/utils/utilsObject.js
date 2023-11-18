export const objectMerged = (...args) => {
  const newObj = {};
  for (const anObj of args) {
    if (typeof anObj !== "object") {
      continue;
    }

    Object.assign(newObj, anObj);
  }
  return newObj;
};
