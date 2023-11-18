import React from "react";
import CardSearchUser from "../../Card/CardSearch/User/CardSearchUser";

import classes from "./ContentSearch.module.css";

const ContentSearch = () => {
  return (
    <div className={classes.ContentSearch}>
      <CardSearchUser />
    </div>
  );
};

export default ContentSearch;
