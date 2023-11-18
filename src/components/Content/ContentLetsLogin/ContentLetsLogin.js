import ButtonLogInORLogOut from "../../button/ButtonLogInORLogOut/ButtonLogInORLogOut";
import classes from "./ContentLetsLogin.module.css";

const ContentLetsLogin = () => {
  return (
    <div className={classes.ContentLetsLogin}>
      <h6>このコンテンツはログインするとお楽しみいただけます。</h6>
      <ButtonLogInORLogOut />
    </div>
  );
};

export default ContentLetsLogin;
