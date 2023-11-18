import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SUPPORTER_TYPE_RESTOREHP_L,
  SUPPORTER_TYPE_RESTOREHP_M,
  SUPPORTER_TYPE_RESTOREHP_XL,
} from "../../../data/constants/supporterConstants";
import classes from "./ComponentSupporters.module.css";
import { handleError } from "../../../utils/utilsError";
import {
  convertMilliseconds,
  getIntXTimeUnitsLater,
  getTimeDifferenceInMilliseconds,
  timeToMilliseconds,
} from "../../../utils/utilsTime";
import useModalBase from "../../../hooks/Modal/useModalBase";
import useMyHitPointRead from "../../../hooks/hitPoint/useMyHitPointRead";
import useMyHitPointUpdate from "../../../hooks/hitPoint/useMyHitPointUpdate";
import ModalBase from "../../Modal/ModalBase/ModalBase";
import useEnvFromServer from "../../../hooks/envFromServer/useEnvFromServer";
import ButtonBasic from "../../button/Basic/ButtonBasic";
import usePointBar from "../../../hooks/bar/usePointBar";
import PointBar from "../../Bar/point/PointBar/PointBar";
import { Link } from "react-router-dom";
import useSupporters from "../../../hooks/supporter/useSupporters";

const ComponentSupporters = () => {
  const { supportersXL, supportersL, supportersM } = useSupporters();

  return (
    <div className={classes.ComponentSupporters}>
      <ComponentSupportersTop />
      <Supporters
        supporters={supportersXL}
        supportersType={SUPPORTER_TYPE_RESTOREHP_XL}
      />
      <Supporters
        supporters={supportersL}
        supportersType={SUPPORTER_TYPE_RESTOREHP_L}
      />
      <Supporters
        supporters={supportersM}
        supportersType={SUPPORTER_TYPE_RESTOREHP_M}
      />
    </div>
  );
};

export default ComponentSupporters;

const ComponentSupportersTop = () => {
  return (
    <div className={classes.ComponentSupportersTop}>
      <div className={classes.ComponentSupporters__title}>
        <p>クリックでHP回復</p>
      </div>
      <div className={classes.ComponentSupporters__explanation}>
        <p>サポーターをクリックするとリンク先に飛んで、HPが少し回復するよ😀</p>
      </div>
      <p className={classes.ComponentSupporters__disclaimer}>
        ※このページは開発中です。現在掲載中のサポーターは全てAIが生成した架空のものであり、現実の法人・個人等とは一切関係がありません。また、完成ページとは異なり、どのサポーターをクリックしてもクラウドファンディングサイトに飛ぶように設定しています。
      </p>
    </div>
  );
};

const Supporters = ({ supporters, supportersType }) => {
  const supportersCss = useMemo(() => {
    const cssArray = [classes.Supporters];
    switch (supportersType) {
      case SUPPORTER_TYPE_RESTOREHP_XL:
        cssArray.push(classes.Supporters_XL);
        break;
      case SUPPORTER_TYPE_RESTOREHP_L:
        cssArray.push(classes.Supporters_L);
        break;
      case SUPPORTER_TYPE_RESTOREHP_M:
        cssArray.push(classes.Supporters_M);
        break;
      default:
    }
    return cssArray.join(" ");
  }, [supportersType]);

  return (
    <div className={supportersCss}>
      <SupportersTitle supportersType={supportersType} />
      <AreaSupporters supporters={supporters} supportersType={supportersType} />
    </div>
  );
};

const SupportersTitle = ({ supportersType }) => {
  const title = useMemo(() => {
    switch (supportersType) {
      case SUPPORTER_TYPE_RESTOREHP_XL:
        return "プログラムサポーター";
      case SUPPORTER_TYPE_RESTOREHP_L:
        return "グリーンサポーター";
      case SUPPORTER_TYPE_RESTOREHP_M:
        return "オフィシャルサポーター";
      default:
    }
  }, [supportersType]);
  return (
    <Fragment>
      {typeof title === "string" && (
        <div className={classes.SupportersTitle}>
          <p className={classes.SupportersTitle__text}>{title}</p>
        </div>
      )}
    </Fragment>
  );
};
const AreaSupporters = ({ supporters, supportersType }) => {
  const cssAreaSupporters = useMemo(() => {
    const cssArray = [classes.AreaSupporters];

    switch (supportersType) {
      case SUPPORTER_TYPE_RESTOREHP_XL:
        cssArray.push(classes.AreaSupporters_XL);
        break;
      case SUPPORTER_TYPE_RESTOREHP_L:
        cssArray.push(classes.AreaSupporters_L);
        break;
      case SUPPORTER_TYPE_RESTOREHP_M:
        cssArray.push(classes.AreaSupporters_M);
        break;
      default:
    }

    return cssArray.join(" ");
  }, [supportersType]);

  return (
    <Fragment>
      {Array.isArray(supporters) && (
        <div className={cssAreaSupporters}>
          {supporters.map((aSupporter, index) => {
            if (!aSupporter) {
              return null;
            }
            return (
              <AreaSupporter
                key={`Supporter${supportersType}${index}`}
                supporter={aSupporter}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

const useSupporter = ({ supporter }) => {
  const supporterId = useMemo(() => {
    return supporter?._id;
  }, [supporter]);
  const name = useMemo(() => {
    return supporter?.name;
  }, [supporter]);
  const type = useMemo(() => {
    return supporter?.type;
  }, [supporter]);
  const url_link = useMemo(() => {
    return supporter?.url_link;
  }, [supporter]);
  const adFileName = useMemo(() => {
    return supporter?.adFileName;
  }, [supporter]);

  return { supporterId, name, type, url_link, adFileName };
};

const HP_TO_RESTORE = 30;
const timeToWaitInSeconds = 10;
const countDownIntervalInSeconds = 0.25;

const useHpOnModalInAreaSupporter = () => {
  const {
    countingDown,
    // timeRemainingInMilliSeconds,
    timeRemainingInSeconds,
    doCountDown,
    stopCountDown,
  } = useCountDown({
    timeToWaitInMilliSeconds: timeToMilliseconds(timeToWaitInSeconds, "second"),
    countDownIntervalInMilliSeconds: timeToMilliseconds(
      countDownIntervalInSeconds,
      "second"
    ),
  });

  const { isOpen, openAreaModalBase, closeAreaModalBase } = useModalBase();
  useEffect(() => {
    if (!isOpen) {
      // modalが閉じられたら、カウントダウンが止まるようにする
      stopCountDown();
    }
  }, [isOpen, stopCountDown]);

  const { currentHitPoints } = useMyHitPointRead();
  const { updatePointsInDB, getOrCreateMyHitPoint } = useMyHitPointUpdate();
  const [restoringHP, setRestoringHP] = useState(false);
  const [restoredHPSuccessfully, setRestoredHPSuccessfully] = useState(false);
  // 本来はサーバー側でやった方がいいが、HPをクライアント側で操作されたところで実害は無いので、実務上簡易にここで処理している
  const restoreHP = useCallback(async () => {
    setRestoringHP(true);
    try {
      if (typeof currentHitPoints !== "number") {
        return;
      }
      // 一定範囲内にポイントを修正する処理はサーバー側でやる
      const newHP = currentHitPoints + HP_TO_RESTORE;
      await updatePointsInDB(newHP);
      await getOrCreateMyHitPoint();

      setRestoredHPSuccessfully(true);
    } catch (err) {
      handleError({ err });
    } finally {
      setRestoringHP(false);
      setTimeout(() => {
        setRestoredHPSuccessfully(null);
        if (closeAreaModalBase) {
          closeAreaModalBase();
        }
      }, 3000);
    }
  }, [
    closeAreaModalBase,
    currentHitPoints,
    getOrCreateMyHitPoint,
    updatePointsInDB,
  ]);

  return {
    isOpen,
    openAreaModalBase,
    closeAreaModalBase,
    currentHitPoints,
    doCountDown,
    restoreHP,
    restoringHP,
    restoredHPSuccessfully,
    countingDown,
    timeRemainingInSeconds,
  };
};

const AreaSupporter = ({ supporter }) => {
  const { supporterId, name, type, url_link, adFileName } = useSupporter({
    supporter,
  });

  const {
    isOpen,
    openAreaModalBase,
    closeAreaModalBase,
    currentHitPoints,
    doCountDown,
    restoreHP,
    restoringHP,
    restoredHPSuccessfully,
    countingDown,
    timeRemainingInSeconds,
  } = useHpOnModalInAreaSupporter();

  const onClickHandler = useCallback(() => {
    // if (url_link) {
    //   openNewTab(url_link);
    // }
    if (isOpen) {
      return;
    }
    if (typeof currentHitPoints !== "number") {
      // hpの回復ができないので
      return;
    }
    // if (typeof id !== "string") {
    //   return;
    // }
    if (doCountDown) {
      doCountDown({ callBack: restoreHP });
    }
    // if (url_link) {
    //   openNewTab(url_link);
    // }
  }, [currentHitPoints, doCountDown, isOpen, restoreHP]);
  const displayImage = useMemo(() => {
    if (adFileName) {
      return true;
    } else {
      return false;
    }
  }, [adFileName]);
  return (
    <div className={classes.AreaSupporter}>
      <ModalBase
        customComponentToOpen={
          <Supporter
            supporterId={supporterId}
            adFileName={adFileName}
            name={name}
            // supporterTextCss={supporterTextCss}
            type={type}
            url_link={url_link}
            displayImage={displayImage}
            onClick={onClickHandler}
          />
        }
        isOpen={isOpen}
        openAreaModalBase={openAreaModalBase}
        closeAreaModalBase={closeAreaModalBase}
      >
        <div className={classes.AreaSupporter__modal}>
          <Supporter
            supporterId={supporterId}
            adFileName={adFileName}
            name={name}
            // supporterTextCss={supporterTextCss}
            type={type}
            url_link={url_link}
            displayImage={displayImage}
            onClick={onClickHandler}
          />
          <CountDown
            restoringHP={restoringHP}
            restoredHPSuccessfully={restoredHPSuccessfully}
            countingDown={countingDown}
            timeRemainingInSeconds={timeRemainingInSeconds}
            timeToWaitInSeconds={timeToWaitInSeconds}
            countDownInterval={countDownIntervalInSeconds}
          />
        </div>
      </ModalBase>
    </div>
  );
};

const Supporter = ({
  supporterId,
  adFileName,
  name,
  // supporterTextCss,
  type,
  url_link,
  displayImage = false,
  onClick,
}) => {
  const { RICESPEAK_CLOUDFRONT_USERIMAGE_URL } = useEnvFromServer();

  const imgSrc = useMemo(() => {
    return (
      typeof adFileName === "string" &&
      typeof RICESPEAK_CLOUDFRONT_USERIMAGE_URL === "string" &&
      `${RICESPEAK_CLOUDFRONT_USERIMAGE_URL}/${adFileName}`
    );
  }, [RICESPEAK_CLOUDFRONT_USERIMAGE_URL, adFileName]);

  const cssSupporter = useMemo(() => {
    const cssArray = [classes.Supporter];
    if (url_link) {
      cssArray.push(classes.Supporter__link);
    }
    return cssArray.join(" ");
  }, [url_link]);

  const supporterTextCss = useMemo(() => {
    const cssArray = [classes.AreaSupporter__text];
    switch (type) {
      case SUPPORTER_TYPE_RESTOREHP_XL:
        cssArray.push(classes.AreaSupporter__text_xlarge);
        break;
      case SUPPORTER_TYPE_RESTOREHP_L:
        cssArray.push(classes.AreaSupporter__text_large);
        break;
      default:
        cssArray.push(classes.AreaSupporter__text_default);
    }
    return cssArray.join(" ");
  }, [type]);

  return (
    <Fragment>
      {typeof name === "string" && (
        <Link
          to={url_link}
          // 以下２行新しいtabで開くのに必要
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonBasic className={cssSupporter} onClick={onClick}>
            <div className={classes.Supporter__wrapper}>
              {displayImage && imgSrc && (
                <img
                  className={classes.Supporter__image}
                  // onClick={onClick}
                  // 以下の設定に合わせて、CloudFront側でCloudFrontからのresにCORS関連のHeaderを加える処理が必要。
                  // 詳しくは：Google ドライブの会社用フォルダ　→　\CloudFront\distribute_s3_bucket_files.txt"
                  crossOrigin={"anonymous"}
                  src={imgSrc}
                  alt={`pic SupporterContent${supporterId}`}
                />

                // <img
                //   className={classes.Supporter__image}
                //   onClick={onClick}
                //   // 以下の設定に合わせて、CloudFront側でCloudFrontからのresにCORS関連のHeaderを加える処理が必要。
                //   // 詳しくは：Google ドライブの会社用フォルダ　→　\CloudFront\distribute_s3_bucket_files.txt"
                //   crossOrigin={"anonymous"}
                //   src={imgSrc}
                //   alt={`pic SupporterContent${supporterId}`}
                // />
              )}
              <p className={supporterTextCss}>{name}</p>
            </div>
          </ButtonBasic>{" "}
        </Link>
      )}
    </Fragment>
  );
};

const CountDown = ({
  restoringHP,
  restoredHPSuccessfully,
  countingDown,
  timeRemainingInSeconds,
  timeToWaitInSeconds,
  countDownInterval,
}) => {
  const { pointPercentage } = usePointBar({
    currentPoints:
      // 最初空っぽの状態から、最後MAXにする演出をしたいので
      timeToWaitInSeconds - timeRemainingInSeconds,
    maxPoint: timeToWaitInSeconds,
  });

  const messageCountDown = useMemo(() => {
    if (restoredHPSuccessfully) {
      return `HPが${HP_TO_RESTORE}回復しました！`;
    }
    if (restoringHP) {
      return "通信中...";
    }
    if (countingDown) {
      return "HPを回復しています...";
    }
    return "";
  }, [countingDown, restoredHPSuccessfully, restoringHP]);

  return (
    <div className={classes.CountDown}>
      <p>{messageCountDown}</p>

      <PointBar
        pointPercentage={pointPercentage}
        secondsTransition={countDownInterval}
        textOnBar={timeRemainingInSeconds}
        applyAGradientEffect={false}
      />
    </div>
  );
};

const useCountDown = ({
  timeToWaitInMilliSeconds,
  countDownIntervalInMilliSeconds,
}) => {
  const [countingDown, setCountingDown] = useState(false);
  const [timeRemainingInMilliSeconds, setTimeRemainingInMilliSeconds] =
    useState(timeToWaitInMilliSeconds);
  const timeRemainingInSeconds = useMemo(() => {
    if (typeof timeRemainingInMilliSeconds !== "number") {
      return null;
    }

    return convertMilliseconds(timeRemainingInMilliSeconds, "second");
  }, [timeRemainingInMilliSeconds]);

  const countDownIsCanceledRef = useRef(false);
  const timeoutIdRef = useRef(null);
  // countDownIntervalInMilliSecondsごとにtimeRemainingInMilliSecondsを更新する（カウントダウンする）
  const doCountDown = useCallback(
    (options = {}) => {
      let {
        timeWhenEndCountDown = null,
        // count down終了後に発動する関数
        callBack = null,
      } = options;
      if (!timeWhenEndCountDown) {
        timeWhenEndCountDown =
          typeof timeToWaitInMilliSeconds === "number"
            ? getIntXTimeUnitsLater(timeToWaitInMilliSeconds)
            : null;
      }

      setCountingDown(true);
      const timeoutId = setTimeout(() => {
        const timeRemaining = timeWhenEndCountDown
          ? getTimeDifferenceInMilliseconds(
              Date.now(),
              timeWhenEndCountDown,
              false
            )
          : null;
        const timeIsRemaining =
          typeof timeRemaining === "number" && 0 < timeRemaining;
        setTimeRemainingInMilliSeconds(timeIsRemaining ? timeRemaining : 0);

        const countDownIsCanceled = countDownIsCanceledRef.current;

        if (countDownIsCanceled) {
          countDownIsCanceledRef.current = false;
          timeoutIdRef.current = null;
          return;
        }

        if (timeIsRemaining) {
          doCountDown({ timeWhenEndCountDown, callBack });
        } else {
          setCountingDown(false);
          if (callBack) {
            callBack();
          }
          countDownIsCanceledRef.current = false;
          timeoutIdRef.current = null;
        }
      }, countDownIntervalInMilliSeconds);
      timeoutIdRef.current = timeoutId;
    },
    [countDownIntervalInMilliSeconds, timeToWaitInMilliSeconds]
  );
  const stopCountDown = useCallback(() => {
    if (!countingDown) {
      return;
    }
    countDownIsCanceledRef.current = true;
    const timeoutId = timeoutIdRef.current;
    clearTimeout(timeoutId);
    // カウントダウンを初期値に戻す
    setTimeRemainingInMilliSeconds(timeToWaitInMilliSeconds);
  }, [countingDown, timeToWaitInMilliSeconds]);
  return {
    countingDown,
    timeRemainingInMilliSeconds,
    timeRemainingInSeconds,
    doCountDown,
    stopCountDown,
  };
};
