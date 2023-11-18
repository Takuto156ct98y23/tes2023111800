import React from "react";
import CardInfiniteScroll from "../../Card/CardInfiniteScroll/CardInfiniteScroll";
import classes from "./ContentCards.module.css";
const ContentCards = React.forwardRef((props, ref) => {
  if (!props.objects) {
    return null;
  }

  const objects = props.objects;

  return (
    <div className={classes}>
      {objects.map((anObject, i) => {
        // return cardReturner(ArasuzyOrUserObj, props.cardType);

        // refPosition->arrayのどの位置にrefを仕込むか
        if (i === 0) {
          if (props.refPosition === "zero") {
            return (
              <div key={anObject._id} ref={ref}>
                <CardInfiniteScroll cardType={props.cardType} obj={anObject} />
              </div>
            );
          }
        }
        if (i === objects.length - 1) {
          if (props.refPosition === "last") {
            return (
              <div key={anObject._id} ref={ref}>
                <CardInfiniteScroll cardType={props.cardType} obj={anObject} />
              </div>
            );
          }
        }

        return (
          <div key={anObject._id}>
            <CardInfiniteScroll cardType={props.cardType} obj={anObject} />
          </div>
        );
      })}
    </div>
  );
});

export default ContentCards;
