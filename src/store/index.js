import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./form/form-slice";
import meReducer from "./me/me-slice";
import myHitPointReducer from "./hitPoint/myHitPoint-slice";
import hitPointDataSliceReducer from "./hitPoint/hitPointData-slice";
import socketReducer from "./socket/socket-slice";
import myUserGroupsReducer from "./myUserGroups/myUserGroups-slice";
import objectsReducer from "./objects/objects-slice";
import pageIdReducer from "./pageId/pageId-slice";
import subscriptionsReducer from "./subscriptions/subscriptions-slice";
import myRiceReducer from "./rice/myRice-slice";
import windowDimensionsReducer from "./util/windowDimensions/windowDimensions-slice.js";
import themeColorAppReducer from "./util/color/app/themeColorApp-slice.js";
import envFromServerSliceReducer from "./envFromServer/envFromServer-slice.js";
import myLanguageReducer from "./myLanguage/myLanguage-slice.js";
import languageDefaultSliceReducer from "./languageDefault/languageDefault-slice.js";

const store = configureStore({
  reducer: {
    form: formReducer,
    meReducer: meReducer,
    myHitPointReducer: myHitPointReducer,
    hitPointDataSliceReducer: hitPointDataSliceReducer,
    socketReducer: socketReducer,
    myUserGroupsReducer: myUserGroupsReducer,
    objectsReducer: objectsReducer,
    pageIdReducer: pageIdReducer,
    subscriptionsReducer: subscriptionsReducer,
    windowDimensionsReducer: windowDimensionsReducer,
    themeColorAppReducer: themeColorAppReducer,
    myRiceReducer: myRiceReducer,
    envFromServerSliceReducer: envFromServerSliceReducer,
    myLanguageReducer,
    languageDefaultSliceReducer,
  },
});

export default store;
