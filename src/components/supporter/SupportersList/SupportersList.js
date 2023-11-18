import classes from "./SupportersList.module.css";
import { Fragment, useMemo } from "react";
import useSupporters from "../../../hooks/supporter/useSupporters";

const SupportersList = () => {
  const { supporters } = useSupporters();

  return (
    <div className={classes.SupportersList}>
      <SupportersListSupporters supporters={supporters} />
    </div>
  );
};

export default SupportersList;

const SupportersListSupporters = ({ supporters }) => {
  return (
    <Fragment>
      {Array.isArray(supporters) && 0 < supporters.length && (
        <div className={classes.SupportersListSupporters}>
          <div className={classes.SupportersListSupporters__top}>
            <p className={classes.SupportersListSupporters__top__title}>
              SUPPORTERS
            </p>
            <p className={classes.SupportersListSupporters__top__explanation}>
              {
                "RiceSpeakは以下のサポーターの方々によって支えられています(敬称略・並びはランダム)。"
              }
            </p>
            <p className={classes.SupportersListSupporters__top__disclaimer}>
              {
                "※このページは開発中です。現在掲載中のサポーターは全てAIが生成した架空のものであり、現実の法人・個人等とは一切関係がありません。"
              }
            </p>
          </div>
          <div className={classes.SupportersListSupporters__main}>
            {supporters.map((supporter, index) => {
              const isTheFirstSupporter = index === 0;

              return (
                <SupportersListSupporter
                  key={`SupportersListSupporter${index}`}
                  supporter={supporter}
                  isTheFirstSupporter={isTheFirstSupporter}
                />
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const SupportersListSupporter = ({ supporter, isTheFirstSupporter }) => {
  const name = useMemo(() => {
    return supporter?.name;
  }, [supporter]);

  return (
    <Fragment>
      {typeof name === "string" && (
        <div className={classes.SupportersListSupporter}>
          <p className={classes.SupportersListSupporter_text}>
            {isTheFirstSupporter ? name : `／${name}`}
          </p>
        </div>
      )}
    </Fragment>
  );
};
