import { getObjects, putData } from "./apiGeneral";

export const getTheNumberOfNotificationsUnread = (signal = null) => {
  return getObjects(null, "notifications/get-notifications-unread", signal);
};

export const markAsReadById = (notificationId, signal = null) => {
  if (!notificationId) {
    return;
  }
  return putData(
    null,
    null,
    `notifications/${notificationId}/markAsReadById`,
    signal
  );
};
