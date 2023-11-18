import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLanguageDefaultSetUp from "../../../hooks/language/languageDefault/useLanguageDefaultSetUp";

// "/language-default/:languageMinusCode/:languagePlusCode"経由で"/"に入ると、state "languageDefault"を設定した上でアプリを起動できる。
// すると、ユーザー側での設定抜きで、例えば韓国語を学習したい言語に設定する等可能になる

/*
例：

http://localhost:3000/language-default/th/ko
からこのアプリに入ると、
languageMinusがタイ語
languagePlusが韓国語
に設定されたguestユーザーが生成される



*/

const LanguageDefault = () => {
  const params = useParams();
  const languageMinusCode = params.languageMinusCode;
  const languagePlusCode = params.languagePlusCode;

  const { setLanguageDefault } = useLanguageDefaultSetUp();

  const navigate = useNavigate();
  useEffect(() => {
    setLanguageDefault({
      languageMinusCodeDefault: languageMinusCode,
      languagePlusCodeDefault: languagePlusCode,
    });
    navigate("/");
  }, [languageMinusCode, languagePlusCode, setLanguageDefault, navigate]);
};

export default LanguageDefault;
