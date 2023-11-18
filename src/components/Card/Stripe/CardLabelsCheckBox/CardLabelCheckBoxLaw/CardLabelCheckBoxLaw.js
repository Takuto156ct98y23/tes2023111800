import { openNewTab } from "../../../../../utils/utilsWindow";
import classes from "../CardLabelsCheckBox.module.css";

const CardLabelCheckBoxLaw = () => {
  return (
    <div className={`${classes.CardLabelCheckBox} ${classes.law}`}>
      当社の
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("/terms-of-service");
        }}
      >
        利用規約
      </span>
      、
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("/privacy-policy");
        }}
      >
        プライバシーポリシー
      </span>
      、
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("/specified-commercial-transactions-act");
        }}
      >
        特定商取引法に基づく表示
      </span>
      に同意します。
    </div>
  );
};

export default CardLabelCheckBoxLaw;
