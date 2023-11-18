import { Fragment, useEffect, useState } from "react";
import classes from "./CardPurchase.module.css";

// urlのquery等に基づいてメッセージを表示する
const CardPurchase = ({ loading = null, callback = null }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("購入に成功しました！");
      if (callback) {
        callback();
      }
    }

    if (query.get("canceled")) {
      setMessage("購入手続きはキャンセルされました。");
    }
  }, [callback]);

  return (
    <Fragment>
      {message ? (
        <div className={classes.CardPurchase}>
          <Message message={loading ? "読み込み中..." : message} />
        </div>
      ) : null}
    </Fragment>
  );
};

export default CardPurchase;

const Message = ({ message }) => (
  <section className={classes.Message}>
    <p className={classes.Message__text}>{message}</p>
  </section>
);
