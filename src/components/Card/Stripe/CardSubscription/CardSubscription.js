import classes from "./CardSubscription.module.css";

import useSubscriptions from "../../../../hooks/commerceStripe/useSubscriptions";
import CardPurchase from "../CardPurchase/CardPurchase";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import {
  //  faBowlFood,
  faSquareUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import useMe from "../../../../hooks/user/me/useMe";
import CardLabelCheckBoxLaw from "../CardLabelsCheckBox/CardLabelCheckBoxLaw/CardLabelCheckBoxLaw";
import CardLabelCheckBoxInfo from "../CardLabelsCheckBox/CardLabelCheckBoxInfo/CardLabelCheckBoxInfo";
import { REACT_APP_BACKEND_URL } from "../../../../data/constants/network";

const arrayDescriptions = [
  { text: "性別・年齢・フリーワード検索といった詳細設定が可能に。" },
  // { text: "プレミアム会員限定コンテンツ" },
  // { text: "Rice付き", icon: faBowlFood },
];
const descriptionMain =
  "１カ月更新のサブスクリプション。パワーアップした機能でもっと思い通りに新しい友達を作ろう！";

// const openNewTab = (path) => {
//   // window.open("/rice");
//   window.open(path);
// };

const labelsCheckBox = [
  // <div>
  //   <p>
  //     ライスの有効期限は６ヶ月です。今回購入分の500ライスは購入時点から６ヶ月で失効し使用できなくなります。
  //   </p>
  // </div>,
  // <div className={classes.law}>
  //   当社の
  //   <span
  //     className={classes.link}
  //     onClick={() => {
  //       openNewTab("/terms-of-service");
  //     }}
  //   >
  //     利用規約
  //   </span>
  //   、
  //   <span
  //     className={classes.link}
  //     onClick={() => {
  //       openNewTab("/privacy-policy");
  //     }}
  //   >
  //     プライバシーポリシー
  //   </span>
  //   、
  //   <span
  //     className={classes.link}
  //     onClick={() => {
  //       openNewTab("/specified-commercial-transactions-act");
  //     }}
  //   >
  //     特定商取引法
  //   </span>
  //   に同意します。
  // </div>,
  <CardLabelCheckBoxInfo />,
  <CardLabelCheckBoxLaw />,
];

const CardSubscription = () => {
  const { amASubscriber, fetchAndRenewSubscriptions, loadingSubscriptions } =
    useSubscriptions();
  // const amASubscriber = false;

  const { me } = useMe();

  const buttonLinkPath = useMemo(() => {
    // amASubscriberがfalse以外のfalsyの場合もある
    if (amASubscriber === true) {
      return `${REACT_APP_BACKEND_URL}/api/v1/commerce-stripe/create-portal-session-subscription`;
    } else if (amASubscriber === false) {
      return `${REACT_APP_BACKEND_URL}/api/v1/commerce-stripe/create-checkout-session-subscription`;
    } else {
      return "";
    }
  }, [amASubscriber]);
  const buttonLabel = useMemo(() => {
    // amASubscriberがfalse以外のfalsyの場合もある
    if (amASubscriber === true) {
      return "購入情報を管理する";
    } else if (amASubscriber === false) {
      return "購入";
    } else {
      return "";
    }
  }, [amASubscriber]);
  const message = useMemo(() => {
    // amASubscriberがfalse以外のfalsyの場合もある
    if (amASubscriber === true) {
      return `${me ? me.name : ""}さんはプレミアム会員です。`;
    } else if (amASubscriber === false) {
      return "";
    } else {
      return "";
    }
  }, [amASubscriber, me]);

  return (
    <div className={classes.CardSubscription}>
      <ProductDisplay
        productName={"プレミアム会員"}
        priceStr={"990円/月"}
        buttonLinkPath={buttonLinkPath}
        buttonLabel={buttonLabel}
        iconProduct={faSquareUpRight}
        descriptionMain={descriptionMain}
        arrayDescriptions={arrayDescriptions}
        message={message}
        labelsCheckBox={amASubscriber ? null : labelsCheckBox}
        enableButton={amASubscriber}
      />
      <CardPurchase
        loading={loadingSubscriptions}
        callback={fetchAndRenewSubscriptions}
      />
    </div>
  );
};

export default CardSubscription;
