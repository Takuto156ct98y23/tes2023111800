import useObjectsRead from "../../../hooks/useObjectsRead";
import ContentInfiniteScroll from "../ContentInfiniteScroll/ContentInfiniteScroll";
import classes from "./ContentNotification.module.css";
import useMarkAsRead from "../../../hooks/Notification/useMarkAsRead";
import useObjectsGet from "../../../hooks/useObjectsGet";

const ContentNotification = () => {
  const pathForContentObjects = "notifications";

  const { objects: notifications } = useObjectsRead();

  const { hasMore, getObjectsTailward, getObjectsHeadward } = useObjectsGet({
    path: pathForContentObjects,
  });

  useMarkAsRead(notifications);

  return (
    <div className={classes.ContentNotification}>
      <div className={classes.ContentNotification__header}>
        <h5 className={classes.pageTitle}>通知</h5>
      </div>
      <div className={classes.ContentNotification__main}>
        <ContentInfiniteScroll
          pathGet={pathForContentObjects}
          cardType={"notifications"}
          objects={notifications}
          hasMore={hasMore}
          getObjectsTailward={getObjectsTailward}
          getObjectsHeadward={getObjectsHeadward}
          displayButtonToLoadOlderObject={false}
        />
      </div>
    </div>
  );
};

export default ContentNotification;
