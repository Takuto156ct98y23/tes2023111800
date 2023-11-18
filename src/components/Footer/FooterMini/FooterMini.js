import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./FooterMini.module.css";
import { Fragment, useCallback, useMemo } from "react";

const pathOfRestoreHpPage = "/restore-hp";
const FooterMini = () => {
  const location = useLocation();

  const pathname = useMemo(() => {
    return location?.pathname;
  }, [location]);

  const displayFooterMini = useMemo(() => {
    return pathname !== pathOfRestoreHpPage;
  }, [pathname]);

  return (
    <Fragment>
      {displayFooterMini && (
        <div className={classes.FooterMini}>
          <ButtonRestoreHpPage />
          <ButtonCroudFunding />
        </div>
      )}
    </Fragment>
  );
};

export default FooterMini;

const ButtonRestoreHpPage = () => {
  const navigate = useNavigate();
  const jumpToRestoreHpPage = useCallback(() => {
    navigate(pathOfRestoreHpPage);
  }, [navigate]);

  return (
    <div
      className={[classes.ButtonRestoreHpPage, classes.FooterMini__item].join(
        " "
      )}
      onClick={jumpToRestoreHpPage}
    >
      <p className={classes.ButtonRestoreHpPage__text}>HP回復</p>
    </div>
  );
};

// クラファン期間中だけ表示するボタン。
const ButtonCroudFunding = () => {
  return (
    <Link
      to={
        "https://camp-fire.jp/projects/view/693519?utm_campaign=cp_po_share_c_msg_mypage_projects_show"
      }
      // 以下２行新しいtabで開くのに必要
      target="_blank"
      rel="noopener noreferrer"
      className={[classes.ButtonCroudFunding, classes.FooterMini__item].join(
        " "
      )}
    >
      <p className={classes.ButtonCroudFunding__text}>応援する！</p>
    </Link>
  );
};
