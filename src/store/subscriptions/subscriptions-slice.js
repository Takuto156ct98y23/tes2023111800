// subscriptions

import { createSlice } from "@reduxjs/toolkit";
import {
  convertUnixTimestampToDateObj,
  dateXisFuture,
} from "../../utils/utilsTime";

const initialState = {
  subscriptions: null,
  amASubscriber: null,
};

const subscriptionsSlice = createSlice({
  name: "subscriptionsSlice",
  initialState: initialState,
  reducers: {
    renewSubscriptions(state, action) {
      const subscriptionsNew = action.payload;
      state.subscriptions = subscriptionsNew;
      // state.amASubscriber = getAmASubscriber(subscriptionsNew);
      const subscriptionStatus = getSubscriptionStatus(subscriptionsNew);
      if (!subscriptionStatus) {
        return;
      }
      const { amASubscriber, amAPartialSubscriber } = subscriptionStatus;
      state.amASubscriber = amASubscriber;
      state.amAPartialSubscriber = amAPartialSubscriber;
    },
  },
});

export const subscriptionsSliceActions = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;

// const getAmASubscriber = (subscriptions) => {
//   if (subscriptions && 0 < subscriptions.length) {
//     // 何らかのエラーでsubscribeしているitemが複数あるかもしれないが、最初の一個しか考慮しない
//     const anItem = subscriptions[0];
//     const isActive = anItem?.plan?.active;
//     if (isActive === true) {
//       return true;
//     }
//   }

//   return false;
// };

const getSubscriptionStatus = (subscriptions) => {
  let amASubscriber = false;
  let amAPartialSubscriber = false;
  const now = Date.now();
  if (Array.isArray(subscriptions) && 0 < subscriptions.length) {
    for (const subscription of subscriptions) {
      if (!subscription) {
        return;
      }
      const { status, current_period_end, isPseudo } = subscription;

      const periodHasEnded = dateXisFuture(
        convertUnixTimestampToDateObj(current_period_end),
        now
      );
      if (periodHasEnded) {
        continue;
      }

      // const isActive = subscription?.plan?.active;
      const isActive = status === "active";
      if (isActive !== true) {
        continue;
      }

      if (isPseudo) {
        amAPartialSubscriber = true;
        continue;
      }

      amASubscriber = true;
    }
  }

  return { amASubscriber, amAPartialSubscriber };
};
