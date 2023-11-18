import { Fragment, useMemo } from "react";
import useMe from "../../../../../../hooks/user/me/useMe";
// import classes from "./FormElementLanguageMinus.module.css";
import FormElementLanguage from "../../FormElementLanguage/FormElementLanguage";

const FormElementLanguageMinus = () => {
  const { me } = useMe();

  const languageMinus = useMemo(() => {
    if (!me) {
      return;
    }
    return me.languageMinus;
  }, [me]);
  const languagePlus = useMemo(() => {
    if (!me) {
      return;
    }
    return me.languagePlus;
  }, [me]);

  return (
    <Fragment>
      {languageMinus ? (
        <FormElementLanguage
          label={"あなたの母国語"}
          field_language={"languageMinus"}
          language={languageMinus}
          // plusとminusで同じものを選んではいけない
          // 韓国語や英語は間もなく実装が完了するが、まだ未完成なので一時的に選択肢から外している
          codesToOmit={[languagePlus?.isoCodeGoogle, "ko", "en"]}
        />
      ) : null}
    </Fragment>
  );
};

export default FormElementLanguageMinus;
