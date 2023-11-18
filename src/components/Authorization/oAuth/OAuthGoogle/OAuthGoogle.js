import classes from "./OAuthGoogle.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../../api/apiGeneral";
import { handleError } from "../../../../utils/utilsError";
import { GoogleLogin } from "@react-oauth/google";

const OAuthGoogle = ({ className, width = null }) => {
  const navigate = useNavigate();
  const handlerAfterConsent = useCallback(
    async (credentialResponse) => {
      try {
        console.log({ credentialResponse });

        await postData(
          null,
          {
            credentialResponseFromGoogle: credentialResponse,
          },
          "auth/google/after-consent",
          null
        );

        navigate("/");
        window.location.reload();
      } catch (err) {
        handleError({ err });
        // if (error.name !== "CanceledError") {
        // }
      }
    },
    [navigate]
  );

  const errorHandler = useCallback(() => {
    console.log("Login Failed");
  }, []);

  return (
    <div className={[classes.AuthGoogle, className].join(" ")}>
      <GoogleLogin
        onSuccess={handlerAfterConsent}
        onError={errorHandler}
        // type={"standard"}
        // size={"large"}
        // theme={"outline"}
        // shape={"rectangular"}
        width={width}
      />
    </div>
  );
};

export default OAuthGoogle;
