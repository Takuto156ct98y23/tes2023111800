import classes from "./ImageCropper.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { ReactCrop } from "react-image-crop";

// 画像をcropする
// useImageCropperとセットで使う
const ImageCropper = (objImageCropper = {}) => {
  const {
    imgSrc,
    // setImgSrc,
    previewCanvasRef,
    imgRef,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    scale,
    setScale,
    rotate,
    setRotate,
    aspect,
    // setAspect,
    onSelectFile,
    onImageLoad,
    handleToggleAspectClick,
    // sendCroppedImageToServer,
    displayScaleAdjuster = false,
    displayRotationAdjuster = false,
    displayResetButton = false,
  } = objImageCropper;

  const uniqueId = `${Date.now()}${uuidv4()}`;
  return (
    <div className={classes.ImageCropper}>
      <div className={classes.CropControls}>
        <label className={classes.ImageCropper__AreaIcon} htmlFor={uniqueId}>
          <p className={classes.ImageCropper__AreaIcon__text}>画像を選択</p>
          <FontAwesomeIcon
            className={classes.ImageCropper__AreaIcon__icon}
            icon={faUpload}
          />
          <input
            className={classes.ImageCropper__AreaIcon__input}
            id={uniqueId}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
          />
        </label>
        {displayScaleAdjuster ? (
          <div>
            <label htmlFor="scale-input">Scale: </label>
            <input
              id="scale-input"
              type="number"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
        ) : null}
        {displayRotationAdjuster ? (
          <div>
            <label htmlFor="rotate-input">Rotate: </label>
            <input
              id="rotate-input"
              type="number"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>
        ) : null}
        {displayResetButton ? (
          <div>
            <button onClick={handleToggleAspectClick}>
              Toggle aspect {aspect ? "off" : "on"}
            </button>
          </div>
        ) : null}
      </div>

      {completedCrop ? (
        <div className={classes.AreaPreview}>
          <p className={classes.AreaPreview__text}>プレビュー</p>
          <div className={classes.AreaPreview__canvasWrapper}>
            <canvas
              className={classes.AreaPreview__canvas}
              ref={previewCanvasRef}
            />
            {/* {completedCrop && (
                <canvas
                  className={classes.AreaPreview__canvas}
                  ref={previewCanvasRef}
                  // style={{
                  //   border: "1px solid black",
                  //   objectFit: "contain",
                  //   width: completedCrop.width,
                  //   height: completedCrop.height,
                  // }}
                />
              )} */}
          </div>
        </div>
      ) : null}

      {imgSrc && (
        <div className={classes.AreaCrop}>
          <p className={classes.AreaCrop__text}>編集</p>
          <ReactCrop
            className={classes.AreaCrop__ReactCrop}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              className={classes.AreaCrop__ReactCrop__img}
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
