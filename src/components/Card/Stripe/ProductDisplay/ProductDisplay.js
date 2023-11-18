import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductDisplay.module.css";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

const ProductDisplay = ({
  // 商品名
  productName,
  // 価格表示用のstr
  priceStr,
  // ボタンを押すと飛ぶ先
  buttonLinkPath,
  // ボタンのlabel
  buttonLabel,
  // 商品名の下の解説
  descriptionMain = null,
  // 商品画像が有ればそのソース
  imgSrc = null,
  // 商品画像としてiconを用いる場合そのicon
  iconProduct = null,
  // 価格の下の解説列挙
  arrayDescriptions = [],
  message = "",
  // 購入前のチェック項目のarray
  labelsCheckBox = [],
  // trueだとButtonToCheckOutPageが常に非disabled
  enableButton = false,
}) => {
  const {
    highlighted,
    setHighlighted,
    disabled,
    checkboxValues,
    dictEntries,
    handleCheckboxChange,
  } = useAreaCheckBox({ labels: labelsCheckBox });

  return (
    <div className={classes.ProductDisplay}>
      <section className={classes.AreaProductDisplay}>
        <div className={classes.product}>
          <ImageProduct imgSrc={imgSrc} iconProduct={iconProduct} />
          <ProductName productName={productName} />

          <DescriptionMain descriptionMain={descriptionMain} />

          <Price priceStr={priceStr} />

          <Descriptions arrayDescriptions={arrayDescriptions} />
        </div>

        {Array.isArray(labelsCheckBox) && 0 < labelsCheckBox.length ? (
          <CheckBoxes
            highlighted={highlighted}
            checkboxValues={checkboxValues}
            dictEntries={dictEntries}
            handleCheckboxChange={handleCheckboxChange}
          />
        ) : null}

        <ButtonToCheckOutPage
          setHighlighted={setHighlighted}
          buttonLinkPath={buttonLinkPath}
          buttonLabel={buttonLabel}
          disabled={enableButton ? false : disabled}
        />
      </section>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default ProductDisplay;

const ImageProduct = ({ imgSrc, iconProduct }) => {
  return (
    <div className={classes.ImageProduct}>
      {imgSrc ? (
        <img
          className={`${classes.image} ${classes.img}`}
          src={imgSrc}
          alt="The cover of Stubborn Attachments"
        />
      ) : null}
      {iconProduct ? (
        <FontAwesomeIcon
          className={`${classes.image} ${classes.iconProduct}`}
          icon={iconProduct}
        />
      ) : null}
    </div>
  );
};

const ProductName = ({ productName }) => {
  return (
    <div className={classes.ProductName}>
      <p className={classes.ProductName__str}>{productName}</p>
    </div>
  );
};

const DescriptionMain = ({ descriptionMain }) => {
  return (
    <Fragment>
      {typeof descriptionMain === "string" ? (
        <div className={classes.DescriptionMain}>
          <p className={classes.DescriptionMain__str}>{descriptionMain}</p>
        </div>
      ) : null}
    </Fragment>
  );
};

const Price = ({ priceStr }) => {
  return (
    <div className={classes.Price}>
      <p className={classes.price__str}>{priceStr}</p>
    </div>
  );
};

const Descriptions = ({ arrayDescriptions }) => {
  return (
    <div className={classes.Descriptions}>
      {arrayDescriptions.map((aDescriptionObj, index) => {
        const uniqueKey = `Description${Date.now()}${index}`;
        const text = aDescriptionObj.text;
        const icon = aDescriptionObj.icon;
        return <Description text={text} icon={icon} key={uniqueKey} />;
      })}
    </div>
  );
};

const Description = ({ text, icon }) => {
  return (
    <div className={classes.Description}>
      <div className={classes.Description__iconWrapper}>
        <FontAwesomeIcon
          className={classes.Description__iconWrapper__icon}
          icon={icon ? icon : faSmile}
        />
      </div>

      <p className={classes.Description__text}>{text}</p>
    </div>
  );
};

const useAreaCheckBox = ({ labels = [] }) => {
  const [highlighted, setHighlighted] = useState(false);

  const labelsAreValid = useMemo(() => {
    return !Array.isArray(labels) || 0 < labels.length;
  }, [labels]);
  const dictLabels = useMemo(() => {
    if (!labelsAreValid) {
      return null;
    }
    const dict = {};
    for (const index in labels) {
      const aLabel = labels[index];
      dict[index] = aLabel;
    }
    return dict;
  }, [labels, labelsAreValid]);

  const [checkboxValues, setCheckboxValues] = useState(null);

  useEffect(() => {
    if (!labelsAreValid) {
      return;
    }
    const bools = {};
    const keys = Object.keys(dictLabels);
    for (const labelIndex of keys) {
      bools[labelIndex] = false;
    }
    setCheckboxValues(bools);
  }, [labelsAreValid, dictLabels]);

  const handleCheckboxChange = useCallback((event) => {
    const { name: labelIndex, checked } = event.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [labelIndex]: checked,
    }));
  }, []);

  const disabled = useMemo(() => {
    if (!checkboxValues) {
      return true;
    }
    const bools = Array.from(new Set(Object.values(checkboxValues)));
    const allTrue =
      bools && bools.length === 1 && bools[0] === true ? true : false;
    if (allTrue) {
      return false;
    } else {
      return true;
    }
  }, [checkboxValues]);

  const dictEntries = useMemo(() => {
    if (!dictLabels) {
      return null;
    }
    return Object.entries(dictLabels);
  }, [dictLabels]);

  return {
    highlighted,
    setHighlighted,
    disabled,
    checkboxValues,
    dictEntries,
    handleCheckboxChange,
  };
};

const CheckBoxes = ({
  highlighted,
  checkboxValues,
  dictEntries,
  handleCheckboxChange,
}) => {
  return (
    <Fragment>
      {checkboxValues && dictEntries ? (
        <div
          className={[
            classes.CheckBoxes,
            highlighted ? classes.CheckBoxes_highlighted : "",
          ].join(" ")}
        >
          <p className={classes.CheckBoxes__topText}>
            以下同意する場合チェックを入れて下さい。
          </p>
          {dictEntries.map(([labelIndex, aLabel]) => {
            return (
              <Checkbox
                key={`Checkbox${Date.now()}${labelIndex}`}
                labelIndex={labelIndex}
                checkboxValues={checkboxValues}
                handleCheckboxChange={handleCheckboxChange}
                aLabel={aLabel}
              />
            );
          })}
        </div>
      ) : null}
    </Fragment>
  );
};
const Checkbox = ({
  labelIndex,
  checkboxValues,
  handleCheckboxChange,
  aLabel,
}) => {
  return (
    <label className={classes.Checkbox}>
      <input
        className={classes.Checkbox__checkbox}
        type="checkbox"
        name={labelIndex}
        checked={checkboxValues[labelIndex]}
        onChange={handleCheckboxChange}
      />
      <div className={classes.Checkbox__label}>{aLabel}</div>
    </label>
  );
};

const ButtonToCheckOutPage = ({
  setHighlighted,
  disabled,
  buttonLinkPath,
  buttonLabel,
}) => {
  const onClickHandler = useCallback(() => {
    if (disabled) {
      setHighlighted(true);
    }
  }, [disabled, setHighlighted]);
  return (
    <div className={classes.ButtonToCheckOutPage} onClick={onClickHandler}>
      <form
        className={classes.ButtonToCheckOutPage__form}
        action={buttonLinkPath}
        method="POST"
      >
        <button
          className={[
            classes.ButtonToCheckOutPage__form__button,
            disabled
              ? classes.ButtonToCheckOutPage__form__button_disabled
              : null,
          ].join(" ")}
          id="checkout-and-portal-button"
          type="submit"
          disabled={disabled}
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

const Message = ({ message }) => {
  return (
    <div className={classes.Message}>
      <p className={classes.Message__str}>{message}</p>
    </div>
  );
};
