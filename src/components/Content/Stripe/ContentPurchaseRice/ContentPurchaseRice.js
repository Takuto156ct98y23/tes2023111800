import CardPurchaseRice from "../../../Card/Stripe/CardPurchaseRice/CardPurchaseRice";
import classes from "./ContentPurchaseRice.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";

const ContentPurchaseRice = () => {
  const { isGuest } = useMe();

  return (
    <div className={classes.ContentPurchaseRice}>
      {/* <h3 className={classes.ContentPurchaseRice__pageTitle}>
        ライスをゲット！
      </h3> */}
      {isGuest ? <ContentLetsLogin /> : <CardPurchaseRice />}
    </div>
  );
};

export default ContentPurchaseRice;
