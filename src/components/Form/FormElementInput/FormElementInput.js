import classes from "./FormElementInput.module.css";
import FormElementTemplate from "../Template/FormElementTemplate/FormElementTemplate";
import FormButtonTemplate from "../Template/FormButtonTemplate/FormButtonTemplate";
import FormMessageTemplate from "../Template/FormMessage/FormMessageTemplate/FormMessageTemplate";
import FormMessageErrorTemplate from "../Template/FormMessage/FormMessageErrorTemplate/FormMessageErrorTemplate";
import LinkToUpgradePage from "../../link/LinkToUpgrade/LinkToUpgradePage";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const FormElementInput = ({
  label,
  labelSub = null,
  type,
  value,
  onChange,
  onClick,
  message = null,
  errorLoading,
  errorMessage = null,
  displayAtMark = false,
  displayAButton = true,
  placeholder = null,
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  autoComplete = null,
  required = false,
  maxLength = null,
  isAForm = false,
  // これがtrueだとtextarea、falseだとinputになる。複数行入力したいならtextarea、そうでないならinput。
  isTextarea = false,
  style = null,
  accept = null,
  name = null,

  disabled = false,

  activateLinkToUpgradePage = false,

  // 設定したchildrenだけを右側の入力エリアに表示したい場合true
  displayOnlyChildren = false,

  children = null,
}) => {
  const uniqueId = `${Date.now()}${uuidv4()}`;

  return (
    <div className={classes.FormElementInput}>
      <LinkToUpgradePage on={activateLinkToUpgradePage}>
        <FormElementTemplate
          label={label}
          labelSub={labelSub}
          isAForm={isAForm}
        >
          <div className={classes.inputField}>
            {children ? children : null}

            {displayOnlyChildren ? null : (
              <div className={classes.inputFieldInput}>
                <div className={classes.divInput}>
                  <div className={classes.AreaTextarea}>
                    {displayAtMark ? <p className={classes.atMark}>@</p> : null}
                    {isTextarea ? (
                      <textarea
                        className={`${classes.userInput} ${classes.textarea}`}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        required={required}
                        maxLength={maxLength}
                        style={{
                          ...style,
                        }}
                        accept={accept}
                        name={name}
                        disabled={disabled}
                      />
                    ) : (
                      <Fragment>
                        {type === "file" ? (
                          <label
                            //  htmlFor="formId"
                            htmlFor={uniqueId}
                          >
                            <FontAwesomeIcon icon={faUpload} />
                            <input
                              // id="formId"
                              id={uniqueId}
                              className={`${classes.userInput} ${classes.input} ${classes.hidden}`}
                              type={type}
                              value={value}
                              onChange={onChange}
                              placeholder={placeholder}
                              autoComplete={autoComplete}
                              required={required}
                              maxLength={maxLength}
                              style={{
                                ...style,
                              }}
                              accept={accept}
                              name={name}
                              disabled={disabled}
                            />
                          </label>
                        ) : (
                          <input
                            // id="AreaTextarea__input"
                            id={uniqueId}
                            className={`${classes.userInput} ${classes.input}`}
                            type={type}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            required={required}
                            maxLength={maxLength}
                            style={{
                              ...style,
                            }}
                            accept={accept}
                            name={name}
                            disabled={disabled}
                          />
                        )}
                      </Fragment>
                    )}
                  </div>
                </div>
                {displayAButton ? (
                  <FormButtonTemplate
                    label={"保存"}
                    onClick={onClick}
                    disabled={disabled}
                  />
                ) : null}
              </div>
            )}

            {/* <div className={classes.inputFieldInput}>
              <div className={classes.divInput}>
                <div className={classes.AreaTextarea}>
                  {displayAtMark ? <p className={classes.atMark}>@</p> : null}
                  {isTextarea ? (
                    <textarea
                      className={`${classes.userInput} ${classes.textarea}`}
                      type={type}
                      value={value}
                      onChange={onChange}
                      placeholder={placeholder}
                      autoComplete={autoComplete}
                      required={required}
                      maxLength={maxLength}
                      style={{
                        ...style,
                      }}
                      accept={accept}
                      name={name}
                      disabled={disabled}
                    />
                  ) : (
                    <Fragment>
                      {type === "file" ? (
                        <label
                          //  htmlFor="formId"
                          htmlFor={uniqueId}
                        >
                          <FontAwesomeIcon icon={faUpload} />
                          <input
                            // id="formId"
                            id={uniqueId}
                            className={`${classes.userInput} ${classes.input} ${classes.hidden}`}
                            type={type}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            required={required}
                            maxLength={maxLength}
                            style={{
                              ...style,
                            }}
                            accept={accept}
                            name={name}
                            disabled={disabled}
                          />
                        </label>
                      ) : (
                        <input
                          // id="AreaTextarea__input"
                          id={uniqueId}
                          className={`${classes.userInput} ${classes.input}`}
                          type={type}
                          value={value}
                          onChange={onChange}
                          placeholder={placeholder}
                          autoComplete={autoComplete}
                          required={required}
                          maxLength={maxLength}
                          style={{
                            ...style,
                          }}
                          accept={accept}
                          name={name}
                          disabled={disabled}
                        />
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
              {displayAButton ? (
                <FormButtonTemplate
                  label={"保存"}
                  onClick={onClick}
                  disabled={disabled}
                />
              ) : null}
            </div> */}
          </div>

          {message || errorLoading ? (
            <div className={classes.areaMessages}>
              <FormMessageTemplate message={message} />
              <FormMessageErrorTemplate
                isError={errorLoading}
                message={errorMessage}
              />
            </div>
          ) : null}
        </FormElementTemplate>
      </LinkToUpgradePage>
    </div>
  );
};

export default FormElementInput;
