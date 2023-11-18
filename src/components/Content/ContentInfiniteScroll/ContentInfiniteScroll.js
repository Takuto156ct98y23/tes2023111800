import { Fragment, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import useInitialLoad from "../../../hooks/Api/useInitialLoad";
// import useObjectsGet from "../../../hooks/useObjectsGet";
import useObjectsRead from "../../../hooks/useObjectsRead";
import CardInfiniteScroll from "../../Card/CardInfiniteScroll/CardInfiniteScroll";
import { Element as ElementScrollTo, scroller } from "react-scroll";

import classes from "./ContentInfiniteScroll.module.css";
import useButtonByBoolean from "../../../hooks/Button/useButtonByBoolean";
import { handleError, isGoodError } from "../../../utils/utilsError";

const ContentInfiniteScroll = ({
  pathGet,
  // nullでもOK
  // searchObj,
  cardType = null,

  objects,
  hasMore,
  getObjectsTailward,
  getObjectsHeadward,
  displayButtonToLoadOlderObject = true,

  // クリックして選択するエリアを表示するならtrue
  displayAreaClick = false,
  // カードをクリックした時の挙動
  onClickACard = null,

  // 全データの読み込みが完了した時に出て来るメッセージ
  // これを指定しない場合デフォルトのメッセージが出る
  endMessage = "全データの読み込みが完了しました。",
  // 読み込み中メッセージ
  loadingMessage = "Loading...",
  // objectsがfalsyだったり空だったりした場合のメッセージ
  messageNoObject = "Loading...",
}) => {
  const { pathOfDisplaying } = usePathDisplaying(pathGet);

  const { disabledButtonToLoadOlderObject, funcScrollDown } =
    useScrollDown(getObjectsHeadward);

  return (
    <div className={classes.ContentInfiniteScroll}>
      {
        // Array.isArray(objects) &&
        //   ページが変わってないなら引き続き表示する（ページが変わったならcardtypeも変えなくてはならないので、一旦nullにする）
        pathOfDisplaying === pathGet ? (
          <div className={classes.AreaObjects}>
            {Array.isArray(objects) && 0 < objects.length ? (
              <Fragment>
                {displayButtonToLoadOlderObject && getObjectsHeadward ? (
                  <ButtonToLoadOlderObject
                    getObjectsHeadward={getObjectsHeadward}
                    disabled={disabledButtonToLoadOlderObject}
                  />
                ) : null}

                <InfiniteScroll
                  dataLength={objects ? objects.length : null} //This is important field to render the next data
                  next={getObjectsTailward}
                  hasMore={hasMore}
                  loader={<Loader loadingMessage={loadingMessage} />}
                  endMessage={
                    endMessage ? (
                      <p style={{ textAlign: "center" }}>{endMessage}</p>
                    ) : null
                  }
                  // below props only if you need pull down functionality
                  refreshFunction={funcScrollDown}
                  // refreshFunction={getObjectsHeadward}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={50}
                  // pullDownToRefreshContent={
                  //   <p style={{ textAlign: "center" }}>&#8595; 更新</p>
                  // }
                  // releaseToRefreshContent={
                  //   <p style={{ textAlign: "center" }}>&#8593; 更新</p>
                  // }
                >
                  {
                    // objects
                    Array.isArray(objects) && 0 < objects.length
                      ? objects.map((anObj, index) => {
                          return (
                            <div key={index}>
                              {anObj?._id ? (
                                <ElementScrollTo name={`${anObj._id}`} />
                              ) : null}
                              <CardInfiniteScroll
                                cardType={cardType ? cardType : pathGet}
                                obj={anObj}
                                displayAreaClick={displayAreaClick}
                                onClickACard={onClickACard}
                              />
                            </div>
                          );
                        })
                      : null
                  }
                </InfiniteScroll>
              </Fragment>
            ) : (
              <NoObjects messageNoObject={messageNoObject} />
            )}
          </div>
        ) : null
      }
    </div>
  );
};

export default ContentInfiniteScroll;

const Loader = ({ loadingMessage }) => {
  return (
    <Fragment>
      {typeof loadingMessage === "string" ? (
        <p style={{ textAlign: "center" }} className={classes.Loader}>
          {loadingMessage}
        </p>
      ) : null}
    </Fragment>
  );
};

const NoObjects = ({ messageNoObject }) => {
  return (
    <Fragment>
      {typeof messageNoObject === "string" ? (
        <p style={{ textAlign: "center" }}>{messageNoObject}</p>
      ) : null}
    </Fragment>
  );
};

// どのpathに基づいてCardInfiniteScrollを表示しているか
const usePathDisplaying = (pathGet) => {
  const [pathOfDisplaying, setPathOfDisplaying] = useState(null);
  useEffect(() => {
    setPathOfDisplaying(pathGet);
  }, [pathGet, setPathOfDisplaying]);

  return { pathOfDisplaying };
};

const scrollToPreviousHeadObj = (headObjectId) => {
  if (headObjectId) {
    // 以下のscroller.scrollToを利用するにはreact-scrollのElementを目標のcomponent内に「<ElementScrollTo name={`${anObj._id}`} />」のようにして仕込んでおく必要がある
    scroller.scrollTo(headObjectId);
    // scroller.scrollTo(previousHeadObj._id, { smooth: true });
  }
};

const useScrollDown = (getObjectsHeadward) => {
  const [disabledButtonToLoadOlderObject, setDisabledButtonToLoadOlderObject] =
    useState(false);

  const { headObjectId } = useObjectsRead();

  const funcScrollDown = useCallback(async () => {
    // ButtonToLoadOlderObjectとscroll downによる読み込みが同時発生しないようにする
    setDisabledButtonToLoadOlderObject(true);
    try {
      await getObjectsHeadward();

      scrollToPreviousHeadObj(headObjectId);

      setDisabledButtonToLoadOlderObject(false);
    } catch (err) {
      handleError({ err });
    }
  }, [getObjectsHeadward, headObjectId]);

  return { disabledButtonToLoadOlderObject, funcScrollDown };
};

const ButtonToLoadOlderObject = ({ getObjectsHeadward, disabled }) => {
  const { headObjectId } = useObjectsRead();

  const _funcWhenButtonPushed = useCallback(async () => {
    setSending(true);
    try {
      await getObjectsHeadward();

      scrollToPreviousHeadObj(headObjectId);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setHaveSendingError(true);
    }
    setSending(false);
  }, [getObjectsHeadward, headObjectId]);

  const [sending, setSending] = useState(false);
  const [haveSendingError, setHaveSendingError] = useState(false);

  const { ButtonByBoolean: ButtonToLoad } = useButtonByBoolean({
    funcOnClickOfArgument: _funcWhenButtonPushed,
    boolForButton: sending,
    errorboolForButton: haveSendingError,
    labelWhenTrue: "更新中",
    labelWhenFalse: "↑更に投稿を読み込む",
    labelWhenChangeToFalse: "更新完了",
    labelWhenError: "エラー",
    disabledWhenTrue: true,
    disabled: disabled,
  });

  return ButtonToLoad;
};
