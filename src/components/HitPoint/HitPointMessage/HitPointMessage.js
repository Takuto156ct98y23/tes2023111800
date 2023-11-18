import classes from "./HitPointMessage.module.css";
import { Fragment, useMemo } from "react";
import useMyHitPointRead from "../../../hooks/hitPoint/useMyHitPointRead";
import useMyLanguageRead from "../../../hooks/myLanguage/useMyLanguageRead";
import useMe from "../../../hooks/user/me/useMe";
import { getObjectByKeyValuePairFromObjectArray } from "../../../utils/arrayUtils";

const HitPointMessage = () => {
  const { currentHitPoints } = useMyHitPointRead();

  const { isoCodeGoogles } = useMyLanguageRead();

  const { me, languagePlusAndMinusAreTheSame } = useMe();

  const nameLanguagePlus = useMemo(() => {
    const isoCodeGoogle = me?.languagePlus?.isoCodeGoogle;

    const languagePlusInMyLanguage = getObjectByKeyValuePairFromObjectArray(
      "code",
      isoCodeGoogle,
      isoCodeGoogles
    );
    return languagePlusInMyLanguage?.name;
  }, [isoCodeGoogles, me]);

  const hitPointMessage = useMemo(() => {
    let messageAboutHitPoint = "";
    if (!nameLanguagePlus) {
      return messageAboutHitPoint;
    }

    if (languagePlusAndMinusAreTheSame) {
      messageAboutHitPoint =
        "母国語と学習したい言語が同じ言語に設定されているようです。";
      return messageAboutHitPoint;
    }
    if (currentHitPoints <= 0) {
      messageAboutHitPoint = `HPがゼロになってしまった！\n２４時間${nameLanguagePlus}しかつかえない！`;
      // "HPがゼロになってしまった！\n２４時間英語しかつかえない！";
    } else if (currentHitPoints < 40) {
      messageAboutHitPoint = `HPがゼロになりそうだ！\n${nameLanguagePlus}で文を書いてHPを回復しよう！`;
      // "HPがゼロになりそうだ！\n英語で文を書いてHPを回復しよう！";
    } else {
      messageAboutHitPoint = `${nameLanguagePlus}以外で書くとHPにダメージ`;
      // "英語以外で書くとHPにダメージ食らうぞ！\n（絵文字、数字、記号等はOK(例：😀😁😂01`+@)）";
    }
    return messageAboutHitPoint;
  }, [currentHitPoints, nameLanguagePlus, languagePlusAndMinusAreTheSame]);
  return (
    <Fragment>
      {typeof hitPointMessage === "string" ? (
        <div className={classes.hitPointMessage}>
          {/* <div className={classes.hitPointMessageWrapper}>
            <p className={classes.hitPointMessageText}>{hitPointMessage}</p>
          </div> */}

          <p className={classes.hitPointMessageText}>{hitPointMessage}</p>
        </div>
      ) : null}
    </Fragment>
  );
};
export default HitPointMessage;
