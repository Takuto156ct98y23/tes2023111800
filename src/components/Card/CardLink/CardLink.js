import { useCallback } from "react";
import { Link } from "react-router-dom";
import classes from "./CardLink.module.css";

const CardLink = (props) => {
  const targetPath = props.targetPath;

  const pathPagePresent = window.location.pathname;

  const isSamePage = targetPath === pathPagePresent;

  const scrollInsideTheSamePage = useCallback((initialPosition) => {
    const scrollOptions = { left: 0 };
    scrollOptions.top = initialPosition;
    window.scrollTo(scrollOptions);
  }, []);

  const messagePagePathFragment = "message";
  const getInitialPosition = (targetPath) => {
    const targetPathLowered = targetPath.toLowerCase();

    if (targetPathLowered.includes(messagePagePathFragment)) {
      return document.body.scrollHeight;
    } else {
      return 0;
    }
  };

  // const navigate = useNavigate();

  function handleClick() {
    const initialPosition = getInitialPosition(targetPath);
    scrollInsideTheSamePage(initialPosition);
  }

  return (
    // <Link className={classes.CardLink} onClick={handleClick}>

    <div className={classes.CardLink}>
      {isSamePage ? (
        <div
          className={classes.Link}
          onClick={() => {
            // window.scrollTo(0, 0);
            handleClick();
          }}
        >
          {/* <h2>CardLink!!! isSamePage {`${isSamePage}`}</h2> */}
        </div>
      ) : (
        <Link
          className={classes.Link}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to={targetPath}
        >
          {/* <h2>CardLink!!! isSamePage {`${isSamePage}`}</h2> */}
        </Link>
      )}
    </div>
  );
};

export default CardLink;
