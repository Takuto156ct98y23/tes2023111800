import classes from "./FormElementButton.module.css";
import FormElementTemplate from "../Template/FormElementTemplate/FormElementTemplate";
import FormMessageErrorTemplate from "../Template/FormMessage/FormMessageErrorTemplate/FormMessageErrorTemplate";
import FormMessageTemplate from "../Template/FormMessage/FormMessageTemplate/FormMessageTemplate";
import { Fragment } from "react";
import ModalBase from "../../Modal/ModalBase/ModalBase";
import ButtonBasic from "../../button/Basic/ButtonBasic";

// ボタンを押すとmodalを出すFormElement
const FormElementButton = ({
  label,
  labelSub = null,
  scrollableChildren = false,

  disabled,

  // onClick,
  // loading,
  message = null,
  errorLoading,
  errorMessage,

  isOpen,
  openAreaModalBase,
  closeAreaModalBase,
  // modalIsOpen,
  // stylesModal,
  // openModal,
  // closeModal,

  children,
}) => {
  return (
    <div className={classes.FormElementButton}>
      <FormElementTemplate label={label} labelSub={labelSub} isAForm={false}>
        <div className={classes.buttonContainer}>
          <ModalBase
            customComponentToOpen={
              <ButtonBasic disabled={disabled}>更新</ButtonBasic>
            }
            // modalを閉じるためのコンポーネント。特に指定が無ければデフォルトのアイコン（×）が使用される。
            // customComponentToClose = null,

            // childrenをscrollableにするならtrue
            // scrollableChildren = false,

            isOpen={isOpen}
            openAreaModalBase={openAreaModalBase}
            closeAreaModalBase={closeAreaModalBase}
            scrollableChildren={scrollableChildren}
          >
            {children}
          </ModalBase>

          {/* <AreaButtonModal
            modalIsOpen={modalIsOpen}
            stylesModal={stylesModal}
            openModal={openModal}
            closeModal={closeModal}
            disabled={disabled}
          >
            {children}
          </AreaButtonModal> */}
        </div>

        {disabled ? null : (
          <Fragment>
            <FormMessageTemplate message={message} />
            <FormMessageErrorTemplate
              isError={errorLoading}
              message={errorMessage}
            />
          </Fragment>
        )}
        {/* <FormMessageTemplate message={message} />
        <FormMessageErrorTemplate
          isError={errorLoading}
          message={errorMessage}
        /> */}
      </FormElementTemplate>
    </div>
  );
};

export default FormElementButton;

// const AreaButtonModal = ({
//   modalIsOpen,
//   stylesModal,
//   openModal,
//   closeModal,
//   disabled,

//   children,
// }) => {
//   return (
//     <ButtonModal
//       openButtonStr={"更新する"}
//       closeButtonStr={"閉じる"}
//       modalIsOpen={modalIsOpen}
//       stylesModal={stylesModal}
//       openModal={openModal}
//       closeModal={closeModal}
//       disabled={disabled}
//     >
//       {children}
//     </ButtonModal>
//   );
// };
