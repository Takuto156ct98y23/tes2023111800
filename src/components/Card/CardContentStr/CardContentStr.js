import { Fragment } from "react";
import classes from "./CardContentStr.module.css";

const CardContentStr = ({ contentStr }) => {
  return (
    <div className={classes.CardContentStr}>
      <div>
        {typeof contentStr === "string" ? (
          <ContentStr contentStr={contentStr} />
        ) : null}
      </div>
    </div>
  );
};

export default CardContentStr;

const ContentStr = ({ contentStr }) => {
  const strReplaced = contentStr
    .replaceAll("&lt;", "<")
    .replaceAll(/ /g, "\u00a0");
  const splitStr = strReplaced.split("\n");
  const RenderedStr = splitStr.map((aStr, index) => {
    return (
      <Fragment key={index}>
        {aStr === "" ? <br /> : <div>{aStr}</div>}
      </Fragment>
    );
  });

  return <div>{RenderedStr}</div>;
};
