import classes from "./RegisterOrLogin.module.css";

import CardChangeAuthInfo from "../../Card/Auth/CardChangeAuthInfo/CardChangeAuthInfo";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { Fragment, useCallback, useState } from "react";
import ButtonBasic from "../../button/Basic/ButtonBasic";
import AppLogo from "../../Logo/AppLogo/AppLogo";
import OAuths from "../oAuth/OAuths/OAuths";
import { openNewTab } from "../../../utils/utilsWindow";

const RegisterOrLogin = () => {
  // const [displayLogin, setDisplayLogin] = useState(true);
  const [displayLogin, setDisplayLogin] = useState(false);
  const toggleDisplay = useCallback(() => {
    setDisplayLogin((prev) => !prev);
  }, []);

  return (
    <div className={classes.RegisterOrLogin}>
      <AppLogo />

      <AreaRegisterOrLogin displayLogin={displayLogin} />

      {displayLogin ? null : <CardLawRegister />}

      {displayLogin ? (
        <div className={classes.wrapperCardChangeAuthInfo}>
          <CardChangeAuthInfo />
        </div>
      ) : null}

      <ButtonBasic
        onClick={toggleDisplay}
        className={classes.RegisterOrLogin__button}
      >
        <p>{displayLogin ? "新規登録はこちら" : "ログイン画面に戻る"}</p>
      </ButtonBasic>
    </div>
  );
};
export default RegisterOrLogin;

const AreaRegisterOrLoginContentWidth = "230px";
const AreaRegisterOrLogin = ({ displayLogin }) => {
  return (
    <div className={classes.AreaRegisterOrLogin}>
      <div className={classes.AreaRegisterOrLogin__title}>
        <h5>{displayLogin ? "ログイン" : "新規登録"}</h5>
      </div>
      <div className={classes.AreaRegisterOrLogin__explanation}>
        <p>{`クリックで方法を選択`}</p>
      </div>
      <div className={classes.AreaRegisterOrLoginContent}>
        {
          // 強制非表示中
          1 === 0 && <OAuths width={AreaRegisterOrLoginContentWidth} />
        }

        {/* <OAuths width={AreaRegisterOrLoginContentWidth} /> */}
        <AreaAuthByEmail displayLogin={displayLogin} />
      </div>
    </div>
  );
};

const AreaAuthByEmail = ({ displayLogin }) => {
  const [displayAuthByEmail, setDisplayAuthByEmail] = useState(false);
  const toggleDisplayAuthByEmail = useCallback(() => {
    setDisplayAuthByEmail((prev) => !prev);
  }, []);

  return (
    <Fragment>
      {displayAuthByEmail ? (
        <Fragment>
          {displayLogin ? (
            <Fragment>
              <section className={classes.Login}>
                <Login />
              </section>

              {/* <div className={classes.wrapperCardChangeAuthInfo}>
            <CardChangeAuthInfo />
          </div> */}
            </Fragment>
          ) : (
            <Register />
          )}
        </Fragment>
      ) : (
        <ButtonAuthByEmail
          toggleDisplayAuthByEmail={toggleDisplayAuthByEmail}
        />
      )}
    </Fragment>
  );
};

const ButtonAuthByEmail = ({ toggleDisplayAuthByEmail }) => {
  return (
    <ButtonBasic
      onClick={toggleDisplayAuthByEmail}
      className={classes.RegisterOrLogin__button}
      style={{ width: AreaRegisterOrLoginContentWidth }}
    >
      <p>{"メールアドレス"}</p>
    </ButtonBasic>
  );
};

const CardLawRegister = () => {
  return (
    <div className={`${classes.CardLawRegister} ${classes.law}`}>
      新規登録を行うと当社の
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("/terms-of-service");
        }}
      >
        利用規約
      </span>
      、
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("/privacy-policy");
        }}
      >
        プライバシーポリシー
      </span>
      、
      <span
        className={classes.link}
        onClick={() => {
          openNewTab("/specified-commercial-transactions-act");
        }}
      >
        特定商取引法に基づく表示
      </span>
      に同意したものとみなされます。
    </div>
  );
};
