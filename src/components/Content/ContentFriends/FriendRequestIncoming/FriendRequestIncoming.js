import { Fragment } from "react";
import classes from "./FriendRequestIncoming.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import useObjectsRead from "../../../../hooks/useObjectsRead";
import useObjectsGet from "../../../../hooks/useObjectsGet";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";
import ContentInfiniteScroll from "../../ContentInfiniteScroll/ContentInfiniteScroll";

const FriendRequestIncoming = () => {
  const pathForContentObjects = "friendRequests/incoming";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  const { isGuest } = useMe();

  return (
    <div className={classes.FriendRequestIncoming}>
      {isGuest ? (
        <ContentLetsLogin />
      ) : (
        <Fragment>
          <h5>未承認の友達申請</h5>
          <ContentInfiniteScroll
            pathGet={pathForContentObjects}
            cardType={"friendRequest"}
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

export default FriendRequestIncoming;

// const FriendRequestIncoming = () => {
//   const { meId } = useMe();
//   const [incomingRequests, setIncomingRequests] = useState(null);

//   const fetchIncomingRequests = useCallback(async () => {
//     if (!meId) {
//       return;
//     }
//     try {
//       const response = await getObjects(null, "friendRequests/incoming", null);
//       const _incomingRequests = response.data?.data?.data;
//       if (_incomingRequests) {
//         setIncomingRequests(_incomingRequests);
//       }
//     } catch (error) {
//       console.error("Error fetching incoming friend requests:", error);
//     }
//   }, [meId]);

//   useInitialLoad(
//     incomingRequests,
//     fetchIncomingRequests,
//     "FriendRequestIncoming"
//   );

//   return (
//     <div className={classes.FriendRequestIncoming}>
//       {incomingRequests ? (
//         <AreaFriendRequestIncoming incomingRequests={incomingRequests} />
//       ) : null}
//     </div>
//   );
// };

// export default FriendRequestIncoming;

// const AreaFriendRequestIncoming = ({ incomingRequests }) => {
//   return (
//     <div className={classes.AreaFriendRequestIncoming}>
//       <h2 className={classes.pageTitle}>未承認の友達申請</h2>
//       <div className={classes.main}>
//         {incomingRequests.length === 0 ? (
//           <p>未承認の友達申請はありません。</p>
//         ) : (
//           <ul className={classes.ul}>
//             {incomingRequests.map((request) => {
//               const userFrom = request?.from;
//               return (
//                 <li className={classes.listItem} key={request._id}>
//                   <FriendRequestButton viewedUser={userFrom} />
//                   <CardUser user={userFrom} jumpToUserPageByAnyClick={true} />
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };
