import "./App.css";
import "react-tabs/style/react-tabs.css";
import "react-toggle/style.css";
import "react-image-crop/dist/ReactCrop.css";
// :rootのoverrideが出来なくなってしまうので、必ずここでimportする
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, Navigate } from "react-router-dom";

import ContentNotification from "./components/Content/ContentNotification/ContentNotification";
import ComponentTest from "./components/ComponentTest/ComponentTest";

import ResetPasswordPage from "./components/ResetPage/ResetPasswordPage";
import ContentOneUser from "./components/Content/OneUser/ContentOneUser/ContentOneUser";
import ContentSettings from "./components/Content/ContentSettings/ContentSettings";
import ContentSearch from "./components/Content/ContentSearch/ContentSearch";
import ContentOneUserGroup from "./components/Content/ContentOneUserGroup/ContentOneUserGroup";
import ContentChatRoomOne from "./components/Content/ContentChatRoomOne/ContentChatRoomOne";
import ContentChatRoomsEdit from "./components/Content/ContentChatRoomsEdit/ContentChatRoomsEdit";
import ContentChatRoomsPrivate from "./components/Content/ContentChatRoomsPrivate/ContentChatRoomsPrivate";
import FriendsList from "./components/Content/ContentFriends/FriendsList/FriendsList";
import useLeaveApp from "./hooks/page/useLeaveApp";
import NotificationToast from "./components/Notification/NotificationToast";
import Auth from "./components/Authorization/Auth/Auth";
import ResetEmailPage from "./components/ResetPage/ResetEmailPage";
import ContentUpgrade from "./components/Content/Stripe/ContentUpgrade/ContentUpgrade";
import ContentPurchaseRice from "./components/Content/Stripe/ContentPurchaseRice/ContentPurchaseRice";
import useWindowDimensionsSetUp from "./hooks/util/windowDimensions/useWindowDimensionsSetUp";
import useResponsiveDesign from "./hooks/util/ResponsiveDesign/useResponsiveDesign";
import TermsOfService from "./components/Law/TermsOfService/TermsOfService";
import PrivacyPolicy from "./components/Law/PrivacyPolicy/PrivacyPolicy";
import SpecifiedCommercialTransactionsAct from "./components/Law/SpecifiedCommercialTransactionsAct/SpecifiedCommercialTransactionsAct";
import ContentInvincible from "./components/Content/Stripe/ContentInvincible/ContentInvincible";
import useThemeColorApp from "./hooks/util/color/useThemeColorApp";
import { useEffect } from "react";
import { userThemeColorAppDefault } from "./data/constants/userConstants";
import RegisterOrLogin from "./components/Authorization/RegisterOrLogin/RegisterOrLogin";
import FriendRequestIncoming from "./components/Content/ContentFriends/FriendRequestIncoming/FriendRequestIncoming";
import FriendRequestSent from "./components/Content/ContentFriends/FriendRequestSent/FriendRequestSent";
import FriendsMutual from "./components/Content/ContentFriends/FriendsMutual/FriendsMutual";
import ContentChatRoomRandom from "./components/Content/ContentChatRoomRandom/ContentChatRoomRandom";
import ContentChatRoomRandomConfig from "./components/Content/ContentChatRoomRandomConfig/ContentChatRoomRandomConfig";
import Patent from "./components/Law/Patent/Patent";
import ComponentSupporters from "./components/supporter/ComponentSupporters/ComponentSupporters";
import SupportersList from "./components/supporter/SupportersList/SupportersList";
import {
  chatRoomRandomConfigLength_Short,
  chatRoomRandomConfigScope_public,
} from "./data/constants/chatRoomRandomConfigConstants";
import LanguageDefault from "./components/language/LanguageDefault/LanguageDefault";

function App() {
  useLeaveApp();
  useWindowDimensionsSetUp();
  useResponsiveDesign();

  const { setThemeColorApp } = useThemeColorApp();
  useEffect(() => {
    setThemeColorApp(userThemeColorAppDefault);
  }, [setThemeColorApp]);

  return (
    <div className="App">
      <NotificationToast />
      <Routes>
        <Route element={<Auth />}>
          <Route
            path="/"
            // element={<Navigate replace to="chatroom/for-everyone" />}
            element={
              <Navigate
                replace
                to={`/chatrooms-random/${chatRoomRandomConfigScope_public}/${chatRoomRandomConfigLength_Short}`}
              />
            }
          />
          <Route
            path="/chatroom-me"
            element={<Navigate replace to="/chatroom/me" />}
          />

          {/* 非表示中 */}
          {/* <Route
            path="/chat-ai-enja"
            element={<Navigate replace to="/chatroom/ai-enja" />}
          />
          <Route
            path="/chat-ai-en"
            element={<Navigate replace to="/chatroom/ai-en" />}
          /> */}

          <Route
            path="chatrooms-private"
            element={<ContentChatRoomsPrivate />}
          />
          {/* <Route
            path="chatrooms-random-short"
            element={<ContentChatRoomRandomShort />}
          />
          <Route
            path="chatrooms-random-short-withFriendsOfMyFriends"
            element={<ContentChatRoomRandomShort />}
          />
          <Route
            path="chatrooms-random-short-withFriends"
            element={<ContentChatRoomRandomShort />}
          /> */}

          <Route
            path="chatrooms-random/:scope/:chatLength"
            element={<ContentChatRoomRandom />}
          />
          <Route
            path="chatrooms-random-config/:scope/:chatLength"
            element={<ContentChatRoomRandomConfig />}
          />

          {/* <Route
            path="chatrooms-random-long"
            element={<ContentChatRoomRandomLong />}
          /> */}
          <Route path="chatroom/:chatRoomId" element={<ContentChatRoomOne />} />

          <Route
            path="edit-chatroom/:chatRoomId"
            element={<ContentChatRoomsEdit />}
          />

          {/* search */}
          <Route path="search" element={<ContentSearch />} />

          {/* notification */}
          <Route path="notification" element={<ContentNotification />} />

          {/* one user */}
          <Route path="user/:userId" element={<ContentOneUser />} />

          <Route path="friends" element={<FriendsList />} />
          <Route
            path="friends/:targetUserId/mutual"
            element={<FriendsMutual />}
          />
          <Route
            path="friendRequest-incoming"
            element={<FriendRequestIncoming />}
          />
          <Route path="friendRequest-sent" element={<FriendRequestSent />} />

          {/* 純粋にuserGroup関連 */}
          <Route
            path="usergroup/:usergroupid"
            element={<ContentOneUserGroup />}
          />
          {/* chatRoom関連のページから飛ぶとき */}
          <Route
            path="usergroup/:usergroupid/:pagetitle/:chatroomid"
            element={<ContentOneUserGroup />}
          />

          {/* 設定 */}
          <Route path="settings" element={<ContentSettings />} />

          {/* stripe */}
          <Route path="upgrade" element={<ContentUpgrade />} />

          {
            // 強制非表示中
            false && <Route path="rice" element={<ContentPurchaseRice />} />
          }

          {
            // 強制非表示中
            false && <Route path="invincible" element={<ContentInvincible />} />
          }

          {/* supporter */}
          <Route path="restore-hp" element={<ComponentSupporters />} />
          <Route path="supporters-list" element={<SupportersList />} />

          {/* page not found */}
          <Route path="*" element={<p>loading...</p>} />

          {/* law */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/specified-commercial-transactions-act"
            element={<SpecifiedCommercialTransactionsAct />}
          />
          <Route path="/patent" element={<Patent />} />

          {/* page not found 01 */}
          <Route path="*" element={<p>loading...</p>} />
        </Route>
        {/* auth */}
        <Route path="/login" element={<RegisterOrLogin />} />

        {/* あとでけせ */}
        {/* <Route
          path="/asfklajfghiahjkfdshlogin"
          element={<RegisterOrLoginTestes />}
        /> */}

        <Route path="/reset/password/:token" element={<ResetPasswordPage />} />
        <Route path="/reset/email/:token" element={<ResetEmailPage />} />
        <Route
          path="/resetEmailByPassword"
          element={<ResetEmailPage needPassword={true} />}
        />

        {/* guestの言語の初期設定用（必要ならば使うpath） */}
        <Route
          path="/language-default/:languageMinusCode/:languagePlusCode"
          element={<LanguageDefault />}
        />
        <Route path="/test" element={<ComponentTest />} />
        <Route path="*" element={<p>ページが見つからないようです。</p>} />
      </Routes>
    </div>
  );
}

export default App;
