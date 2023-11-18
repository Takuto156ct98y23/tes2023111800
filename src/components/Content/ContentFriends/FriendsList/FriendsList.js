import classes from "./FriendsList.module.css";

import ContentInfiniteScroll from "../../ContentInfiniteScroll/ContentInfiniteScroll";
import useObjectsRead from "../../../../hooks/useObjectsRead";
import useObjectsGet from "../../../../hooks/useObjectsGet";
import useMe from "../../../../hooks/user/me/useMe";
import { Fragment } from "react";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";

const FriendsList = () => {
  const pathForContentObjects = "friendRequests/friends";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  const { isGuest } = useMe();

  return (
    <div className={classes.FriendsList}>
      {isGuest ? (
        <ContentLetsLogin />
      ) : (
        <Fragment>
          <h5>友達リスト</h5>
          <ContentInfiniteScroll
            pathGet={pathForContentObjects}
            cardType={"users"}
            objects={objects}
            hasMore={hasMore}
            getObjectsTailward={getObjectsTailward}
            getObjectsHeadward={getObjectsHeadward}
            displayButtonToLoadOlderObject={false}
          />
        </Fragment>
      )}
    </div>
  );
};

export default FriendsList;
