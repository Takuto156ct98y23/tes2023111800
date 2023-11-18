import classes from "./NotificationToast.module.css";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { themeNotificationToast } from "../../data/constants/notificationToastConstants";

const NotificationToast = () => {
  return (
    <div className={classes.NotificationToast}>
      <ToastContainer
        className={classes.ToastContainer}
        // position="top-center"
        // autoClose={5000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme={themeNotificationToast}
        style={{ width: "fit-content" }}
      />
    </div>
  );
};

export default NotificationToast;
