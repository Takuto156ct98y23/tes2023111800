import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import useMe from "../../../hooks/user/me/useMe";
import ContentLetsLogin from "../ContentLetsLogin/ContentLetsLogin";
import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";

import classes from "./ContentUserGroupList.module.css";
import useObjectsRead from "../../../hooks/useObjectsRead";
import useObjectsGet from "../../../hooks/useObjectsGet";

const ContentUserGroupList = () => {
  const { isGuest } = useMe();

  return (
    <Fragment>
      {isGuest ? <ContentLetsLogin /> : <AreaUserGroupList />}
    </Fragment>
  );
};

export default ContentUserGroupList;

const AreaUserGroupList = () => {
  const searchObj = useMemo(() => {
    return {
      // getDocument: true,
      fetchDetail: true,
      ContentUserGroupList: true,
    };
  }, []);

  const LinkToUserGroupCreationPage = useMemo(() => {
    return (
      <Link to={`/usergroup/new`} className={classes.linkPlate}>
        LinkToUserGroupCreationPage
      </Link>
    );
  }, []);

  const pathForContentObjects = "userGroup/custom";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
    reqQuery: searchObj,
  });

  return (
    <div className={classes.ContentUserGroupList}>
      <h2>ContentUserGroupList!!</h2>
      <h2>カスタムusergroup一覧ページ</h2>
      {LinkToUserGroupCreationPage}
      <ContentInfiniteScroll
        // searchObj={searchObj}
        // pathGet={pathForContentObjects}
        // pathPost={pathForContentObjects}
        // cardType={"userGroup"}

        pathGet={pathForContentObjects}
        cardType={"userGroup"}
        objects={objects}
        hasMore={hasMore}
        getObjectsTailward={getObjectsTailward}
        getObjectsHeadward={getObjectsHeadward}
      />
    </div>
  );
};
