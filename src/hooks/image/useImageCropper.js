// 画像をcropするImageCropperのためのhook
// ただし１：１のcrop限定（もちろん、ASPECT_1_1関連の部分を少し書き換えればaspectを変更できるが、まだやってない）。

import { useCallback, useEffect, useRef, useState } from "react";
import { centerCrop, makeAspectCrop } from "react-image-crop";

const ASPECT_1_1 = 1 / 1;
const useImageCropper = () => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  // const hiddenAnchorRef = useRef(null);
  // const blobUrlRef = useRef("");
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(ASPECT_1_1);
  const onSelectFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setCrop(undefined);
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          setImgSrc(reader.result?.toString() || "")
        );
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [setCrop, setImgSrc]
  );

  const onImageLoad = useCallback(
    (e) => {
      if (aspect) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
      }
    },
    [aspect]
  );

  // function onDownloadCropClick() {
  //   if (!previewCanvasRef.current) {
  //     throw new Error("Crop canvas does not exist");
  //   }

  //   previewCanvasRef.current.toBlob((blob) => {
  //     if (!blob) {
  //       throw new Error("Failed to create blob");
  //     }
  //     if (blobUrlRef.current) {
  //       URL.revokeObjectURL(blobUrlRef.current);
  //     }
  //     blobUrlRef.current = URL.createObjectURL(blob);
  //     hiddenAnchorRef.current.href = blobUrlRef.current;
  //     hiddenAnchorRef.current.click();
  //   });
  // }

  const callAsyncCanvasPreview = useCallback(async () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
    }
  }, [completedCrop, rotate, scale]);
  const waitTime = 100;
  useDebounceEffect(callAsyncCanvasPreview, waitTime, [
    completedCrop,
    scale,
    rotate,
  ]);

  const handleToggleAspectClick = useCallback(() => {
    if (aspect) {
      setAspect(null);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(ASPECT_1_1);
      setCrop(centerAspectCrop(width, height, ASPECT_1_1));
    }
  }, [aspect]);

  return {
    imgSrc,
    setImgSrc,
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
    setAspect,
    onSelectFile,
    onImageLoad,
    handleToggleAspectClick,
  };
};

export default useImageCropper;

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const TO_RADIANS = Math.PI / 180;

async function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

function useDebounceEffect(fn, waitTime, deps = []) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [deps, fn, waitTime]);
}
