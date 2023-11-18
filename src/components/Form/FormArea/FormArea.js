import { Fragment, useCallback, useMemo } from "react";
import FormButtonTemplate from "../Template/FormButtonTemplate/FormButtonTemplate";
import classes from "./FormArea.module.css";
import FormMessageTemplate from "../Template/FormMessage/FormMessageTemplate/FormMessageTemplate";
import FormMessageErrorTemplate from "../Template/FormMessage/FormMessageErrorTemplate/FormMessageErrorTemplate";

const FormArea = ({
  labelButton,
  // onClick,
  onSubmit,
  disabled,
  // ボタンのみdisableにするならこれを利用
  disabledButton = false,

  displayAButton = false,
  // displayAButtonがtrueの場合、底に表示するならtrue
  displayAButtonAtTheBottom = false,
  displayAButtonAtTheTop = false,

  message = null,
  // messageが存在する場合、底に表示するならtrue
  displayAMessageAtTheBottom = false,
  displayAMessageAtTheTop = false,

  errorLoading = null,
  errorMessage = null,
  // errorMessageが存在する場合、底に表示するならtrue
  displayAMessageErrorAtTheBottom = false,
  displayAMessageErrorAtTheTop = false,

  // FormAreaにformの機能を持たせるならtrue。
  // form内にform達を入れるとバグになるので、FormArea内の一つ一つの入力欄それぞれがそのまま一つの小さなformであるならfalse、単なる入力欄ならtrue。
  // formにすると、例えば不正な形式の入力を検知したりできる。
  isAForm = true,

  children,
  className,
}) => {
  return (
    <div className={classes.FormArea}>
      <FormContainer
        onSubmit={onSubmit}
        isAForm={isAForm}
        className={className}
      >
        {displayAMessageAtTheTop || displayAButtonAtTheTop ? (
          <div
            className={`${classes.FormArea_vicinity} ${classes.FormArea_top}`}
          >
            {displayAMessageAtTheTop && message ? (
              <AreaMessages message={message} />
            ) : null}

            {displayAButtonAtTheTop && displayAButton ? (
              <AreaButton
                labelButton={labelButton}
                disabled={disabled || disabledButton}
              />
            ) : null}
          </div>
        ) : null}

        {displayAMessageErrorAtTheTop && errorMessage ? (
          <AreaMessagesError
            errorLoading={errorLoading}
            errorMessage={errorMessage}
          />
        ) : null}

        {children}

        {displayAMessageAtTheBottom || displayAButtonAtTheBottom ? (
          <div
            className={`${classes.FormArea_vicinity} ${classes.FormArea_Bottom}`}
          >
            {displayAMessageAtTheBottom && message ? (
              <AreaMessages message={message} />
            ) : null}

            {displayAButtonAtTheBottom && displayAButton ? (
              <AreaButton
                labelButton={labelButton}
                disabled={disabled || disabledButton}
              />
            ) : null}
          </div>
        ) : null}

        {displayAMessageErrorAtTheBottom && errorMessage ? (
          <AreaMessagesError
            errorLoading={errorLoading}
            errorMessage={errorMessage}
          />
        ) : null}
      </FormContainer>
    </div>
  );
};

export default FormArea;

const AreaButton = ({ labelButton, disabled }) => {
  return (
    <div className={classes.AreaButton}>
      <FormButtonTemplate
        label={labelButton}
        // onClick={onClick}
        disabled={disabled}
      />
    </div>
  );
};

const AreaMessages = ({ message }) => {
  return (
    <div className={classes.AreaMessages}>
      <FormMessageTemplate message={message} />
    </div>
  );
};
const AreaMessagesError = ({ errorLoading, errorMessage }) => {
  return (
    <div className={classes.AreaMessagesError}>
      <FormMessageErrorTemplate isError={errorLoading} message={errorMessage} />
    </div>
  );
};

const FormContainer = ({ onSubmit, isAForm, children, className }) => {
  const _onSubmit = useCallback(
    (event) => {
      // デフォルトの強制reloadをキャンセル
      event.preventDefault();
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  const cssFormContainer = useMemo(() => {
    return [classes.FormContainer, className].join(" ");
  }, [className]);

  return (
    <Fragment>
      {isAForm ? (
        <form
          className={
            // classes.FormContainer
            cssFormContainer
          }
          onSubmit={_onSubmit}
        >
          {children}
        </form>
      ) : (
        // formではなくdiv
        <div
          className={
            // classes.FormContainer

            cssFormContainer
          }
        >
          {children}
        </div>
      )}
    </Fragment>
  );
};
