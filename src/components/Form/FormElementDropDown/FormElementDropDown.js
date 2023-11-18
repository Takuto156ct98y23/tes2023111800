import DropDown from "../../DropDown/DropDown/DropDown";
import LinkToUpgradePage from "../../link/LinkToUpgrade/LinkToUpgradePage";
import FormButtonTemplate from "../Template/FormButtonTemplate/FormButtonTemplate";
import FormElementTemplate from "../Template/FormElementTemplate/FormElementTemplate";
import FormMessageErrorTemplate from "../Template/FormMessage/FormMessageErrorTemplate/FormMessageErrorTemplate";
import FormMessageTemplate from "../Template/FormMessage/FormMessageTemplate/FormMessageTemplate";
import classes from "./FormElementDropDown.module.css";

const FormElementDropDown = ({
  label,
  labelSub = null,
  selectedOption,
  optionsDropDown,
  initialOption = null,
  dropDownOnChangeHandler,
  // onClick,
  // loading,
  message = null,
  errorLoading,
  errorMessage,
  onClick,
  // 全体
  disabled,
  // ボタンのみ
  buttonDisabled = false,

  isAForm = false,
  displayAButton = true,
  isMulti = false,

  activateLinkToUpgradePage = false,
}) => {
  return (
    <div className={classes.FormElementDropDown}>
      <LinkToUpgradePage on={activateLinkToUpgradePage}>
        <FormElementTemplate
          label={label}
          labelSub={labelSub}
          isAForm={isAForm}
          disabled={disabled}
        >
          <div className={classes.dropDownArea}>
            <DropDown
              selectedOption={selectedOption}
              dropDownItems={optionsDropDown}
              initialOption={initialOption}
              dropDownOnChangeHandler={dropDownOnChangeHandler}
              labelDropDown={null}
              isDisabled={disabled}
              isMulti={isMulti}
            />
            {displayAButton ? (
              <div className={classes.buttonContainer}>
                <FormButtonTemplate
                  label={"保存"}
                  onClick={onClick}
                  disabled={disabled || buttonDisabled}
                />
              </div>
            ) : null}
          </div>

          <FormMessageTemplate message={message} />
          <FormMessageErrorTemplate
            isError={errorLoading}
            message={errorMessage}
          />
        </FormElementTemplate>
      </LinkToUpgradePage>
    </div>
  );
};

export default FormElementDropDown;
