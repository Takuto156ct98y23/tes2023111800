import useMe from "../../../hooks/user/me/useMe";
import classes from "./Auth.module.css";
import SetUpInitial from "../../SetUpInitial/SetUpInitial";
import useMeSetUp from "../../../hooks/user/me/useMeSetUp";

const Auth = () => {
  useMeSetUp();
  const { meId } = useMe();

  return (
    <div className={classes.Auth}>
      {meId ? <SetUpInitial /> : <p>loading...</p>}
    </div>
  );
};

export default Auth;
