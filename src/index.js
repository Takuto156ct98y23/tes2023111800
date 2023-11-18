import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { initSocket } from "./socket";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/Error/ErrorBoundary/ErrorBoundary";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RICESPEAK_GOOGLE_OAUTH_CLIENT_ID } from "./data/constants/authConstants";

const isTestPublic =
  typeof process.env.REACT_APP_BACKEND_URL_TEST_PUBLIC === "string" &&
  0 < process.env.REACT_APP_BACKEND_URL_TEST_PUBLIC.length;

if (isTestPublic) {
  console.log({ env: process.env });
  alert("公開テスト中です。");
}

initSocket();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary fallback="予期せぬエラーが発生しました。">
    <GoogleOAuthProvider
      // clientId="703740537090-o3189sn73uvdpsfb6stbfflddnr9a9fr.apps.googleusercontent.com"
      // clientId={
      //   process.env.NODE_ENV === "development"
      //     ? "703740537090-o3189sn73uvdpsfb6stbfflddnr9a9fr.apps.googleusercontent.com"
      //     : ""
      // }
      clientId={RICESPEAK_GOOGLE_OAUTH_CLIENT_ID}
    >
      <BrowserRouter>
        <Provider store={store}>
          <React.StrictMode>
            {/* server side renderingの場合react-helmet-asyncとの整合性を要検討。 */}
            <HelmetProvider>
              <Helmet>
                {/* to disable zoom. mobileで不要なzoomを防ぐのに必要なmeta */}
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
              </Helmet>

              <App />
            </HelmetProvider>
          </React.StrictMode>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </ErrorBoundary>
  // <BrowserRouter>
  //   <Provider store={store}>
  //     <React.StrictMode>
  //       {/* server side renderingの場合react-helmet-asyncとの整合性を要検討。 */}
  //       <HelmetProvider>
  //         <Helmet>
  //           {/* to disable zoom. mobileで不要なzoomを防ぐのに必要なmeta */}
  //           <meta
  //             name="viewport"
  //             content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  //           />
  //         </Helmet>

  //         <App />
  //       </HelmetProvider>
  //     </React.StrictMode>
  //   </Provider>
  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
