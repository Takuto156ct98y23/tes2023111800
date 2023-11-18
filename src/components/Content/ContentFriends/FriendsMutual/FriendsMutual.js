import classes from "./FriendsMutual.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import useObjectsRead from "../../../../hooks/useObjectsRead";
import useObjectsGet from "../../../../hooks/useObjectsGet";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";
import { Fragment } from "react";
import ContentInfiniteScroll from "../../ContentInfiniteScroll/ContentInfiniteScroll";
import { useParams } from "react-router-dom";
import useUser from "../../../../hooks/user/useUser";

const FriendsMutual = () => {
  const params = useParams();

  const targetUserId = params.targetUserId;

  const { user: targetUser } = useUser(targetUserId);

  const pathForContentObjects = `friendRequests/${targetUserId}/mutual`;

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  const { isGuest } = useMe();

  return (
    <div classes={classes.FriendsMutual}>
      {isGuest ? (
        <ContentLetsLogin />
      ) : (
        <Fragment>
          {targetUser ? (
            <Fragment>
              <h5>{`${
                targetUser.name ? targetUser.name + "と" : ""
              }共通の友達`}</h5>
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
          ) : null}
        </Fragment>
      )}
    </div>
  );
};

export default FriendsMutual;
