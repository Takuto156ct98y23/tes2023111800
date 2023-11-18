// http://localhost:3000/test

import classes from "./ComponentTest.module.css";

// import { googleLogout } from "@react-oauth/google";

// googleLogout();

const ComponentTest = () => {
  return (
    <div className={classes.ComponentTest}>
      {/* <TemporaryUpgrade /> */}
      {/* <TapGame /> */}
      {/* <AuthGoogle /> */}
      <br></br>
    </div>
  );
};

export default ComponentTest;

// const useTemporaryUpgrade = () => {};

// const TemporaryUpgrade = () => {
//   return (
//     <div className={classes.TemporaryUpgrade}>
//       <ButtonBasic>
//         <p>少しだけプレミアム会員になる！</p>
//       </ButtonBasic>
//     </div>
//   );
// };

// const redirectToGoogleAuthUrl = async () => {
//   try {
//     const res = await postData(null, null, "auth/google/auth-url", null);
//     const authUrl = res?.data?.data?.data?.authUrl;
//     if (typeof authUrl !== "string") {
//       return;
//     }
//     window.location.replace(authUrl);
//   } catch (err) {
//     handleError({ err });
//   }
// };

// const AuthGoogle = () => {
//   const onClickHandler = useCallback(async () => {
//     await redirectToGoogleAuthUrl();
//   }, []);

//   return <div onClick={onClickHandler}>AuthGoogle</div>;
// };
