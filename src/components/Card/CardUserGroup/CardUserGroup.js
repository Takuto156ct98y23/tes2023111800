import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import classes from "./CardUserGroup.module.css";

const CardUserGroup = ({ obj }) => {
  const isOnlyMe = useMemo(() => {
    const type = obj ? obj.type : null;
    return type === "onlyMe";
  }, [obj]);

  const AreaUserGroup = useMemo(() => {
    const userGroupId = obj ? obj._id : null;

    const LinkToDetail = userGroupId ? (
      <Link to={`/usergroup/${userGroupId}`} className={classes.linkToDetail}>
        linkToDetail
      </Link>
    ) : null;

    return LinkToDetail;
  }, [obj]);

  return (
    <div className={classes.CardUserGroup}>
      {isOnlyMe ? null : (
        <div>
          {obj ? obj.name : null}
          {AreaUserGroup}
        </div>
      )}
    </div>
  );
};

export default CardUserGroup;
