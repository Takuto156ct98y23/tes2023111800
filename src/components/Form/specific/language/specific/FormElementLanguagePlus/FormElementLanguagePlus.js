// import classes from "./FormElementLanguagePlus.module.css";

import { Fragment, useMemo } from "react";
import useMe from "../../../../../../hooks/user/me/useMe";
import FormElementLanguage from "../../FormElementLanguage/FormElementLanguage";

const FormElementLanguagePlus = () => {
  const { me } = useMe();

  const languagePlus = useMemo(() => {
    if (!me) {
      return;
    }
    return me.languagePlus;
  }, [me]);
  const languageMinus = useMemo(() => {
    if (!me) {
      return;
    }

    return me.languageMinus;
  }, [me]);

  return (
    <Fragment>
      {languagePlus ? (
        <FormElementLanguage
          label={"学習したい言語"}
          field_language={"languagePlus"}
          language={languagePlus}
          // plusとminusで同じものを選んではいけない
          codesToOmit={[languageMinus?.isoCodeGoogle]}
        />
      ) : null}
    </Fragment>
  );
};

export default FormElementLanguagePlus;
