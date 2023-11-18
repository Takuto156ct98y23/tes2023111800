import classes from "./FriendRequestSent.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import useObjectsRead from "../../../../hooks/useObjectsRead";
import useObjectsGet from "../../../../hooks/useObjectsGet";
import ContentLetsLogin from "../../ContentLetsLogin/ContentLetsLogin";
import { Fragment } from "react";
import ContentInfiniteScroll from "../../ContentInfiniteScroll/ContentInfiniteScroll";

const FriendRequestSent = () => {
  const pathForContentObjects = "friendRequests/sent";

  const { objects } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  const { isGuest } = useMe();

  return (
    <div className={classes.FriendRequestSent}>
      {isGuest ? (
        <ContentLetsLogin />
      ) : (
        <Fragment>
          <h5>送信済みの友達申請</h5>
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

  // const { meId } = useMe();
  // const [sentRequests, setSentRequests] = useState(null);
  // const fetchSentRequests = useCallback(async () => {
  //   if (!meId) {
  //     return;
  //   }
  //   try {
  //     const response = await getObjects(
  //       null,
  //       // `friendRequests/sent?userId=${meId}`,
  //       "friendRequests/sent",
  //       null
  //     );

  //     const _sentRequests = response.data?.data?.data;
  //     if (_sentRequests) {
  //       setSentRequests(_sentRequests);
  //     }
  //     // setSentRequests(response.data);
  //   } catch (error) {
  //     console.error("Error fetching sent friend requests:", error);
  //   }
  // }, [meId]);

  // useInitialLoad(sentRequests, fetchSentRequests, "FriendRequestSent");

  // return (
  //   <div className={classes.FriendRequestSent}>
  //     {sentRequests ? <AreaSentRequests sentRequests={sentRequests} /> : null}
  //   </div>
  // );
};

export default FriendRequestSent;

// const AreaSentRequests = ({ sentRequests }) => {
//   return (
//     <div className={classes.AreaSentRequests}>
//       <h2 className={classes.pageTitle}>送信済みの友達申請</h2>
//       <div className={classes.main}>
//         {sentRequests.length === 0 ? (
//           <p>送信済みの友達申請はありません。</p>
//         ) : (
//           <ul className={classes.ul}>
//             {sentRequests.map((request) => (
//               <li className={classes.listItem} key={request._id}>
//                 <CardUser user={request.to} jumpToUserPageByAnyClick={true} />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };
