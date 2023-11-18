import classes from "./ContentInvincible.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";
import CardInvincible from "../../../Card/Stripe/CardInvincible/CardInvincible";

const ContentInvincible = () => {
  const {
    // me,
    isGuest,
  } = useMe();

  return (
    <div className={classes.ContentInvincible}>
      {/* <h3 className={classes.ContentInvincible__pageTitle}>無敵{me?.name}へ</h3> */}
      {isGuest ? <ContentLetsLogin /> : <CardInvincible />}
    </div>
  );
};

export default ContentInvincible;
