import useMe from "../../../../hooks/user/me/useMe";
import CardSubscription from "../../../Card/Stripe/CardSubscription/CardSubscription";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";
import classes from "./ContentUpgrade.module.css";

const ContentUpgrade = () => {
  const { isGuest } = useMe();

  return (
    <div className={classes.ContentUpgrade}>
      {/* <h3 className={classes.ContentUpgrade__pageTitle}>アップグレード</h3> */}
      {isGuest ? <ContentLetsLogin /> : <CardSubscription />}
    </div>
  );
};

export default ContentUpgrade;
