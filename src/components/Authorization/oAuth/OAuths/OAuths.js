import OAuthGoogle from "../OAuthGoogle/OAuthGoogle";
import classes from "./OAuths.module.css";

const OAuths = ({ className, width }) => {
  return (
    <div className={classes.OAuths}>
      <OAuthGoogle className={className} width={width} />
    </div>
  );
};

export default OAuths;
