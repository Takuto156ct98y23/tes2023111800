// import React, { useEffect } from "react";
// import useMessageByBoolean from "../../../hooks/user/me/useMessageByBoolean";
// import ButtonBasic from "../buttonBasic/ButtonBasic";

// import classes from "./ButtonByBoolean.module.css";

// const ButtonByBoolean = ({
//   bool,
//   boolIfError = null,
//   handlerButtonByBoolean = null,
//   labelWhenTrue = null,
//   labelWhenFalse = null,
//   labelWhenChangeToFalse = null,
//   labelWhenError = null,
//   disabledWhenTrue = false,
// }) => {
//   const {
//     messageByBoolean,
//     // setMessageByBoolean,
//     // boolForMessage,
//     setBoolForMessage,
//     // haveError,
//     setHaveError,
//   } = useMessageByBoolean(
//     labelWhenTrue,
//     labelWhenFalse,
//     labelWhenChangeToFalse,
//     labelWhenError
//   );
//   useEffect(() => {
//     setBoolForMessage(bool);
//     setHaveError(boolIfError);
//   }, [bool, boolIfError, setBoolForMessage, setHaveError]);

//   return (
//     <div className={classes.ButtonByBoolean}>
//       <ButtonBasic
//         onClick={handlerButtonByBoolean}
//         disabled={boolIfError || (disabledWhenTrue && bool)}
//       >
//         {messageByBoolean}
//       </ButtonBasic>
//     </div>
//   );
// };

// export default ButtonByBoolean;
