import { Fragment } from "react";
import classes from "./ModalSentenceData.module.css";
import ModalBase from "../ModalBase/ModalBase";
import SentenceData from "../../SentenceData/SentenceData";

/*
例文解説等のpop up

以下のように置くと、そのcomponentをクリックするとその下にpop upが表示される。
ただし綺麗に直下に出て来るとは言えないので、cssでの微調整が必要。

    <div className={classes.AreaCardMessage}>
      <Content message={message} onClick={openPopUp} />
      <ModalSentenceData
        sentenceStr={sentenceStr}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </div>

*/
const ModalSentenceData = ({ sentenceStr, modalIsOpen, closeModal }) => {
  return (
    <Fragment>
      {modalIsOpen ? <PopUp sentenceStr={sentenceStr} /> : null}

      {modalIsOpen ? (
        // ModalBaseのoverlayだけ使用
        // ModalBaseの本来の使い方とはちょっと違う使い方をしている
        <ModalBase
          isOpen={true}
          closeAreaModalBase={closeModal}
          // <span />は無意味だが、これを入れないと閉開ボタンが表示されてしまうので入れている。
          // 時間が有ったらここにnullを入れたら非表示になるように設定を変えておいて。
          customComponentToOpen={<span />}
          customComponentToClose={<span />}
        />
      ) : null}
    </Fragment>
  );
};

const PopUp = ({ sentenceStr }) => {
  return (
    <div className={classes.PopUp}>
      <div className={classes.popUp__content}>
        <div className={classes.popUp__pointer_up} />
        <SentenceData sentence={sentenceStr} />
      </div>
    </div>
  );
};

export default ModalSentenceData;
