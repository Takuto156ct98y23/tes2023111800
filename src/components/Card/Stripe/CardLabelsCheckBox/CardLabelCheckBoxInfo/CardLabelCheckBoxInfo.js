import { openNewTab } from "../../../../../utils/utilsWindow";
import classes from "../CardLabelsCheckBox.module.css";

const CardLabelCheckBoxInfo = () => {
  return (
    <div className={classes.CardLabelCheckBox}>
      支払はStripe,
      Inc.に外部委託します。当社（言語研究開発合同会社）はクレジットカード番号等のお客様の情報は取得しません。（Stripe,
      Inc.について：
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("https://stripe.com/ja-us");
        }}
      >
        HP
      </span>
      、
      <span
        className={classes.link}
        onClick={() => {
          openNewTab(
            "https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%88%E3%83%A9%E3%82%A4%E3%83%97_(%E4%BC%81%E6%A5%AD)"
          );
        }}
      >
        Wikipedia
      </span>
      ）
    </div>
  );
};

export default CardLabelCheckBoxInfo;
