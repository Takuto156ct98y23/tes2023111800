import classes from "./Cards.module.css";
import { Element as ElementScrollTo } from "react-scroll";
import CardInfiniteScroll from "../CardInfiniteScroll/CardInfiniteScroll";

const Cards = ({ documents, cardType }) => {
  return (
    <div className={classes.Cards}>
      {documents.map((aDoc, index) => {
        return (
          <div key={index}>
            {/* scroller.scrollTo(＜id＞);でここまでスクロール */}
            {aDoc?._id ? <ElementScrollTo name={`${aDoc._id}`} /> : null}

            <CardInfiniteScroll cardType={cardType} obj={aDoc} />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
