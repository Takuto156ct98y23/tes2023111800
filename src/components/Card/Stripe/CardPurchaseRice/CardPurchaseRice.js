import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import CardPurchase from "../CardPurchase/CardPurchase";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import classes from "./CardPurchaseRice.module.css";
import { riceOf_riceMini } from "../../../../data/constants/riceConstants";
import CardLabelCheckBoxInfo from "../CardLabelsCheckBox/CardLabelCheckBoxInfo/CardLabelCheckBoxInfo";
import CardLabelCheckBoxLaw from "../CardLabelsCheckBox/CardLabelCheckBoxLaw/CardLabelCheckBoxLaw";
import { REACT_APP_BACKEND_URL } from "../../../../data/constants/network";

const arrayDescriptions = [
  // {
  //   text: `${riceOf_riceMini}ライスでAIと会話を${Math.round(
  //     riceOf_riceMini / ricePointsPerConversation
  //   )}回行うことが出来ます。（ここで「会話」とは、AIにメッセージを送信し、AIからの返答を受信するまでの１回を指します。）`,
  // },
  { text: "１ライスで１回キーワード翻訳を行えます。\n例：「走る」→「run」" },
  { text: "ライスは購入から６ヶ月間使用可能です。" },
];

const labelsCheckBox = [
  <CardLabelCheckBoxInfo />,

  <div>
    <p>{`ライスの有効期限は６ヶ月です。今回購入分の${riceOf_riceMini}ライスは購入時点から６ヶ月で失効し使用できなくなります。`}</p>
  </div>,

  <CardLabelCheckBoxLaw />,
];

const CardPurchaseRice = () => {
  return (
    <div className={classes.CardSubscription}>
      <ProductDisplay
        productName={`${riceOf_riceMini}ライス`}
        priceStr={"110円"}
        buttonLinkPath={`${REACT_APP_BACKEND_URL}/api/v1/commerce-stripe/create-checkout-session-token`}
        buttonLabel={"購入"}
        iconProduct={faBowlFood}
        arrayDescriptions={arrayDescriptions}
        labelsCheckBox={labelsCheckBox}
      />
      <CardPurchase />
    </div>
  );
};

export default CardPurchaseRice;
