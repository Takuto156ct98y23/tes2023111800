/*
以下のように（１個でも良いが）複数のclassNameを入力するのに使う。

    <label className={getClassName(classes.CardSetting, classes.testes)}>
      {label}
      <input type={type} value={value} onChange={onChange} />
    </label>
*/
export const getClassName = (...args) => {
  return [...args].join(" ");
};
