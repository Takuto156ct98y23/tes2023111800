import { Fragment, useCallback } from "react";
import classes from "./FormElementTemplate.module.css";

// const classNameTemplateContent = getClassName(
//   classes.TemplateContent,
//   classes.formChild
// );
// ユーザー入力欄のtemplate
const FormElementTemplate = ({
  label,
  labelSub = null,
  // FormElementTemplateにformの機能を持たせるならtrue。
  // 入力欄がそのまま一つの小さなformであるならtrue、単なる入力欄ならfalse。
  // formにすると、例えば不正な形式の入力を検知したりできる
  isAForm = false,
  onSubmit = null,
  disabled = false,
  children,
}) => {
  const _onSubmitHandler = useCallback(
    (event) => {
      // ページ自動更新防止
      event.preventDefault();
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <Fragment>
      {isAForm ? (
        <form
          className={classes.FormElementTemplate}
          onSubmit={_onSubmitHandler}
          disabled={disabled}
        >
          <TemplateContent label={label} labelSub={labelSub}>
            {children}
          </TemplateContent>
        </form>
      ) : (
        <div className={classes.FormElementTemplate}>
          <TemplateContent label={label} labelSub={labelSub}>
            {children}
          </TemplateContent>
        </div>
      )}
    </Fragment>
  );
};

export default FormElementTemplate;

const TemplateContent = ({ label, labelSub, children }) => {
  return (
    <div className={classes.TemplateContent}>
      <label className={classes.TemplateContentLabel}>
        <p className={classes.label}>{label}</p>
        {labelSub ? <p className={classes.labelSub}>{labelSub}</p> : null}
      </label>
      <div className={classes.TemplateContentChildren}>{children}</div>
    </div>
  );
};
